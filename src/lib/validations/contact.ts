import { z } from "zod";

// ============================================
// CONTACT FORM VALIDATION
// ============================================

/**
 * Contact form submission validation
 */
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Nama minimal 2 karakter")
    .max(100, "Nama maksimal 100 karakter"),
  email: z.string().email("Email tidak valid"),
  subject: z
    .string()
    .min(5, "Subjek minimal 5 karakter")
    .max(200, "Subjek maksimal 200 karakter"),
  message: z
    .string()
    .min(20, "Pesan minimal 20 karakter")
    .max(2000, "Pesan maksimal 2000 karakter"),
});

export type ContactInput = z.infer<typeof contactSchema>;

/**
 * Newsletter subscription validation
 */
export const newsletterSchema = z.object({
  email: z.string().email("Email tidak valid"),
  name: z.string().min(2).max(100).optional(),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;
