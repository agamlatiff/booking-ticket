// ============================================
// VALIDATION SCHEMAS - DENTAL CARE
// ============================================

// Booking validations
export {
  phoneSchema,
  createBookingSchema,
  cancelBookingSchema,
  bookingFilterSchema,
  doctorBookingSchema,
  newPatientSchema,
  slotQuerySchema,
  availabilityQuerySchema,
  type CreateBookingInput,
  type CancelBookingInput,
  type BookingFilterInput,
  type DoctorBookingInput,
  type NewPatientInput,
  type SlotQueryInput,
  type AvailabilityQueryInput,
} from "./booking";

// Contact validations
export {
  contactSchema,
  newsletterSchema,
  type ContactInput,
  type NewsletterInput,
} from "./contact";

// Profile validations
export {
  updateProfileSchema,
  completeProfileSchema,
  avatarUploadSchema,
  type UpdateProfileInput,
  type CompleteProfileInput,
  type AvatarUploadInput,
} from "./profile";
