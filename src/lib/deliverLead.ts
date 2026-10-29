import type {
  BookingFormValues,
  ContactFormValues,
  TestRideFormValues,
} from "@/lib/validation";

export async function deliverLead(
  payload:
    | ContactFormValues
    | TestRideFormValues
    | (BookingFormValues & { type: "booking" }),
) {
  void payload;
  // TODO: send booking leads via email, Google Sheet, CRM or WhatsApp.
}
