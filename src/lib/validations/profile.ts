import { z } from "zod";
import { phoneSchema } from "./booking";

// ============================================
// USER PROFILE VALIDATION
// ============================================

/**
 * Update user profile validation
 */
export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(2, "Nama minimal 2 karakter")
    .max(100, "Nama maksimal 100 karakter"),
  phone: phoneSchema.optional().or(z.literal("")),
  address: z.string().max(500, "Alamat maksimal 500 karakter").optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

/**
 * Complete profile validation (for new OAuth users)
 */
export const completeProfileSchema = z.object({
  name: z
    .string()
    .min(2, "Nama minimal 2 karakter")
    .max(100, "Nama maksimal 100 karakter"),
  phone: phoneSchema,
});

export type CompleteProfileInput = z.infer<typeof completeProfileSchema>;

/**
 * Avatar upload validation
 */
export const avatarUploadSchema = z.object({
  file: z.instanceof(File).refine(
    (file) => file.size <= 5 * 1024 * 1024, // 5MB
    "Ukuran file maksimal 5MB"
  ).refine(
    (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
    "Format file harus JPG, PNG, atau WebP"
  ),
});

export type AvatarUploadInput = z.infer<typeof avatarUploadSchema>;
