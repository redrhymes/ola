import { modelsData } from "@/data/vehicles";
import { bookingPage, bookingPaymentValues } from "@/data/site";
import { z } from "zod";

type ValidatedTestRideValues = {
  fullName: string;
  countryCode: "+91";
  mobile: string;
  vehicle: string;
  preferredDate: string;
  location: string;
  consent: boolean;
  company: string;
  topic: string;
};

export type TestRideField = keyof ValidatedTestRideValues;
export type TestRideFieldErrors = Partial<Record<TestRideField, string[]>>;

export const testRideErrorMessages = {
  fullName: "Enter a name using 2–80 letters and common punctuation.",
  countryCode: "Choose a valid country code.",
  mobile: "Enter a valid 10-digit mobile number starting with 6–9.",
  vehicle: "Choose a vehicle.",
  preferredDate: "Choose a date from today through the next 90 days.",
  location: "Location must be 120 characters or fewer.",
  consent: "Please agree to be contacted.",
  company: "Invalid request.",
  topic: "Topic can contain up to 30 letters or numbers.",
} as const;

const vehicleSlugs = new Set(
  modelsData.filter((model) => model.type === "scooter").map((model) => model.slug),
);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizedLocalDate(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }
  return date;
}

function localDayNumber(date: Date) {
  return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
}

function validateTestRide(value: unknown):
  | { success: true; data: ValidatedTestRideValues }
  | { success: false; error: { fieldErrors: TestRideFieldErrors } } {
  const errors: TestRideFieldErrors = {};
  const addError = (field: TestRideField, message: string) => {
    errors[field] = [message];
  };
  const input = isRecord(value) ? value : {};

  const fullName = typeof input.fullName === "string" ? input.fullName.trim() : "";
  if (
    fullName.length < 2 ||
    fullName.length > 80 ||
    !/^(?=.*[\p{L}])[\p{L}\p{M} .'-]+$/u.test(fullName)
  ) {
    addError("fullName", testRideErrorMessages.fullName);
  }

  if (input.countryCode !== "+91") {
    addError("countryCode", testRideErrorMessages.countryCode);
  }

  const mobile =
    typeof input.mobile === "string"
      ? input.mobile.replace(/[\s-]/g, "")
      : "";
  if (!/^[6-9]\d{9}$/.test(mobile)) {
    addError("mobile", testRideErrorMessages.mobile);
  }

  const vehicle = typeof input.vehicle === "string" ? input.vehicle : "";
  if (!vehicleSlugs.has(vehicle)) {
    addError("vehicle", testRideErrorMessages.vehicle);
  }

  const preferredDate =
    typeof input.preferredDate === "string" ? input.preferredDate : "";
  const parsedDate = normalizedLocalDate(preferredDate);
  const today = new Date();
  const todayNumber = localDayNumber(today);
  const dateNumber = parsedDate ? localDayNumber(parsedDate) : NaN;
  if (
    !parsedDate ||
    dateNumber < todayNumber ||
    dateNumber > todayNumber + 90 * 24 * 60 * 60 * 1000
  ) {
    addError("preferredDate", testRideErrorMessages.preferredDate);
  }

  const location = typeof input.location === "string" ? input.location.trim() : "";
  if (
    (input.location !== undefined && typeof input.location !== "string") ||
    location.length > 120
  ) {
    addError("location", testRideErrorMessages.location);
  }

  if (input.consent !== true) {
    addError("consent", testRideErrorMessages.consent);
  }

  const company = typeof input.company === "string" ? input.company.trim() : "";
  if (
    (input.company !== undefined && typeof input.company !== "string") ||
    company.length > 0
  ) {
    addError("company", testRideErrorMessages.company);
  }

  const topic = typeof input.topic === "string" ? input.topic.trim() : "";
  if (
    (input.topic !== undefined && typeof input.topic !== "string") ||
    topic.length > 30 ||
    !/^[a-zA-Z0-9]*$/.test(topic)
  ) {
    addError("topic", testRideErrorMessages.topic);
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, error: { fieldErrors: errors } };
  }

  return {
    success: true,
    data: {
      fullName,
      countryCode: "+91",
      mobile,
      vehicle,
      preferredDate,
      location,
      consent: true,
      company: "",
      topic,
    },
  };
}

export type TestRideFormValues = Extract<
  ReturnType<typeof validateTestRide>,
  { success: true }
