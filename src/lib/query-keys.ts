/**
 * Centralized Query Keys for TanStack Query
 * 
 * Use these keys for consistent caching and invalidation across the app.
 */

// Type definitions for query parameters
export interface BookingFilterParams {
  status?: 'PENDING' | 'PAID' | 'CHECKED_IN' | 'COMPLETED' | 'CANCELLED' | 'EXPIRED'
  startDate?: string
  endDate?: string
  doctorId?: string
}

export interface DoctorFilterParams {
  query?: string
  active?: boolean
}

export const queryKeys = {
  // ============================================
  // DOCTORS
  // ============================================
  doctors: {
    all: ['doctors'] as const,
    list: (params?: DoctorFilterParams) => ['doctors', 'list', params] as const,
    detail: (id: string) => ['doctors', id] as const,
  },

  // ============================================
  // SERVICES
  // ============================================
  services: {
    all: ['services'] as const,
    detail: (id: string) => ['services', id] as const,
  },

  // ============================================
  // SCHEDULES / SLOTS
  // ============================================
  schedules: {
    all: ['schedules'] as const,
    byDate: (date: string) => ['schedules', 'date', date] as const,
    byDoctor: (doctorId: string) => ['schedules', 'doctor', doctorId] as const,
    availableSlots: (date: string, doctorId?: string) =>
      ['schedules', 'slots', date, doctorId] as const,
  },

  // ============================================
  // BOOKINGS
  // ============================================
  bookings: {
    all: ['bookings'] as const,
    list: (params?: BookingFilterParams) => ['bookings', 'list', params] as const,
    mine: () => ['bookings', 'mine'] as const,
    detail: (id: string) => ['bookings', id] as const,
    check: (code: string) => ['bookings', 'check', code] as const,
  },

  // ============================================
  // USER / PATIENTS
  // ============================================
  user: {
    current: ['user', 'current'] as const,
    profile: (id: string) => ['user', id] as const,
    list: ['users'] as const,
  },

  // ============================================
  // ADMIN DASHBOARD
  // ============================================
  admin: {
    stats: ['admin', 'stats'] as const,
    reports: (period?: string) => ['admin', 'reports', period] as const,
  },
} as const

// Helper type to extract query key types
export type QueryKeys = typeof queryKeys
