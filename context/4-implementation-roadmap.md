# 4. Implementation Roadmap

> **Priority:** 🔴 **ESSENTIAL** — Follow this step-by-step for systematic implementation.

---

## Phase Overview

```mermaid
gantt
    title FlyHigher Redesign Roadmap
    dateFormat  YYYY-MM-DD
    section Foundation
    Design System Setup      :a1, 2025-12-21, 2d
    Slug Implementation      :a2, after a1, 1d
    Query Infrastructure     :a3, after a2, 1d
    section Customer Pages
    Homepage Refinement      :b1, after a3, 1d
    Flight Results           :b2, after b1, 2d
    Seat Selection           :b3, after b2, 1d
    Checkout                 :b4, after b3, 2d
    Booking Confirmation     :b5, after b4, 1d
    About Us Page            :b6, after b5, 1d
    Manage Booking           :b7, after b6, 1d
    section Admin Dashboard
    Dashboard Overview       :c1, after b7, 2d
    Flight Management        :c2, after c1, 1d
    Booking Management       :c3, after c2, 1d
    User Management          :c4, after c3, 1d
    Global Settings          :c5, after c4, 1d
    Performance Monitor      :c6, after c5, 1d
    Reports Hub              :c7, after c6, 1d
    Notifications            :c8, after c7, 1d
    section Polish
    Performance Optimization :d1, after c8, 2d
    SEO & Accessibility      :d2, after d1, 1d
```

---

## Phase 1: Foundation (Days 1-3)

### 1.1 Design System Setup

**Files to Create/Update:**

| Task                        | File                                | Priority |
| --------------------------- | ----------------------------------- | -------- |
| Add reusable Card component | `src/components/ui/card.tsx`        | 🔴       |
| Add Tabs component          | `src/components/ui/tabs.tsx`        | 🔴       |
| Add Breadcrumb component    | `src/components/ui/breadcrumb.tsx`  | 🟡       |
| Enhance Skeleton component  | `src/components/ui/skeleton.tsx`    | 🟡       |
| Add EmptyState component    | `src/components/ui/empty-state.tsx` | 🟡       |
| Update button variants      | `src/components/ui/button.tsx`      | 🟡       |
| Add design tokens           | `tailwind.config.ts`                | ✅ Done  |

> [!NOTE] > **Loading Strategy:** Use **skeleton loading** for page/section loading. **Inline micro-spinner** only for small scope operations (button submit, inline refresh).

**Verification:**

- [ ] Create a test page at `/dev/design-system` to preview all components
- [ ] Verify components render correctly on mobile and desktop

---

### 1.2 Slug Implementation

**Goal:** Replace UUID-only URLs with human-readable slugs for better SEO.

**Database Changes:**

```prisma
// prisma/schema.prisma

model Flight {
  id                  String       @id @default(cuid())
  slug                String       @unique  // NEW: e.g., "jkt-dps-2025-01-15"
  // ... other fields
}

model Ticket {
  id            String       @id @default(cuid())
  code          String       @unique  // Already exists, use as slug
  slug          String       @unique  // NEW: e.g., "booking-abc123"
  // ... other fields
}
```

**Slug Generation Logic:**

```typescript
// src/lib/utils.ts

export function generateFlightSlug(flight: {
  departureCityCode: string;
  destinationCityCode: string;
  departureDate: Date;
}): string {
  const date = dayjs(flight.departureDate).format("YYYY-MM-DD");
  return `${flight.departureCityCode.toLowerCase()}-${flight.destinationCityCode.toLowerCase()}-${date}`;
}

export function generateBookingSlug(ticketCode: string): string {
  return `booking-${ticketCode.toLowerCase()}`;
}
```

**Route Changes:**

| Current                   | New                   | Purpose               |
| ------------------------- | --------------------- | --------------------- |
| `/choose-seat/[id]`       | `/choose-seat/[slug]` | Flight seat selection |
| `/my-tickets/detail/[id]` | `/my-tickets/[slug]`  | Ticket details        |

**Implementation Steps:**

1. [ ] Add `slug` field to Flight and Ticket models in Prisma schema
2. [ ] Create migration: `npx prisma migrate dev --name add_slugs`
3. [ ] Update seed script to generate slugs for existing data
4. [ ] Create slug generation utility functions
5. [ ] Update API routes to support lookup by slug
6. [ ] Update page routes to use `[slug]` instead of `[id]`
7. [ ] Add redirects for old UUID URLs to new slug URLs

---

### 1.3 Query Infrastructure

**Files to Create:**

| File                             | Purpose                           |
| -------------------------------- | --------------------------------- |
| `src/lib/query-keys.ts`          | Centralized query key definitions |
| `src/lib/query-client.ts`        | Query client configuration        |
| `src/lib/validations/index.ts`   | Zod schema exports                |
| `src/lib/validations/booking.ts` | Booking-related schemas           |
| `src/lib/validations/flight.ts`  | Flight search schemas             |

---

## Phase 2: Customer Pages (Days 4-10)

### 2.1 Homepage Refinement

**Reference:** `stitch_flight_search_landing_page/flight_search_landing_page/`

