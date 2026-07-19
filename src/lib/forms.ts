import { z } from "zod";

const text = (label: string, max = 160) => z.string().trim().min(1, `${label} is required`).max(max).transform(sanitiseText);
const optionalText = (max = 1000) => z.string().trim().max(max).transform(sanitiseText).optional().or(z.literal(""));
const email = z.string().trim().email("Enter a valid email address").max(254).optional().or(z.literal(""));
const phone = z.string().trim().regex(/^[+()\d\s-]{7,24}$/, "Enter a valid UK-friendly phone number").optional().or(z.literal(""));
const consent = z.literal(true, { error: "You must agree to the privacy policy" });
const appointmentTime = z.string({ error: "Choose an appointment time" }).datetime({ offset: true, error: "Choose an appointment time" });
const metadata = z.object({ pageUrl: z.string().max(2048).optional(), referrer: z.string().max(2048).optional(), utm: z.record(z.string(), z.string().max(300)).optional() });

export function sanitiseText(value: string) {
  return value.replace(/[<>]/g, "").replace(/\s+/g, " ").trim();
}

const contactRefinement = <T extends z.ZodRawShape>(schema: z.ZodObject<T>) => schema.refine((data) => Boolean((data as {email?: string}).email || (data as {phone?: string}).phone), { message: "Provide an email address or phone number", path: ["email"] });

export const eventReservationSchema = contactRefinement(z.object({
  form_type: z.literal("event_reservation"), firstName: text("First name", 80), lastName: optionalText(80), email, phone,
  preferredTime: appointmentTime, message: optionalText(), consent, website: z.string().max(0).optional().or(z.literal("")),
  eventSlug: z.string().trim().min(1).max(160), ...metadata.shape,
}));

export const mailInSchema = z.object({
  form_type: z.literal("mail_in_pack_request"), firstName: text("First name", 80), lastName: text("Last name", 80), email: z.string().email(), phone,
  addressLine1: text("Address line 1"), addressLine2: optionalText(160), town: text("Town or city"), county: optionalText(100), postcode: text("Postcode", 12), itemDescription: optionalText(), consent, website: z.string().max(0).optional().or(z.literal("")), ...metadata.shape,
});

export const hostSchema = contactRefinement(z.object({
  form_type: z.literal("host_enquiry"), firstName: text("Contact name", 80), lastName: optionalText(80), businessName: text("Business or venue name"), email, phone,
  postcode: text("Venue postcode", 12), venueType: optionalText(60), message: optionalText(), consent, website: z.string().max(0).optional().or(z.literal("")), ...metadata.shape,
}));

export const eventInterestSchema = contactRefinement(z.object({
  form_type: z.literal("event_interest"), firstName: text("First name", 80), email, phone, postcode: text("Postcode", 12),
  message: optionalText(300), consent, website: z.string().max(0).optional().or(z.literal("")), ...metadata.shape,
}));

export type FormResponse = { success: true; message: string; submissionId?: string; development?: boolean } | { success: false; message: string; fieldErrors?: Record<string, string[]> };

export function validateForm(payload: unknown) {
  const type = (payload as { form_type?: string })?.form_type;
  if (type === "event_reservation") return eventReservationSchema.safeParse(payload);
  if (type === "mail_in_pack_request") return mailInSchema.safeParse(payload);
  if (type === "host_enquiry") return hostSchema.safeParse(payload);
  if (type === "event_interest") return eventInterestSchema.safeParse(payload);
  return { success: false as const, error: { flatten: () => ({ fieldErrors: {} }) } };
}
