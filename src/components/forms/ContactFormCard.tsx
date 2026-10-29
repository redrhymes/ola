"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  Check,
  LoaderCircle,
  Mail,
  MessageSquareText,
  Phone,
  UserRound,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  contactSchema,
  type ContactField,
  type ContactFieldErrors,
  type ContactFormInput,
  type ContactFormValues,
} from "@/lib/validation";

type ContactFormContent = {
  eyebrow: string;
  title: string;
  description: string;
  fields: Record<
    "fullName" | "email" | "mobile" | "message" | "consent",
    string
  >;
  placeholders: Record<"fullName" | "email" | "mobile" | "message", string>;
  countryCodeLabel: string;
  requiredLabel: string;
  requiredHint: string;
  submitLabel: string;
  submittingLabel: string;
  successTitle: string;
  successText: string;
  errorTitle: string;
  errorText: string;
  submitAnotherLabel: string;
  privacyNote: string;
  honeypotLabel: string;
  cooldownText: string;
  messageCountLabel: string;
};

type Props = { content: ContactFormContent };

const cooldownStorageKey = "webmart-contact-cooldown-until";
const cooldownMs = 30_000;

const inputClass =
  "mt-2 min-h-12 w-full rounded-md border border-[#DADCE2] bg-white px-4 py-3 text-base text-brand-black outline-none transition placeholder:text-[#858891] focus:border-brand-red focus:ring-2 focus:ring-brand-red/20";
const labelClass = "block text-sm font-semibold text-brand-black";