**Tasks:**

| Task                            | Component                  | Status  |
| ------------------------------- | -------------------------- | ------- |
| Hero section with search widget | `page.tsx`                 | ✅ Done |
| Popular destinations            | `DestinationCard.tsx`      | ✅ Done |
| Floating 3D illustrations       | `page.tsx`                 | ✅ Done |
| Light navbar                    | `NavbarLight.tsx`          | ✅ Done |
| SEO meta tags                   | `page.tsx` or `layout.tsx` | 🔴 TODO |

**Remaining Work:**

- [ ] Add proper SEO metadata (title, description, OpenGraph)
- [ ] Add structured data for flight search (JSON-LD)
- [ ] Optimize images with next/image
- [ ] Add loading states for destination cards

---

### 2.2 Flight Results Page

**Reference:** `stitch_flight_search_landing_page/flight_results_page/`

**Tasks:**

| Task                     | Component               | Status     |
| ------------------------ | ----------------------- | ---------- |
| Search header with route | `page.tsx`              | ✅ Done    |
| Filter sidebar           | `FilterClass.tsx`, etc. | ✅ Done    |
| Flight result cards      | `FlightItem.tsx`        | ✅ Done    |
| Sorting tabs             | `page.tsx`              | ✅ Done    |
| URL-based filters        | `page.tsx`              | 🟡 Partial |

**Remaining Work:**

- [ ] Persist filters in URL for shareability
- [ ] Add filter count badges
- [ ] Add skeleton loading per card
- [ ] Add "No results" empty state
- [ ] Add price range slider filter

---

### 2.3 Seat Selection Page

**Reference:** `stitch_flight_search_landing_page/flight_seat_selection/`

**Tasks:**

| Task               | Component              | Status  |
| ------------------ | ---------------------- | ------- |
| Fuselage seat map  | `SeatList.tsx`         | ✅ Done |
| Class toggle       | `SeatClassToggle.tsx`  | ✅ Done |
| Interactive legend | `SeatLegend.tsx`       | ✅ Done |
| Flight sidebar     | `FlightDetail.tsx`     | ✅ Done |
| Mobile bottom bar  | `MobileSummaryBar.tsx` | ✅ Done |

**Remaining Work:**

- [ ] Add seat reservation timeout (hold for 10 minutes)
- [ ] Show seat availability refresh indicator
- [ ] Add seat selection confirmation animation

---

### 2.4 Checkout Page

**Reference:** `stitch_flight_search_landing_page/seat_selection_payment/`

**Tasks:**

| Task                | Component                  | Status  |
| ------------------- | -------------------------- | ------- |
| Payment method tabs | `PaymentMethodTabs.tsx`    | ✅ Done |
| Credit card form    | `PaymentForm.tsx`          | ✅ Done |
| Booking summary     | `BookingSummary.tsx`       | ✅ Done |
| Mobile sticky bar   | `MobileSummaryWrapper.tsx` | ✅ Done |

**Remaining Work:**

- [ ] Add form validation with Zod
- [ ] Add card number formatting (spaces every 4 digits)
- [ ] Add card type detection (Visa/Mastercard icons)
- [ ] Add expiry date validation
- [ ] Add processing/loading overlay during payment

---

### 2.5 Booking Confirmation

**Reference:** `stitch_flight_search_landing_page/booking_confirmation_1/` and `booking_confirmation_2/`

**Tasks:**

| Task                            | Status   |
| ------------------------------- | -------- |
| Success page with confetti      | 🟡 Basic |
| Boarding pass preview           | 🔴 TODO  |
| Download ticket button          | 🔴 TODO  |
| Share booking option            | 🔴 TODO  |
| Email confirmation (UI preview) | 🔴 TODO  |

---

### 2.6 About Us Page

**Reference:** `stitch_flight_search_landing_page/about_us__our_story_1/`, `about_us__our_story_2/`, `about_us__our_story_3/`

**Tasks:**

| Task                            | Status  |
| ------------------------------- | ------- |
| Hero section with company story | 🔴 TODO |
| Team section                    | 🔴 TODO |
| Mission & values                | 🔴 TODO |
| Timeline/milestones             | 🔴 TODO |
| Contact section                 | 🔴 TODO |

---

### 2.7 Manage Booking Page

**Reference:** `stitch_flight_search_landing_page/manage_booking_details/`

**Tasks:**

| Task                     | Component              | Status  |
| ------------------------ | ---------------------- | ------- |
| Flight timeline          | `detail/[id]/page.tsx` | ✅ Done |
| Management action cards  | `detail/[id]/page.tsx` | ✅ Done |
| Passenger sidebar        | `detail/[id]/page.tsx` | ✅ Done |
| Payment summary          | `detail/[id]/page.tsx` | ✅ Done |
| Cancellation danger zone | `detail/[id]/page.tsx` | ✅ Done |

**Remaining Work:**

- [ ] Add change dates functionality
- [ ] Add baggage add-on modal
- [ ] Add class upgrade flow
- [ ] Add cancellation confirmation modal

---

## Phase 3: Admin Dashboard (Days 11-15)

