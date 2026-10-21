/**
 * Schema for the ModulWoods website contact form.
 * Validates the payload sent to POST /api/contact.
 */
import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name"),
  email: z.string().trim().email("Enter a valid e-mail address"),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().min(12, "Please add a little more detail"),
  /** Honeypot — real people never fill this in. */
  website: z.string().max(0).optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