export function ContactFormCard({ content }: Props) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [requestError, setRequestError] = useState("");
  const [cooldownUntil, setCooldownUntil] = useState(0);
  const [now, setNow] = useState(0);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInput, unknown, ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      countryCode: "+91",
      mobile: "",
      message: "",
      consent: false,
      company: "",
    },
    mode: "onBlur",
  });

  const messageLength = watch("message", "").length;
  const companyField = register("company");
  const remainingSeconds = Math.max(
    0,
    Math.ceil((cooldownUntil - now) / 1000),
  );

  useEffect(() => {
    let storedUntil = 0;
    try {
      storedUntil = Number(sessionStorage.getItem(cooldownStorageKey) ?? 0);
    } catch {
      // Session storage is optional; the form still works without it.
    }
    if (storedUntil > Date.now()) {
      setCooldownUntil(storedUntil);
      setNow(Date.now());
      setStatus("success");
    }
  }, []);

  useEffect(() => {
    if (!cooldownUntil) return;
    const timer = window.setInterval(() => {
      const timestamp = Date.now();
      setNow(timestamp);
      if (timestamp >= cooldownUntil) {
        window.clearInterval(timer);
        setCooldownUntil(0);
        try {
          sessionStorage.removeItem(cooldownStorageKey);
        } catch {
          // Ignore unavailable storage.
        }
      }
    }, 500);
    return () => window.clearInterval(timer);
  }, [cooldownUntil]);

  function applyServerErrors(fieldErrors: ContactFieldErrors) {
    (Object.entries(fieldErrors) as [ContactField, string[]][]).forEach(
      ([field, messages]) => {
        const message = messages?.[0];
        if (message && field !== "company" && field !== "countryCode") {
          setError(field, { type: "server", message });
        }
      },
    );
    const firstInvalid = (
      ["fullName", "email", "mobile", "message", "consent"] as ContactField[]
    ).find((field) => fieldErrors[field]?.length);
    if (firstInvalid) setFocus(firstInvalid as keyof ContactFormValues);
  }

  async function submit(values: ContactFormValues) {
    setRequestError("");
    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const body: unknown = await response.json().catch(() => null);
      if (!response.ok) {
        const fieldErrors =
          typeof body === "object" && body !== null && "fieldErrors" in body
            ? (body as { fieldErrors?: ContactFieldErrors }).fieldErrors
            : undefined;
        if (fieldErrors) applyServerErrors(fieldErrors);
        const message =
          typeof body === "object" &&
          body !== null &&
          "message" in body &&
          typeof body.message === "string"
            ? body.message
            : content.errorText;
        setRequestError(message);
        setStatus("error");
        return;
      }

      const until = Date.now() + cooldownMs;
      setCooldownUntil(until);
      setNow(Date.now());
      try {
        sessionStorage.setItem(cooldownStorageKey, String(until));
      } catch {
        // Continue with the in-memory cooldown if storage is unavailable.
      }
      reset({
        fullName: "",
        email: "",
        countryCode: "+91",
        mobile: "",
        message: "",
        consent: false,
        company: "",
      });
      setStatus("success");
    } catch {
      setRequestError(content.errorText);
      setStatus("error");
    }
  }

  const fieldError = (field: ContactField) => errors[field]?.message;
  const fieldId = (field: ContactField) => `contact-${field}`;
  const inputErrorClass = (field: ContactField) =>
    fieldError(field) ? "border-red-600" : "";

  if (status === "success") {
    return (
      <section
        aria-labelledby="contact-form-success-title"
        className="rounded-[20px] border border-[#E3E5EA] bg-white p-6 shadow-[0_8px_32px_rgba(0,0,0,0.06)] sm:p-8 lg:p-10"
        role="status"
      >
        <span className="inline-flex size-12 items-center justify-center rounded-full bg-[#E8F5EC] text-[#18753B]">
          <Check aria-hidden="true" className="size-6" />
        </span>
        <h2
          id="contact-form-success-title"
          className="mt-5 text-2xl font-bold text-brand-black"
        >
          {content.successTitle}
        </h2>
        <p className="mt-3 leading-7 text-muted">{content.successText}</p>
        {remainingSeconds > 0 ? (
          <p className="mt-5 text-sm text-muted" aria-live="polite">
            {content.cooldownText.replace("{seconds}", String(remainingSeconds))}
          </p>
        ) : null}
        <button
          type="button"
          disabled={remainingSeconds > 0}
          onClick={() => {
            setStatus("idle");
            setRequestError("");
          }}
          className="mt-6 inline-flex min-h-11 items-center rounded-button border border-brand-black px-5 font-semibold text-brand-black transition-colors hover:bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red disabled:cursor-not-allowed disabled:opacity-60"
        >
          {content.submitAnotherLabel}
        </button>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="contact-form-title"
      className="rounded-[20px] border border-[#E3E5EA] bg-white p-5 shadow-[0_8px_32px_rgba(0,0,0,0.06)] sm:p-8 lg:p-10"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
        {content.eyebrow}
      </p>
      <h2
        id="contact-form-title"
        className="mt-3 text-3xl font-extrabold tracking-tight text-brand-black"
      >
        {content.title}
      </h2>
      <p className="mt-3 leading-7 text-muted">{content.description}</p>

      {status === "error" ? (
        <div
          className="mt-6 flex items-start gap-3 rounded-md border border-[#F0CACA] bg-[#FFF6F6] p-4 text-sm text-[#8D2020]"
          role="alert"
        >
          <AlertCircle aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
          <div>
            <p className="font-semibold">{content.errorTitle}</p>
            <p className="mt-1">{requestError || content.errorText}</p>
          </div>
        </div>
      ) : null}

      <form className="mt-7 space-y-5" onSubmit={handleSubmit(submit)} noValidate>
        <p id="contact-required-hint" className="text-sm text-muted">
          {content.requiredHint} <span>{content.requiredLabel}</span>
        </p>

        <div className="space-y-5">
          <div>
            <label htmlFor={fieldId("fullName")} className={labelClass}>
              <span className="inline-flex items-center gap-2">
                <UserRound aria-hidden="true" className="size-4" />
                {content.fields.fullName} <span>{content.requiredLabel}</span>
              </span>
            </label>
            <input
              {...register("fullName")}
              id={fieldId("fullName")}
              type="text"
              autoComplete="name"
              maxLength={80}
              required
              placeholder={content.placeholders.fullName}
              aria-invalid={Boolean(fieldError("fullName"))}
              aria-describedby={fieldError("fullName") ? `${fieldId("fullName")}-error` : "contact-required-hint"}
              className={`${inputClass} ${inputErrorClass("fullName")}`}
            />
            {fieldError("fullName") ? (
              <p id={`${fieldId("fullName")}-error`} className="mt-1 text-sm text-red-700">
                {fieldError("fullName")}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor={fieldId("email")} className={labelClass}>
              <span className="inline-flex items-center gap-2">
                <Mail aria-hidden="true" className="size-4" />
                {content.fields.email} <span>{content.requiredLabel}</span>
              </span>
            </label>
            <input
              {...register("email")}
              id={fieldId("email")}
              type="email"
              autoComplete="email"
              maxLength={254}
              required
              placeholder={content.placeholders.email}
              aria-invalid={Boolean(fieldError("email"))}
              aria-describedby={fieldError("email") ? `${fieldId("email")}-error` : "contact-required-hint"}
              className={`${inputClass} ${inputErrorClass("email")}`}
            />
            {fieldError("email") ? (
              <p id={`${fieldId("email")}-error`} className="mt-1 text-sm text-red-700">
                {fieldError("email")}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor={fieldId("mobile")} className={labelClass}>
              <span className="inline-flex items-center gap-2">
                <Phone aria-hidden="true" className="size-4" />
                {content.fields.mobile} <span>{content.requiredLabel}</span>
              </span>
            </label>
            <div className="mt-2 flex min-w-0 gap-2">
              <div className="shrink-0">
                <label htmlFor={fieldId("countryCode")} className="sr-only">
                  {content.countryCodeLabel}
                </label>
                <select
                  {...register("countryCode")}
                  id={fieldId("countryCode")}
                  aria-label={content.countryCodeLabel}
                  className="h-full min-h-12 rounded-md border border-[#DADCE2] bg-white px-3 text-base text-brand-black focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20"
                >
                  <option value="+91">+91</option>
                </select>
              </div>
              <input
                {...register("mobile")}
                id={fieldId("mobile")}
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                maxLength={10}
                required
                placeholder={content.placeholders.mobile}
                aria-invalid={Boolean(fieldError("mobile"))}
                aria-describedby={fieldError("mobile") ? `${fieldId("mobile")}-error` : "contact-required-hint"}
                className={`${inputClass} mt-0 min-w-0 flex-1 ${inputErrorClass("mobile")}`}
              />
            </div>
            {fieldError("mobile") ? (
              <p id={`${fieldId("mobile")}-error`} className="mt-1 text-sm text-red-700">
                {fieldError("mobile")}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor={fieldId("message")} className={labelClass}>
              <span className="inline-flex items-center gap-2">
                <MessageSquareText aria-hidden="true" className="size-4" />
                {content.fields.message} <span>{content.requiredLabel}</span>
              </span>
            </label>
            <textarea
              {...register("message")}
              id={fieldId("message")}
              rows={5}
              maxLength={1000}
              required
              placeholder={content.placeholders.message}
              aria-invalid={Boolean(fieldError("message"))}
              aria-describedby={fieldError("message") ? `${fieldId("message")}-error contact-message-count` : "contact-required-hint contact-message-count"}
              className={`${inputClass} min-h-36 resize-y ${inputErrorClass("message")}`}
            />
            <div className="mt-1 flex justify-between gap-4 text-xs text-muted">
              {fieldError("message") ? (
                <p id={`${fieldId("message")}-error`} className="text-sm text-red-700">
                  {fieldError("message")}
                </p>
              ) : (
                <span />
              )}
              <span id="contact-message-count" aria-live="polite">
                {messageLength}/1,000 {content.messageCountLabel}
              </span>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
        >
          <label htmlFor={fieldId("company")}>{content.honeypotLabel}</label>
          <input
            {...companyField}
            id={fieldId("company")}
            type="text"
            autoComplete="off"
            tabIndex={-1}
          />
        </div>

        <div>
          <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-brand-black">
            <input
              {...register("consent")}
              id={fieldId("consent")}
              type="checkbox"
              required
              aria-invalid={Boolean(fieldError("consent"))}
              aria-describedby={fieldError("consent") ? `${fieldId("consent")}-error` : "contact-required-hint"}
              className="mt-1 size-4 shrink-0 accent-brand-red"
            />
            <span>{content.fields.consent}</span>
          </label>
          {fieldError("consent") ? (
            <p id={`${fieldId("consent")}-error`} className="mt-1 text-sm text-red-700">
              {fieldError("consent")}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-4 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-sm text-xs leading-5 text-muted">
            {content.privacyNote}
          </p>
          <button
            type="submit"
            disabled={isSubmitting || status === "submitting" || remainingSeconds > 0}
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-button bg-brand-red px-6 font-semibold text-white transition-colors hover:bg-brand-red-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting || status === "submitting" ? (
              <LoaderCircle aria-hidden="true" className="size-5 animate-spin" />
            ) : null}
            {isSubmitting || status === "submitting"
              ? content.submittingLabel
              : content.submitLabel}
          </button>
        </div>
      </form>
    </section>
  );
}
