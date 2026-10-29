"use client";

import Image from "next/image";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  LoaderCircle,
} from "lucide-react";
import {
  type FormEvent,
  type Ref,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { BookingSummary } from "@/components/book/BookingSummary";
import { StepIndicator, type BookingStep } from "@/components/book/StepIndicator";
import { bookingPage } from "@/data/site";
import { images } from "@/data/images";
import { modelsData, type VehicleModelData } from "@/data/vehicles";
import {
  bookingSchema,
  type BookingField,
} from "@/lib/validation";

type PaymentChoice = "" | "full" | "finance" | "undecided";
type ContactTimeChoice = "" | "Morning" | "Afternoon" | "Evening" | "Anytime";
type BookingDraft = {
  step: BookingStep;
  vehicle: string;
  variant: string;
  color: string;
  payment: PaymentChoice;
  fullName: string;
  email: string;
  mobile: string;
  city: string;
  contactTime: ContactTimeChoice;
  notes: string;
  consent: boolean;
  company: string;
};
type FieldErrors = Partial<Record<BookingField, string>>;
type BookingProgress = Omit<BookingDraft, "consent" | "company">;

const draftStorageKey = "ola-booking-progress";
const cooldownStorageKey = "ola-booking-cooldown-until";
const cooldownDuration = 30_000;
const scooters = modelsData.filter((model) => model.type === "scooter");
const paymentOptions = bookingPage.paymentOptions;
const contactTimes = ["Morning", "Afternoon", "Evening", "Anytime"] as const;
const initialDraft: BookingDraft = {
  step: 1,
  vehicle: "",
  variant: "",
  color: "",
  payment: "",
  fullName: "",
  email: "",
  mobile: "",
  city: "",
  contactTime: "",
  notes: "",
  consent: false,
  company: "",
};
const vehicleFields: BookingField[] = ["vehicle", "variant", "color", "payment"];
const contactFields: BookingField[] = [
  "fullName",
  "email",
  "countryCode",
  "mobile",
  "city",
  "contactTime",
  "notes",
  "consent",
];
const allBookingFields: BookingField[] = [
  "vehicle",
  "variant",
  "color",
  "payment",
  "fullName",
  "email",
  "countryCode",
  "mobile",
  "city",
  "contactTime",
  "notes",
  "consent",
  "company",
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function variantId(label: string) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function findVehicle(slug: string | null) {
  return scooters.find((vehicle) => vehicle.slug === slug);
}

function findVariant(vehicle: VehicleModelData, candidate: string | null) {
  if (!candidate) return "";
  const normalized = candidate.trim().toLowerCase();
  const found = vehicle.variants.find(
    (variant) =>
      variantId(variant.label) === normalized ||
      variant.label.toLowerCase() === normalized,
  );
  return found ? variantId(found.label) : "";
}

function modelPrice(vehicle: VehicleModelData) {
  const priced = vehicle.variants
    .map((variant) => variant.priceReference ?? vehicle.priceReference)
    .filter((price): price is string => Boolean(price))
    .sort((left, right) => {
      const leftValue = Number(left.replace(/[^\d]/g, "")) || Number.MAX_SAFE_INTEGER;
      const rightValue = Number(right.replace(/[^\d]/g, "")) || Number.MAX_SAFE_INTEGER;
      return leftValue - rightValue;
    });
  const lowest = priced[0] ?? vehicle.priceReference ??
    (vehicle.price.full ? `₹${vehicle.price.full}` : vehicle.price.startingLabel);
  return lowest.startsWith("₹") || lowest.startsWith("Verify") ? lowest : `₹${lowest}`;
}

function variantPrice(vehicle: VehicleModelData, variantLabel: string) {
  const variant = vehicle.variants.find((item) => item.label === variantLabel);
  const value = variant?.priceReference ?? vehicle.priceReference ??
    (vehicle.price.full ? `₹${vehicle.price.full}` : vehicle.price.startingLabel);
  return value.startsWith("₹") || value.startsWith("Verify") ? value : `₹${value}`;
}

function fieldErrorsFromUnknown(value: unknown): FieldErrors {
  if (!isRecord(value)) return {};
  const result: FieldErrors = {};
  allBookingFields.forEach((field) => {
    const messages = value[field];
    if (Array.isArray(messages) && typeof messages[0] === "string") {
      result[field] = messages[0];
    } else if (typeof messages === "string") {
      result[field] = messages;
    }
  });
  return result;
}

function errorText(errors: FieldErrors, field: BookingField) {
  return errors[field];
}

function getUrlPreselection() {
  const query = new URLSearchParams(window.location.search);
  const hash = window.location.hash;
  if (hash.startsWith("#book?")) {
    const hashQuery = new URLSearchParams(hash.slice(hash.indexOf("?") + 1));
    if (!query.has("vehicle")) query.set("vehicle", hashQuery.get("vehicle") ?? "");
    if (!query.has("variant")) query.set("variant", hashQuery.get("variant") ?? "");
  }
  return {
    vehicle: query.get("vehicle"),
    variant: query.get("variant"),
  };
}

export function BookingWizard() {
  const [draft, setDraft] = useState<BookingDraft>(initialDraft);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [ready, setReady] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [cooldownUntil, setCooldownUntil] = useState(0);
  const [now, setNow] = useState(0);
  const formCardRef = useRef<HTMLElement>(null);
  const submittedRef = useRef(false);
  const fieldRefs = useRef<Partial<Record<BookingField, HTMLElement | null>>>({});
  const selectedVehicle = useMemo(
    () => findVehicle(draft.vehicle),
    [draft.vehicle],
  );
  const selectedVariant = useMemo(
    () => selectedVehicle?.variants.find((variant) => variantId(variant.label) === draft.variant),
    [draft.variant, selectedVehicle],
  );

  const setField = useCallback(
    <K extends keyof BookingDraft>(field: K, value: BookingDraft[K]) => {
      setDraft((current) => ({ ...current, [field]: value }));
      setDirty(true);
      setErrors((current) => {
        if (!current[field as BookingField]) return current;
        const next = { ...current };
        delete next[field as BookingField];
        return next;
      });
    },
    [],
  );
  const setFieldRef = (field: BookingField) => (node: HTMLElement | null) => {
    fieldRefs.current[field] = node;
  };

  useEffect(() => {
    let restored = initialDraft;
    let restoredProgress = false;
    try {
      const saved = sessionStorage.getItem(draftStorageKey);
      if (saved) {
        const value: unknown = JSON.parse(saved);
        if (isRecord(value)) {
          const vehicle = findVehicle(typeof value.vehicle === "string" ? value.vehicle : null);
          const restoredPayment = paymentOptions.find((option) => option.value === value.payment)?.value ?? "";
          const validColor = bookingPage.colorOptions.find((option) => option.value === value.color);
          restored = {
            // Consent is intentionally never persisted; resume a reviewed draft
            // on the contact step so the user can provide consent again.
            step: value.step === 2 || value.step === 3 ? 2 : 1,
            vehicle: vehicle?.slug ?? "",
            variant: vehicle ? findVariant(vehicle, typeof value.variant === "string" ? value.variant : null) : "",
            color: validColor?.value ?? "",
            payment: restoredPayment,
            fullName: typeof value.fullName === "string" ? value.fullName : "",
            email: typeof value.email === "string" ? value.email : "",
            mobile: typeof value.mobile === "string" ? value.mobile : "",
            city: typeof value.city === "string" ? value.city : "",
            contactTime: contactTimes.find((time) => time === value.contactTime) ?? "",
            notes: typeof value.notes === "string" ? value.notes.slice(0, 300) : "",
            consent: false,
            company: "",
          };
          restoredProgress = Boolean(
            restored.vehicle || restored.fullName || restored.email || restored.mobile ||
            restored.city || restored.notes,
          );
        }
      }
    } catch {
      // Session storage is optional and progress can always be entered again.
    }

    const preselection = getUrlPreselection();
    const vehicle = findVehicle(preselection.vehicle);
    if (vehicle) {
      restored.vehicle = vehicle.slug;
      restored.variant = findVariant(vehicle, preselection.variant);
      restored.step = 1;
    }
    setDraft(restored);
    setDirty(restoredProgress);
    setReady(true);

    try {
      const until = Number(sessionStorage.getItem(cooldownStorageKey) ?? 0);
      if (until > Date.now()) {
        setCooldownUntil(until);
        setNow(Date.now());
      } else {
        sessionStorage.removeItem(cooldownStorageKey);
      }
    } catch {
      // Cooldown persistence is best effort; server-side limits still apply.
    }
  }, []);

  useEffect(() => {
    if (!ready) return;
    const progress: BookingProgress = {
      step: draft.step,
      vehicle: draft.vehicle,
      variant: draft.variant,
      color: draft.color,
      payment: draft.payment,
      fullName: draft.fullName,
      email: draft.email,
      mobile: draft.mobile,
      city: draft.city,
      contactTime: draft.contactTime,
      notes: draft.notes,
    };
    try {
      sessionStorage.setItem(draftStorageKey, JSON.stringify(progress));
    } catch {
      // Saving progress should never block the booking.
    }
  }, [draft, ready]);

  useEffect(() => {
    if (!dirty || submittedRef.current) return;
    const warnBeforeLeave = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warnBeforeLeave);
    return () => window.removeEventListener("beforeunload", warnBeforeLeave);
  }, [dirty]);

  useEffect(() => {
    if (!cooldownUntil) return;
    const timer = window.setInterval(() => {
      const timestamp = Date.now();
      setNow(timestamp);
      if (timestamp >= cooldownUntil) {
        setCooldownUntil(0);
        try {
          sessionStorage.removeItem(cooldownStorageKey);
        } catch {
          // Ignore blocked storage.
        }
      }
    }, 500);
    return () => window.clearInterval(timer);
  }, [cooldownUntil]);

  const focusFirstError = (fieldErrors: FieldErrors, fields: BookingField[]) => {
    const first = fields.find((field) => fieldErrors[field]);
    if (first) requestAnimationFrame(() => fieldRefs.current[first]?.focus());
  };

  const payload = () => ({
    vehicle: draft.vehicle,
    variant: draft.variant,
    ...(bookingPage.colorOptions.length > 0 && draft.color ? { color: draft.color } : {}),
    payment: draft.payment,
    fullName: draft.fullName,
    email: draft.email,
    countryCode: "+91",
    mobile: draft.mobile,
    city: draft.city,
    contactTime: draft.contactTime,
    notes: draft.notes,
    consent: draft.consent,
    company: draft.company,
  });

  const validateStep = (step: BookingStep) => {
    const parsed = bookingSchema.safeParse(payload());
    if (parsed.success) {
      setErrors({});
      return true;
    }
    const completeErrors = fieldErrorsFromUnknown(
      parsed.error.flatten().fieldErrors,
    );
    const relevantFields = step === 1 ? vehicleFields : contactFields;
    const stepErrors: FieldErrors = {};
    relevantFields.forEach((field) => {
      if (completeErrors[field]) stepErrors[field] = completeErrors[field];
    });
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length) {
      focusFirstError(stepErrors, relevantFields);
      return false;
    }
    return true;
  };

  const goToStep = (step: BookingStep) => {
    setErrors({});
    setStatus("idle");
    setDraft((current) => ({ ...current, step }));
    setDirty(true);
    requestAnimationFrame(() => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      formCardRef.current?.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "start",
      });
    });
  };

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (draft.step < 3) {
      if (validateStep(draft.step)) goToStep((draft.step + 1) as BookingStep);
      return;
    }
    try {
      const savedUntil = Number(sessionStorage.getItem(cooldownStorageKey) ?? 0);
      if (savedUntil > Date.now()) {
        setCooldownUntil(savedUntil);
        setNow(Date.now());
        setStatus("error");
        return;
      }
    } catch {
      // The in-memory cooldown remains in effect if storage is unavailable.
    }
    if (cooldownUntil > Date.now()) {
      setNow(Date.now());
      setStatus("error");
      return;
    }
    if (!validateStep(3)) return;
    const parsed = bookingSchema.safeParse(payload());
    if (!parsed.success) {
      const submitErrors = fieldErrorsFromUnknown(
        parsed.error.flatten().fieldErrors,
      );
      setErrors(submitErrors);
      focusFirstError(submitErrors, [...vehicleFields, ...contactFields]);
      return;
    }

    setStatus("submitting");
    setErrors({});
    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const responseBody: unknown = await response.json().catch(() => null);
      if (!response.ok) {
        const serverErrors = isRecord(responseBody)
          ? fieldErrorsFromUnknown(responseBody.fieldErrors)
          : {};
        setErrors(serverErrors);
        focusFirstError(serverErrors, [...vehicleFields, ...contactFields]);
        setStatus("error");
        return;
      }

      const until = Date.now() + cooldownDuration;
      setCooldownUntil(until);
      setNow(Date.now());
      try {
        sessionStorage.removeItem(draftStorageKey);
        sessionStorage.setItem(cooldownStorageKey, String(until));
      } catch {
        // Request success is not dependent on client storage availability.
      }
      submittedRef.current = true;
      if (isRecord(responseBody)) {
        const reference = [responseBody.ref, responseBody.reference, responseBody.bookingRef]
          .find((value): value is string => typeof value === "string" && value.trim().length > 0);
        window.location.assign(
          reference ? `/book/success?ref=${encodeURIComponent(reference)}` : "/book/success",
        );
      } else {
        window.location.assign("/book/success");
      }
    } catch {
      setStatus("error");
    }
  }

  const remainingSeconds = Math.max(0, Math.ceil((cooldownUntil - now) / 1000));
  const isCoolingDown = remainingSeconds > 0;
  const inputClass =
    "min-h-12 w-full rounded-[10px] border border-[#DADCE2] bg-white px-4 text-base text-[#111] placeholder:text-[#777B84] focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/25 aria-[invalid=true]:border-[#B42318] aria-[invalid=true]:focus:ring-[#B42318]/25";
  const errorFor = (field: BookingField) => errorText(errors, field);
  const fieldProps = (field: BookingField) => ({
    "aria-invalid": Boolean(errorFor(field)),
    "aria-describedby": errorFor(field) ? `booking-${field}-error` : undefined,
  });
  const renderError = (field: BookingField) =>
    errorFor(field) ? (
      <p
        id={`booking-${field}-error`}
        role="alert"
        className="mt-1.5 flex items-start gap-1.5 text-sm leading-5 text-[#B42318]"
      >
        <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
        {errorFor(field)}
      </p>
    ) : null;

  const vehicleHeading = "Choose your scooter";
  const detailsHeading = "Your details";
  const reviewHeading = "Review your booking";
  const heading = draft.step === 1 ? vehicleHeading : draft.step === 2 ? detailsHeading : reviewHeading;

  return (
    <section id="book-form" className="scroll-mt-24 bg-[#F7F8FA]">
      <div className="mx-auto max-w-container px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="mb-5 lg:hidden">
          <BookingSummary
            vehicle={selectedVehicle}
            variantId={draft.variant}
            color={draft.color}
            payment={draft.payment}
            mobile
          />
        </div>
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(280px,1fr)] lg:gap-8">
          <section
            ref={formCardRef}
            aria-labelledby="book-form-title"
            className="scroll-mt-28 rounded-2xl border border-[#E6E8EC] bg-white p-5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] sm:p-8 lg:p-10"
          >
            <StepIndicator
              step={draft.step}
              labels={bookingPage.steps}
              onStepSelect={goToStep}
            />
            <h2 id="book-form-title" className="text-2xl font-extrabold tracking-tight text-brand-black sm:text-3xl">
              {heading}
            </h2>
            <form noValidate onSubmit={submit} aria-busy={status === "submitting"}>
              <div
                className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
                aria-hidden="true"
              >
                <label htmlFor="booking-company">Leave this field empty</label>
                <input
                  id="booking-company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={draft.company}
                  onChange={(event) => setField("company", event.target.value)}
                />
              </div>

              {draft.step === 1 && (
                <div className="mt-3">
                  <p className="text-sm leading-6 text-[#626670]">
                    Select a model, variant and your preferred payment option.
                  </p>
                  <fieldset className="mt-6">
                    <legend className="text-sm font-bold text-brand-black">Model <span className="font-normal text-[#777B84]">(required)</span></legend>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {scooters.map((vehicle) => {
                        const selected = draft.vehicle === vehicle.slug;
                        return (
                          <label
                            key={vehicle.slug}
                            className={`relative cursor-pointer overflow-hidden rounded-xl border-2 transition-colors focus-within:ring-2 focus-within:ring-brand-red/30 ${
                              selected ? "border-brand-red bg-[#FFF9F9]" : "border-[#E6E8EC] hover:border-[#B9BCC4]"
                            }`}
                          >
                            <input
                              ref={setFieldRef("vehicle") as Ref<HTMLInputElement>}
                              type="radio"
                              name="vehicle"
                              value={vehicle.slug}
                              checked={selected}
                              onChange={() => {
                                setField("vehicle", vehicle.slug);
                                setField("variant", "");
                              }}
                              className="peer sr-only"
                              {...fieldProps("vehicle")}
                            />
                            <span className="relative block aspect-[4/3] bg-[#F2F3F5]">
                              <Image
                                src={images.vehicles[vehicle.imageKey]}
                                alt=""
                                fill
                                sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 33vw"
                                className="object-contain p-3"
                              />
                              {selected && (
                                <span className="absolute right-3 top-3 inline-flex size-6 items-center justify-center rounded-full bg-brand-red text-white">
                                  <Check aria-hidden="true" className="size-4" />
                                </span>
                              )}
                            </span>
                            <span className="block p-3">
                              <span className="block font-bold text-brand-black">{vehicle.brand} {vehicle.model}</span>
                              <span className="mt-1 block text-xs text-[#626670]">{vehicle.generation ?? vehicle.tagline}</span>
                              <span className="mt-2 block text-sm font-bold text-brand-red">{modelPrice(vehicle)}</span>
                            </span>
                          </label>
                        );
                      })}
                    </div>
                    {renderError("vehicle")}
                  </fieldset>

                  {selectedVehicle && (
                    <fieldset className="mt-7">
                      <legend className="text-sm font-bold text-brand-black">Variant <span className="font-normal text-[#777B84]">(required)</span></legend>
                      <div className="mt-3 grid gap-3 md:grid-cols-2">
                        {selectedVehicle.variants.map((variant) => {
                          const id = variantId(variant.label);
                          const selected = draft.variant === id;
                          return (
                            <label
                              key={id}
                              className={`cursor-pointer rounded-xl border-2 p-4 transition-colors focus-within:ring-2 focus-within:ring-brand-red/30 ${
                                selected ? "border-brand-red bg-[#FFF9F9]" : "border-[#E6E8EC] hover:border-[#B9BCC4]"
                              }`}
                            >
                              <input
                                ref={setFieldRef("variant") as Ref<HTMLInputElement>}
                                type="radio"
                                name="variant"
                                value={id}
                                checked={selected}
                                onChange={() => setField("variant", id)}
                                className="sr-only"
                                {...fieldProps("variant")}
                              />
                              <span className="flex items-start justify-between gap-3">
                                <span className="font-bold text-brand-black">{variant.label}</span>
                                {selected && <Check aria-hidden="true" className="size-5 shrink-0 text-brand-red" />}
                              </span>
                              <span className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
                                <span className="text-[#777B84]">Battery</span><span className="text-right font-medium text-brand-black">{variant.battery ?? "Details to be confirmed"}</span>
                                <span className="text-[#777B84]">Claimed range</span><span className="text-right font-medium text-brand-black">{variant.claimedRange ?? "—"}</span>
                                <span className="text-[#777B84]">Top speed</span><span className="text-right font-medium text-brand-black">{variant.topSpeed ?? "—"}</span>
                              </span>
                              <span className="mt-3 block text-sm font-bold text-brand-red">{variantPrice(selectedVehicle, variant.label)}</span>
                            </label>
                          );
                        })}
                      </div>
                      {renderError("variant")}
                    </fieldset>
                  )}

                  {bookingPage.colorOptions.length > 0 && (
                    <fieldset className="mt-7">
                      <legend className="text-sm font-bold text-brand-black">Colour <span className="font-normal text-[#777B84]">(optional)</span></legend>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {bookingPage.colorOptions.map((option) => (
                          <label key={option.value} className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium focus-within:ring-2 focus-within:ring-brand-red/30 ${
                            draft.color === option.value ? "border-brand-red bg-[#FFF9F9] text-brand-red" : "border-[#DADCE2] text-[#3A3D45]"
                          }`}>
                            <input
                              ref={setFieldRef("color") as Ref<HTMLInputElement>}
                              type="radio"
                              name="color"
                              value={option.value}
                              checked={draft.color === option.value}
                              onChange={() => setField("color", option.value)}
                              className="sr-only"
                              {...fieldProps("color")}
                            />
                            {option.label}
                          </label>
                        ))}
                      </div>
                      {renderError("color")}
                    </fieldset>
                  )}

                  <fieldset className="mt-7">
                    <legend className="text-sm font-bold text-brand-black">Payment preference <span className="font-normal text-[#777B84]">(required)</span></legend>
                    <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
                      {paymentOptions.map((option) => (
                        <label key={option.value} className={`flex min-h-12 cursor-pointer items-center justify-center rounded-lg border px-3 text-center text-sm font-semibold focus-within:ring-2 focus-within:ring-brand-red/30 ${
                          draft.payment === option.value ? "border-brand-red bg-[#FFF9F9] text-brand-red" : "border-[#DADCE2] text-[#3A3D45]"
                        }`}>
                          <input
                            ref={setFieldRef("payment") as Ref<HTMLInputElement>}
                            type="radio"
                            name="payment"
                            value={option.value}
                            checked={draft.payment === option.value}
                            onChange={() => setField("payment", option.value)}
                            className="sr-only"
                            {...fieldProps("payment")}
                          />
                          {option.label}
                        </label>
                      ))}
                    </div>
                    {renderError("payment")}
                  </fieldset>
                </div>
              )}

              {draft.step === 2 && (
                <div className="mt-3">
                  <p className="mb-6 text-sm leading-6 text-[#626670]">
                    Tell us how to reach you so the dealership can help with your booking.
                  </p>
                  <div className="space-y-5">
                    <div>
                      <label htmlFor="booking-fullName" className="mb-2 block text-sm font-semibold text-brand-black">Full name <span className="text-[#777B84]">(required)</span></label>
                      <input ref={setFieldRef("fullName") as Ref<HTMLInputElement>} id="booking-fullName" name="fullName" type="text" autoComplete="name" required maxLength={80} value={draft.fullName} onChange={(event) => setField("fullName", event.target.value)} className={inputClass} placeholder="Enter your full name" {...fieldProps("fullName")} />
                      {renderError("fullName")}
                    </div>
                    <div>
                      <label htmlFor="booking-email" className="mb-2 block text-sm font-semibold text-brand-black">Email address <span className="font-normal text-[#777B84]">(optional)</span></label>
                      <input ref={setFieldRef("email") as Ref<HTMLInputElement>} id="booking-email" name="email" type="email" autoComplete="email" maxLength={120} value={draft.email} onChange={(event) => setField("email", event.target.value)} className={inputClass} placeholder="you@example.com" {...fieldProps("email")} />
                      {renderError("email")}
                    </div>
                    <div>
                      <label htmlFor="booking-mobile" className="mb-2 block text-sm font-semibold text-brand-black">Mobile number <span className="text-[#777B84]">(required)</span></label>
                      <div className="flex min-w-0 gap-3">
                        <select
                          aria-label="Country calling code"
                          defaultValue="+91"
                          className={`${inputClass} w-24 shrink-0 px-3 text-sm font-semibold`}
                        >
                          <option value="+91">+91</option>
                        </select>
                        <input ref={setFieldRef("mobile") as Ref<HTMLInputElement>} id="booking-mobile" name="mobile" type="tel" inputMode="numeric" autoComplete="tel-national" required maxLength={12} value={draft.mobile} onChange={(event) => setField("mobile", event.target.value)} className={`${inputClass} min-w-0 flex-1`} placeholder="10-digit mobile number" {...fieldProps("mobile")} />
                      </div>
                      {renderError("mobile")}
                    </div>
                    <div>
                      <label htmlFor="booking-city" className="mb-2 block text-sm font-semibold text-brand-black">City / location <span className="text-[#777B84]">(required)</span></label>
                      <input ref={setFieldRef("city") as Ref<HTMLInputElement>} id="booking-city" name="city" type="text" autoComplete="address-level2" required maxLength={80} value={draft.city} onChange={(event) => setField("city", event.target.value)} className={inputClass} placeholder="Enter your city or location" {...fieldProps("city")} />
                      {renderError("city")}
                    </div>
                    <div>
                      <label htmlFor="booking-contactTime" className="mb-2 block text-sm font-semibold text-brand-black">Preferred contact time <span className="text-[#777B84]">(required)</span></label>
                      <select ref={setFieldRef("contactTime") as Ref<HTMLSelectElement>} id="booking-contactTime" name="contactTime" value={draft.contactTime} onChange={(event) => setField("contactTime", event.target.value as ContactTimeChoice)} className={inputClass} {...fieldProps("contactTime")}>
                        <option value="">Select a time</option>
                        {contactTimes.map((time) => <option key={time} value={time}>{time}</option>)}
                      </select>
                      {renderError("contactTime")}
                    </div>
                    <div>
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <label htmlFor="booking-notes" className="text-sm font-semibold text-brand-black">Notes <span className="font-normal text-[#777B84]">(optional)</span></label>
                        <span id="booking-notes-count" className="text-xs text-[#777B84]">{draft.notes.length}/300</span>
                      </div>
                      <textarea ref={setFieldRef("notes") as Ref<HTMLTextAreaElement>} id="booking-notes" name="notes" rows={4} maxLength={300} value={draft.notes} onChange={(event) => setField("notes", event.target.value)} className={`${inputClass} min-h-28 resize-y py-3`} {...fieldProps("notes")} aria-describedby={errorFor("notes") ? "booking-notes-error booking-notes-count" : "booking-notes-count"} placeholder="Anything else you would like us to know?" />
                      {renderError("notes")}
                    </div>
                    <div>
                      <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-[#3A3D45]">
                        <input ref={setFieldRef("consent") as Ref<HTMLInputElement>} type="checkbox" name="consent" checked={draft.consent} onChange={(event) => setField("consent", event.target.checked)} className="mt-1 size-4 shrink-0 accent-brand-red" {...fieldProps("consent")} />
                        <span>I agree to be contacted by the dealership about my booking request. <span className="font-semibold text-brand-red">(required)</span></span>
                      </label>
                      {renderError("consent")}
                    </div>
                  </div>
                </div>
              )}

              {draft.step === 3 && (
                <div className="mt-3">
                  <p className="text-sm leading-6 text-[#626670]">Review your selections and details before sending your request.</p>
                  <dl className="mt-5 divide-y divide-[#E6E8EC] rounded-xl border border-[#E6E8EC] px-4">
                    <div className="flex items-center justify-between gap-4 py-3">
                      <dt className="text-sm text-[#626670]">Scooter</dt>
                      <dd className="text-right font-semibold text-brand-black">{selectedVehicle?.model ?? "—"}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-4 py-3">
                      <dt className="text-sm text-[#626670]">Variant</dt>
                      <dd className="text-right font-semibold text-brand-black">{selectedVariant?.label ?? "—"}</dd>
                    </div>
                    {bookingPage.colorOptions.length > 0 && (
                      <div className="flex items-center justify-between gap-4 py-3">
                        <dt className="text-sm text-[#626670]">Colour</dt>
                        <dd className="text-right font-semibold text-brand-black">{bookingPage.colorOptions.find((option) => option.value === draft.color)?.label ?? "Not selected"}</dd>
                      </div>
                    )}
                    <div className="flex items-center justify-between gap-4 py-3">
                      <dt className="text-sm text-[#626670]">Payment</dt>
                      <dd className="text-right font-semibold text-brand-black">{paymentOptions.find((option) => option.value === draft.payment)?.label ?? "—"}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-4 py-3">
                      <dt className="text-sm text-[#626670]">Full name</dt>
                      <dd className="min-w-0 break-words text-right font-semibold text-brand-black [overflow-wrap:anywhere]">{draft.fullName || "—"}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-4 py-3">
                      <dt className="text-sm text-[#626670]">Email</dt>
                      <dd className="min-w-0 break-all text-right font-semibold text-brand-black">{draft.email || "Not provided"}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-4 py-3">
                      <dt className="text-sm text-[#626670]">Mobile</dt>
                      <dd className="text-right font-semibold text-brand-black">+91 {draft.mobile || "—"}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-4 py-3">
                      <dt className="text-sm text-[#626670]">City / location</dt>
                      <dd className="min-w-0 break-words text-right font-semibold text-brand-black [overflow-wrap:anywhere]">{draft.city || "—"}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-4 py-3">
                      <dt className="text-sm text-[#626670]">Contact time</dt>
                      <dd className="text-right font-semibold text-brand-black">{draft.contactTime || "—"}</dd>
                    </div>
                    <div className="flex items-start justify-between gap-4 py-3">
                      <dt className="text-sm text-[#626670]">Notes</dt>
                      <dd className="max-w-[65%] whitespace-pre-wrap text-right font-semibold text-brand-black">{draft.notes || "None"}</dd>
                    </div>
                  </dl>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <button type="button" onClick={() => goToStep(1)} className="text-sm font-semibold text-brand-red underline underline-offset-4">Edit scooter and payment</button>
                    <button type="button" onClick={() => goToStep(2)} className="text-sm font-semibold text-brand-red underline underline-offset-4">Edit contact details</button>
                  </div>
                  {!draft.consent && renderError("consent")}
                </div>
              )}

              {status === "error" && (
                <p role="alert" className="mt-5 rounded-lg bg-[#FEF3F2] p-3 text-sm text-[#B42318]">
                  {isCoolingDown
                    ? `Please wait ${remainingSeconds} seconds before making another booking request.`
                    : "We couldn’t submit your request. Please review any highlighted fields and try again."}
                </p>
              )}
              {status === "submitting" && (
                <p className="sr-only" role="status" aria-live="polite">
                  Sending your booking request.
                </p>
              )}

              <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[#E6E8EC] pt-6">
                {draft.step > 1 ? (
                  <button type="button" onClick={() => goToStep((draft.step - 1) as BookingStep)} className="inline-flex min-h-12 items-center gap-2 rounded-button border border-[#DADCE2] px-5 text-sm font-semibold text-brand-black transition-colors hover:bg-[#F7F8FA]">
                    <ArrowLeft aria-hidden="true" className="size-4" />Back
                  </button>
                ) : <span aria-hidden="true" />}
                {draft.step < 3 ? (
                  <button type="submit" className="inline-flex min-h-12 items-center gap-2 rounded-button bg-brand-red px-6 text-sm font-bold text-white transition-colors hover:bg-brand-red-hover">
                    Continue<ArrowRight aria-hidden="true" className="size-4" />
                  </button>
                ) : (
                  <button type="submit" disabled={!ready || status === "submitting" || isCoolingDown} className="inline-flex min-h-12 items-center gap-2 rounded-button bg-brand-red px-6 text-sm font-bold text-white transition-colors hover:bg-brand-red-hover disabled:cursor-not-allowed disabled:opacity-70">
                    {status === "submitting" ? (
                      <LoaderCircle aria-hidden="true" className="size-4 animate-spin motion-reduce:animate-none" />
                    ) : (
                      <Check aria-hidden="true" className="size-4" />
                    )}
                    {status === "submitting"
                      ? "Submitting…"
                      : isCoolingDown
                        ? `Please wait (${remainingSeconds}s)`
                        : "Send Booking Request"}
                  </button>
                )}
              </div>
              {draft.step === 3 && (
                <p className="mt-4 text-xs leading-5 text-[#777B84]">
                  This is a booking request. No payment is taken on this page.
                </p>
              )}
            </form>
          </section>
          <BookingSummary
            vehicle={selectedVehicle}
            variantId={draft.variant}
            color={draft.color}
            payment={draft.payment}
          />
        </div>
      </div>
    </section>
  );
}
