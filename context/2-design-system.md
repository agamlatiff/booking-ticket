# 2. Design System & Components

> **Priority:** 🔴 **HIGH** — Ensures visual consistency across all pages.

---

## Reference Design Source

> [!IMPORTANT]
> All designs in this document are based on the reference folder:  
> **`stitch_flight_search_landing_page/`**

### Visual Reference Gallery

Use these screenshots as the **source of truth** for implementation:

#### Customer Pages

| Page                     | Reference Screenshot                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Homepage**             | [flight_search_landing_page/screen.png](file:///c:/Projects/booking-ticket/stitch_flight_search_landing_page/flight_search_landing_page/screen.png)                                                                                                                                                                                                                                                                                   |
| **Flight Results**       | [flight_results_page/screen.png](file:///c:/Projects/booking-ticket/stitch_flight_search_landing_page/flight_results_page/screen.png)                                                                                                                                                                                                                                                                                                 |
| **Seat Selection**       | [flight_seat_selection/screen.png](file:///c:/Projects/booking-ticket/stitch_flight_search_landing_page/flight_seat_selection/screen.png)                                                                                                                                                                                                                                                                                             |
| **Payment/Checkout**     | [seat_selection_payment/screen.png](file:///c:/Projects/booking-ticket/stitch_flight_search_landing_page/seat_selection_payment/screen.png)                                                                                                                                                                                                                                                                                           |
| **Booking Confirmation** | [booking_confirmation_1/screen.png](file:///c:/Projects/booking-ticket/stitch_flight_search_landing_page/booking_confirmation_1/screen.png), [booking_confirmation_2/screen.png](file:///c:/Projects/booking-ticket/stitch_flight_search_landing_page/booking_confirmation_2/screen.png)                                                                                                                                              |
| **Manage Booking**       | [manage_booking_details/screen.png](file:///c:/Projects/booking-ticket/stitch_flight_search_landing_page/manage_booking_details/screen.png)                                                                                                                                                                                                                                                                                           |
| **About Us**             | [about_us\_\_our_story_1/screen.png](file:///c:/Projects/booking-ticket/stitch_flight_search_landing_page/about_us__our_story_1/screen.png), [about_us\_\_our_story_2/screen.png](file:///c:/Projects/booking-ticket/stitch_flight_search_landing_page/about_us__our_story_2/screen.png), [about_us\_\_our_story_3/screen.png](file:///c:/Projects/booking-ticket/stitch_flight_search_landing_page/about_us__our_story_3/screen.png) |

#### Admin Dashboard

| Page                   | Reference Screenshot                                                                                                                                                                                                                                                                                                                         |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Dashboard Overview** | [admin_dashboard_overview_1/screen.png](file:///c:/Projects/booking-ticket/stitch_flight_search_landing_page/admin_dashboard_overview_1/screen.png), [admin_dashboard_overview_2/screen.png](file:///c:/Projects/booking-ticket/stitch_flight_search_landing_page/admin_dashboard_overview_2/screen.png)                                     |
| **Flights Management** | [admin\_\_flights_overview/screen.png](file:///c:/Projects/booking-ticket/stitch_flight_search_landing_page/admin__flights_overview/screen.png)                                                                                                                                                                                              |
| **Bookings**           | [admin\_\_manage_bookings/screen.png](file:///c:/Projects/booking-ticket/stitch_flight_search_landing_page/admin__manage_bookings/screen.png)                                                                                                                                                                                                |
| **Users**              | [admin\_\_users_management/screen.png](file:///c:/Projects/booking-ticket/stitch_flight_search_landing_page/admin__users_management/screen.png)                                                                                                                                                                                              |
| **Settings**           | [admin\_\_global_settings/screen.png](file:///c:/Projects/booking-ticket/stitch_flight_search_landing_page/admin__global_settings/screen.png)                                                                                                                                                                                                |
| **Performance**        | [admin\_\_performance_monitor/screen.png](file:///c:/Projects/booking-ticket/stitch_flight_search_landing_page/admin__performance_monitor/screen.png)                                                                                                                                                                                        |
| **Reports**            | [admin\_\_reports_hub/screen.png](file:///c:/Projects/booking-ticket/stitch_flight_search_landing_page/admin__reports_hub/screen.png)                                                                                                                                                                                                        |
| **Notifications**      | [admin\_\_transaction_notifications_1/screen.png](file:///c:/Projects/booking-ticket/stitch_flight_search_landing_page/admin__transaction_notifications_1/screen.png), [admin\_\_transaction_notifications_2/screen.png](file:///c:/Projects/booking-ticket/stitch_flight_search_landing_page/admin__transaction_notifications_2/screen.png) |

---

## Design Principles

Based on the reference designs, the FlyHigher design system follows these principles:

| Principle            | Implementation                                                    |
| -------------------- | ----------------------------------------------------------------- |
| **Light & Airy**     | Light gray backgrounds (#f6f7f8), white cards with subtle shadows |
| **Modern & Minimal** | Clean lines, rounded corners, minimal borders                     |
| **Premium Feel**     | Outfit font, smooth animations, gradient accents                  |
| **Trust Signals**    | Security badges, clear pricing, confirmation states               |

---

## Color Palette

### Primary Colors

```css
/* Tailwind Config - colors */
sky-primary:     #2b8cee  /* Primary blue — CTAs, active states */
background-light: #f6f7f8  /* Page backgrounds */
text-dark:       #111418  /* Headings, primary text */
```

### Accent Colors

```css
pastel-blue:     #c5d9f2  /* Decorative circles, soft backgrounds */
pastel-yellow:   #fef9c3  /* Highlights, gradient endpoints */
```

### Status Colors

```css
/* Success */  green-500, green-600, green-50 (backgrounds)
/* Warning */  amber-500, amber-50
/* Error */    red-500, red-600, red-50
/* Info */     blue-500, blue-50
```

---

## Typography

### Font Family

```css
font-family: "Outfit", sans-serif;
/* Weights: 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold), 800 (ExtraBold), 900 (Black) */
```

### Type Scale

| Element    | CSS Class                             | Usage                        |
| ---------- | ------------------------------------- | ---------------------------- |
| Hero Title | `text-4xl md:text-6xl font-extrabold` | Landing page main headline   |
| Page Title | `text-3xl md:text-4xl font-extrabold` | Section headers              |
| Card Title | `text-xl md:text-2xl font-bold`       | Card headers                 |
| Body Large | `text-lg font-medium`                 | Subtitles, important info    |
| Body       | `text-base`                           | Regular content              |
| Small      | `text-sm text-gray-500`               | Labels, meta info            |
| Tiny       | `text-xs text-gray-400`               | Timestamps, secondary labels |

---

## Spacing & Layout

### Container

```css
/* Standard page container */
max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8
```

### Grid System

```css
/* Two-column layout */
lg:grid lg:grid-cols-12 gap-8

/* Main content: 8 cols, Sidebar: 4 cols */
lg:col-span-8
lg:col-span-4
```

### Spacing Scale

```css
/* Use Tailwind's default spacing */
gap-2 (0.5rem)  → Tight grouping
gap-4 (1rem)   → Component internal
gap-6 (1.5rem) → Section internal
gap-8 (2rem)   → Between sections
```

---

## Component Patterns

### Card Component

```css
/* Standard card */
bg-white rounded-2xl p-6 shadow-lg shadow-sky-primary/5 border border-gray-100

/* Premium card with gradient */
bg-white rounded-[2rem] p-6 shadow-xl shadow-sky-primary/5 border border-gray-100
/* + Gradient bar at top */
<div className="h-2 bg-gradient-to-r from-sky-primary via-blue-300 to-yellow-300 rounded-t-[2rem]" />
```

### Button Variants

```typescript
// Primary (CTA)
"bg-sky-primary hover:bg-sky-600 text-white font-bold rounded-full px-8 py-4
transition-all shadow-lg shadow-sky-primary/20 disabled:opacity-50"

// Secondary
"bg-gray-100 hover:bg-gray-200 text-text-dark font-semibold rounded-full px-6 py-3
transition-colors"

// Ghost
"text-gray-600 hover:text-sky-primary hover:bg-sky-50 rounded-lg px-4 py-2
transition-colors"

// Danger
"bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-full px-6 py-3
transition-colors"
```

### Input Fields

```css
/* Standard input */
w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl
focus:outline-none focus:ring-2 focus:ring-sky-primary/20 focus:border-sky-primary
transition-all

/* Error state */
ring-2 ring-red-500/20 border-red-500 text-red-600
```

### Badges

```css
/* Status badges */
px-3 py-1 rounded-full text-sm font-medium

/* Variants */
bg-green-100 text-green-700   → Confirmed, Success
bg-amber-100 text-amber-700   → Pending
bg-red-100 text-red-700       → Cancelled, Failed
bg-sky-100 text-sky-700       → Info, Selected
bg-gray-100 text-gray-700     → Default
```

---

## UI Components Inventory

### Existing (`src/components/ui/`)

| Component        | Status    | Notes                     |
| ---------------- | --------- | ------------------------- |
| `accordion.tsx`  | ✅ Ready  | Radix UI based            |
| `badge.tsx`      | ✅ Ready  | CVA variants              |
| `button.tsx`     | ⚠️ Update | Add rounded-full variants |
| `data-table.tsx` | ✅ Ready  | For admin                 |
| `input.tsx`      | ⚠️ Update | Add new styles            |
| `label.tsx`      | ✅ Ready  | Radix UI based            |
| `select.tsx`     | ✅ Ready  | Radix UI based            |
| `skeleton.tsx`   | ⚠️ Update | Match light theme         |
| `table.tsx`      | ✅ Ready  | For admin                 |
| `toast.tsx`      | ✅ Ready  | Radix UI based            |
| `toaster.tsx`    | ✅ Ready  | Toast container           |

### Needed Components

| Component    | Priority  | Description                         |
| ------------ | --------- | ----------------------------------- |
| `Card`       | 🔴 High   | Standard card wrapper with variants |
| `Modal`      | 🔴 High   | For confirmations, forms            |
| `Tabs`       | 🔴 High   | For payment methods, filters        |
| `Breadcrumb` | 🟡 Medium | Navigation trail                    |
| `Avatar`     | 🟡 Medium | User profile display                |
| `EmptyState` | 🟡 Medium | No results display                  |
| `Tooltip`    | 🟢 Low    | Contextual info                     |

> [!NOTE] > **No standalone Spinner component** — Use inline micro-spinner CSS only for button loading states.

---

## Page-Specific Components

### Homepage

| Component            | File                  | Purpose              |
| -------------------- | --------------------- | -------------------- |
| `FlightSearchWidget` | `(home)/_components/` | Tabbed search form   |
| `DestinationCard`    | `(home)/_components/` | Popular destinations |
| `NavbarLight`        | `_components/`        | Light theme navbar   |

### Flight Results

| Component       | File                             | Purpose                 |
| --------------- | -------------------------------- | ----------------------- |
| `FlightItem`    | `available-flights/_components/` | Flight result card      |
| `FilterClass`   | `available-flights/_components/` | Class filter checkboxes |
| `FilterFlight`  | `available-flights/_components/` | Stops filter            |
| `FilterAirline` | `available-flights/_components/` | Airline filter          |

### Seat Selection

| Component          | File                            | Purpose                   |
| ------------------ | ------------------------------- | ------------------------- |
| `SeatItem`         | `choose-seat/[id]/_components/` | Individual seat button    |
| `SeatList`         | `choose-seat/[id]/_components/` | Seat grid container       |
| `SeatClassToggle`  | `choose-seat/[id]/_components/` | Class switcher tabs       |
| `SeatLegend`       | `choose-seat/[id]/_components/` | Interactive legend filter |
| `FlightDetail`     | `choose-seat/[id]/_components/` | Sidebar summary           |
| `MobileSummaryBar` | `choose-seat/[id]/_components/` | Mobile sticky CTA         |

### Checkout

| Component           | File                    | Purpose                 |
| ------------------- | ----------------------- | ----------------------- |
| `BookingSummary`    | `checkout/_components/` | Trip summary card       |
| `PaymentForm`       | `checkout/_components/` | Credit card form        |
| `PaymentMethodTabs` | `checkout/_components/` | Payment method selector |

---

## Animation Guidelines

### Transitions

```css
/* Standard transition */
transition-all duration-200

/* Hover effects */
hover:scale-105 transition-transform

/* Focus rings */
focus:ring-2 focus:ring-sky-primary/20 transition-all
```

### Loading States

> [!IMPORTANT] > **Primary:** Use **skeleton loading** for page/section content.  
> **Secondary:** Use **inline micro-spinner** ONLY for small scope (button submit, inline refresh icons).

```css
/* Skeleton pulse (PRIMARY - for page/section loading) */
animate-pulse bg-gray-200 rounded-xl

/* Skeleton variants */
.skeleton-text { @apply h-4 bg-gray-200 rounded animate-pulse; }
.skeleton-title { @apply h-8 bg-gray-200 rounded-lg animate-pulse; }
.skeleton-card { @apply h-48 bg-gray-200 rounded-2xl animate-pulse; }
.skeleton-avatar { @apply h-12 w-12 bg-gray-200 rounded-full animate-pulse; }

/* Micro-spinner (SECONDARY - for button/inline only) */
/* Use inline, not as component */
<span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
```

**When to use each:**

| Scenario               | Loading Type                       |
| ---------------------- | ---------------------------------- |
| Page initial load      | Skeleton (via `loading.tsx`)       |
| Flight list loading    | Skeleton cards                     |
| Filter results loading | Skeleton cards                     |
| Button submit          | Inline micro-spinner inside button |
| Inline refresh icon    | Micro-spinner                      |
| Modal loading          | Skeleton inside modal              |

### Entrance Animations

```css
/* Fade in up - use Tailwind animation utilities or Framer Motion */
opacity-0 translate-y-4 → opacity-100 translate-y-0
```

---

## Responsive Breakpoints

| Breakpoint | Width  | Usage                   |
| ---------- | ------ | ----------------------- |
| `sm`       | 640px  | Mobile landscape        |
| `md`       | 768px  | Tablets                 |
| `lg`       | 1024px | Desktop (sidebar shows) |
| `xl`       | 1280px | Large desktop           |
| `2xl`      | 1536px | Ultra-wide              |

### Mobile-First Patterns

```css
/* Hidden on mobile, visible on desktop */
hidden lg:block

/* Full width on mobile, constrained on desktop */
w-full lg:w-auto

/* Sticky mobile bar */
fixed bottom-0 left-0 w-full lg:hidden
```

---

## Next Steps

1. Update `button.tsx` with new variants
2. Create reusable `Card` component
3. Create `Tabs` component for payment methods
4. Create `Breadcrumb` component
5. Standardize loading skeletons

Continue to [3-data-layer.md](file:///c:/Projects/booking-ticket/context/3-data-layer.md)

---

_Last updated: December 21, 2025_
