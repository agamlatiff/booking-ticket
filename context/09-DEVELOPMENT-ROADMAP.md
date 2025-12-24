# Development Roadmap

## Overview

Roadmap untuk migrasi design ke **FlyHigher Design System** yang baru.

---

## Design Reference

📁 **Source**: `fly-higher-design/stitch_flight_booking_landing_page/`

### Design Pages Available

| Page               | Reference                   |
| ------------------ | --------------------------- |
| Homepage           | `home-page/`                |
| Login              | `login-page/`               |
| Register           | `register-page/`            |
| Flight Results     | `flight-result-page/`       |
| Choose Seat        | `choose-seat-page/`         |
| Success Booking    | `success-booking-page/`     |
| Destination List   | `destination-list-page/`    |
| Destination Detail | `destination-detail-page/`  |
| Partners           | `partners-page/`            |
| Support            | `support-page/`             |
| Empty State        | `empty-state-flights-page/` |
| Admin Dashboard    | `dashboard-page/`           |
| Admin Airplanes    | `airplanes-admin-page/`     |
| Admin Flights      | `flights-admin-page/`       |
| Admin Tickets      | `ticket-admin-page/`        |
| Admin Users        | `user-admin-page/`          |

---

## Design System

### Colors

```
Primary: #0f172a (Slate Dark)
Accent: #38bdf8 (Sky Blue)
Background Light: #f8fafc
Background Dark: #020617
Surface Light: #ffffff
Surface Dark: #1e293b
```

### Typography

- Font: **Inter** (Google Fonts)
- Weights: 300, 400, 500, 600, 700

### Icons

- **Material Symbols Outlined** (Google Fonts)

### Features

- ✅ Dark/Light mode toggle
- ✅ Rounded corners (2xl, 3xl radius)
- ✅ Modern card shadows
- ✅ Hover animations
- ✅ Responsive grid layouts

---

## Phase 1: Design System Setup ✅

### 1.1 Update Tailwind Config ✅

- [x] Add custom colors (primary, accent, background, surface)
- [x] Add custom border radius
- [x] Add custom shadows
- [x] Configure dark mode

### 1.2 Update Global Styles ✅

- [x] Import Inter font
- [x] Import Material Symbols icons
- [x] Add custom animations (float, draw)
- [x] Add utility classes

### 1.3 Create Shared Components ✅

- [x] Update Button component (rounded-full style)
- [x] Update Card component (rounded-2xl/3xl)
- [x] Create NavBar component (new style)
- [x] Create Footer component
- [ ] Create Badge component (new style)

---

## Phase 2: User Pages ✅

### 2.1 Homepage (`/`) ✅

- [x] Hero section dengan search form
- [x] Partners logo section
- [x] Trending destinations grid
- [x] Exclusive deals section
- [x] Easy booking process steps
- [x] Stats section
- [x] Footer

### 2.2 Login Page (`/sign-in`) ✅

- [x] Redesign login form
- [x] Add illustration/background
- [x] Dark/light mode support

### 2.3 Register Page (`/sign-up`) ✅

- [x] Redesign register form
- [x] Add illustration/background
- [x] Dark/light mode support

### 2.4 Flight Results (`/available-flights`) ✅

- [x] Flight search filters sidebar
- [x] Flight cards grid/list
- [x] Sorting options
- [x] Empty state (no flights)

### 2.5 Choose Seat (`/choose-seat/[id]`) ✅

- [x] Airplane seat layout
- [x] Seat legend
- [x] Price summary sidebar
- [x] Seat type indicators

### 2.6 Success Booking (`/success-checkout`) ✅

- [x] Booking confirmation card
- [x] Ticket preview
- [x] Download/Print actions

### 2.7 My Tickets (`/my-tickets`) ✅

- [x] Ticket cards grid
- [x] Status badges
- [x] Empty state

---

## Phase 3: New Pages ✅

### 3.1 Destinations List (`/destinations`) ✅

- [x] Destination cards grid
- [x] Search/filter destinations
- [x] Popular destinations

### 3.2 Destination Detail (`/destinations/[slug]`)

- [ ] Destination hero image
- [ ] Description
- [ ] Flights to destination

### 3.3 Partners Page (`/partners`) ✅

- [x] Partner airlines grid
- [x] Partner info
- [x] Benefits section

### 3.4 Support Page (`/support`) ✅

- [x] FAQ accordion
- [x] Contact form
- [x] Help categories

---

## Phase 4: Admin Dashboard ✅

### 4.1 Dashboard Home (`/dashboard`) ✅

- [x] Stats cards (new style)
- [x] Recent bookings table
- [x] Quick actions
- [x] System status

### 4.2 Airplanes Management (`/dashboard/airplanes`) ✅

- [x] Data table (new style)
- [x] Stats cards
- [x] Material Symbols icons

### 4.3 Flights Management (`/dashboard/flights`) ✅

- [x] Data table (new style)
- [x] Stats cards
- [x] Material Symbols icons

### 4.4 Tickets Management (`/dashboard/tickets`) ✅

- [x] Data table (new style)
- [x] Status filters
- [x] Stats cards

### 4.5 Users Management (`/dashboard/users`) ✅

- [x] Data table (new style)
- [x] Stats cards
- [x] Material Symbols icons

---

## Phase 5: Polish & Testing ✅

### 5.1 Responsive Design ✅

- [x] Mobile breakpoints
- [x] Tablet breakpoints
- [x] Touch-friendly interactions

### 5.2 Dark Mode ✅

- [x] Test all pages in dark mode
- [x] Theme toggle component
- [x] LocalStorage persistence
- [x] System preference detection

### 5.3 Animations ✅

- [x] Hover effects
- [x] Transition effects
- [x] Loading states

### 5.4 Performance

- [x] Image optimization (external URLs)
- [ ] Code splitting (future)
- [ ] Bundle size check (future)

---

## Implementation Order

| Priority  | Phase                     | Effort   |
| --------- | ------------------------- | -------- |
| 🔴 High   | 1. Design System Setup    | 1-2 days |
| 🔴 High   | 2.1 Homepage              | 2-3 days |
| 🔴 High   | 2.2-2.3 Auth Pages        | 1 day    |
| 🟠 Medium | 2.4 Flight Results        | 1-2 days |
| 🟠 Medium | 2.5 Choose Seat           | 1-2 days |
| 🟠 Medium | 2.6-2.7 Success & Tickets | 1 day    |
| 🟢 Low    | 3 New Pages               | 2-3 days |
| 🟠 Medium | 4 Admin Dashboard         | 3-4 days |
| 🟢 Low    | 5 Polish                  | 2-3 days |

**Total Estimated Time**: 2-3 weeks

---

## Getting Started

```bash
# 1. View design reference
# Open fly-higher-design/stitch_flight_booking_landing_page/{page}/screen.png

# 2. View HTML code reference
# Open fly-higher-design/stitch_flight_booking_landing_page/{page}/code.html

# 3. Start development
npm run dev

# 4. Apply changes incrementally per phase
```