### 3.1 Dashboard Overview

**Reference:** `stitch_flight_search_landing_page/admin_dashboard_overview_1/` and `admin_dashboard_overview_2/`

**Tasks:**

| Task                                   | Status  |
| -------------------------------------- | ------- |
| Stats cards (Revenue, Bookings, Users) | 🔴 TODO |
| Revenue chart                          | 🔴 TODO |
| Recent bookings table                  | 🔴 TODO |
| Quick actions                          | 🔴 TODO |

---

### 3.2 Flight Management

**Reference:** `stitch_flight_search_landing_page/admin__flights_overview/`

**Tasks:**

| Task                | Status     |
| ------------------- | ---------- |
| Flights data table  | ✅ Done    |
| Add flight form     | ✅ Done    |
| Edit flight modal   | 🟡 Partial |
| Delete confirmation | 🟡 Basic   |

---

### 3.3 Booking Management

**Reference:** `stitch_flight_search_landing_page/admin__manage_bookings/`

**Tasks:**

| Task                  | Status   |
| --------------------- | -------- |
| Bookings data table   | ✅ Done  |
| Booking status badges | 🟡 Basic |
| View booking details  | 🔴 TODO  |
| Manual status update  | 🔴 TODO  |

---

### 3.4 User Management

**Reference:** `stitch_flight_search_landing_page/admin__users_management/`

**Tasks:**

| Task                  | Status   |
| --------------------- | -------- |
| Users data table      | ✅ Done  |
| User role badges      | 🟡 Basic |
| Edit user modal       | 🔴 TODO  |
| Suspend/activate user | 🔴 TODO  |

---

### 3.5 Global Settings

**Reference:** `stitch_flight_search_landing_page/admin__global_settings/`

**Tasks:**

| Task                   | Status  |
| ---------------------- | ------- |
| General settings form  | 🔴 TODO |
| Payment gateway config | 🔴 TODO |
| Email templates config | 🔴 TODO |
| Pricing rules setup    | 🔴 TODO |

---

### 3.6 Performance Monitor

**Reference:** `stitch_flight_search_landing_page/admin__performance_monitor/`

**Tasks:**

| Task                        | Status  |
| --------------------------- | ------- |
| Real-time metrics dashboard | 🔴 TODO |
| API response time charts    | 🔴 TODO |
| Error rate monitoring       | 🔴 TODO |
| Server health indicators    | 🔴 TODO |

---

### 3.7 Reports Hub

**Reference:** `stitch_flight_search_landing_page/admin__reports_hub/`

**Tasks:**

| Task                          | Status  |
| ----------------------------- | ------- |
| Sales reports with date range | 🔴 TODO |
| Route popularity analytics    | 🔴 TODO |
| Customer insights             | 🔴 TODO |
| Export to CSV/PDF             | 🔴 TODO |

---

### 3.8 Transaction Notifications

**Reference:** `stitch_flight_search_landing_page/admin__transaction_notifications_1/` and `admin__transaction_notifications_2/`

**Tasks:**

| Task                            | Status  |
| ------------------------------- | ------- |
| Notification list               | 🔴 TODO |
| Filter by type (success/failed) | 🔴 TODO |
| Mark as read/unread             | 🔴 TODO |
| Real-time push notifications    | 🔴 TODO |

---

## Phase 4: Polish (Days 16-18)

### 4.1 Performance Optimization

| Task                                             | Priority |
| ------------------------------------------------ | -------- |
| Image optimization (next/image, WebP, lazy load) | 🔴       |
| Route prefetching                                | 🟡       |
| Bundle analysis and code splitting               | 🟡       |
| API response caching                             | 🟡       |
| Database query optimization (indexes)            | 🟡       |

### 4.2 SEO Implementation

| Task                      | Priority |
| ------------------------- | -------- |
| Meta tags per page        | 🔴       |
| Sitemap generation        | 🔴       |
| robots.txt                | 🔴       |
| Structured data (JSON-LD) | 🟡       |
| OpenGraph images          | 🟡       |

### 4.3 Accessibility

| Task                                | Priority |
| ----------------------------------- | -------- |
| ARIA labels on interactive elements | 🟡       |
| Keyboard navigation                 | 🟡       |
| Focus indicators                    | 🟡       |
| Color contrast verification         | 🟡       |

---

## Testing Plan

### Automated Tests

Currently no test framework detected. Recommend adding:

```bash
# Install testing dependencies
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

### Manual Testing Checklist

**For each page, verify:**

- [ ] Renders correctly on desktop (1920×1080)
- [ ] Renders correctly on tablet (768×1024)
- [ ] Renders correctly on mobile (375×667)
- [ ] Loading states display properly
- [ ] Error states display properly
- [ ] Form validation works
- [ ] Navigation links work
- [ ] Data persists across page refreshes where expected

---

## Next Steps

1. Start with Phase 1.1 — Create missing UI components
2. Then Phase 1.2 — Implement slug system
3. Follow phases in order

See [5-recommendations.md](file:///c:/Projects/booking-ticket/context/5-recommendations.md) for additional suggestions.

---

_Last updated: December 21, 2025_