>["data"];

// Kept as a small safeParse-compatible schema so the browser and route share
// exactly one validation implementation without requiring client-side deps.
export const testRideSchema = {
  safeParse: validateTestRide,
};

export const contactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Enter your full name.")
    .max(80, "Name must be 80 characters or fewer.")
    .regex(/^(?=.*[\p{L}])[\p{L}\p{M} .'-]+$/u, "Enter a valid name."),
  email: z.string().trim().email("Enter a valid email address.").max(254),
  countryCode: z.enum(["+91"]),
  mobile: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number."),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters.")
    .max(1000, "Message must be 1,000 characters or fewer."),
  consent: z.boolean().refine((value) => value, {
    message: "Please agree to be contacted.",
  }),
  company: z.literal(""),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
export type ContactFormInput = z.input<typeof contactSchema>;
export type ContactField = keyof ContactFormValues;
export type ContactFieldErrors = Partial<Record<ContactField, string[]>>;

export const bookingErrorMessages = {
  vehicle: "Choose an available vehicle.",
  variant: "Choose a variant available for this vehicle.",
  color: "Choose a valid colour.",
  payment: "Choose a payment preference.",
  fullName: "Enter a name using 2–80 letters and common punctuation.",
  email: "Enter a valid email address.",
  countryCode: "Choose a valid country code.",
  mobile: "Enter a valid 10-digit mobile number starting with 6–9.",
  city: "Enter a city or location using 2–80 characters.",
  contactTime: "Choose a preferred contact time.",
  notes: "Notes must be 300 characters or fewer.",
  consent: "Please agree to be contacted about your booking request.",
  company: "Invalid request.",
} as const;

const bookingVehicleSlugs = new Set(modelsData.map((model) => model.slug));
const bookingColors = new Set(bookingPage.colorOptions.map((option) => option.value));

export const bookingSchema = z
  .object({
    vehicle: z.string().refine((value) => bookingVehicleSlugs.has(value), {
      message: bookingErrorMessages.vehicle,
    }),
    variant: z.string().min(1, bookingErrorMessages.variant),
    color: z.string().optional(),
    payment: z.enum(bookingPaymentValues, {
      error: bookingErrorMessages.payment,
    }),
    fullName: z
      .string()
      .trim()
      .min(2, bookingErrorMessages.fullName)
      .max(80, bookingErrorMessages.fullName)
      .regex(/^(?=.*[\p{L}])[\p{L}\p{M} .'-]+$/u, bookingErrorMessages.fullName),
    email: z
      .string()
      .trim()
      .max(120, bookingErrorMessages.email)
      .email(bookingErrorMessages.email)
      .toLowerCase()
      .optional()
      .or(z.literal("").transform(() => undefined)),
    countryCode: z.literal("+91", {
      error: bookingErrorMessages.countryCode,
    }),
    mobile: z
      .string()
      .transform((value) => value.replace(/[\s-]/g, ""))
      .pipe(z.string().regex(/^[6-9]\d{9}$/, bookingErrorMessages.mobile)),
    city: z
      .string()
      .trim()
      .min(2, bookingErrorMessages.city)
      .max(80, bookingErrorMessages.city),
    contactTime: z.enum(["Morning", "Afternoon", "Evening", "Anytime"], {
      error: bookingErrorMessages.contactTime,
    }),
    notes: z.string().trim().max(300, bookingErrorMessages.notes).optional(),
    consent: z.literal(true, {
      error: bookingErrorMessages.consent,
    }),
    company: z.literal(""),
  })
  .superRefine((values, context) => {
    const model = modelsData.find((candidate) => candidate.slug === values.vehicle);
    if (!model || !model.variants.some((variant) => variant.label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") === values.variant)) {
      context.addIssue({
        code: "custom",
        path: ["variant"],
        message: bookingErrorMessages.variant,
      });
    }

    if (values.color && !bookingColors.has(values.color)) {
      context.addIssue({
        code: "custom",
        path: ["color"],
        message: bookingErrorMessages.color,
      });
    }
  });

export type BookingFormValues = z.infer<typeof bookingSchema>;
export type BookingFormInput = z.input<typeof bookingSchema>;
export type BookingField = keyof BookingFormInput;
export type BookingFieldErrors = Partial<Record<BookingField, string[]>>;
