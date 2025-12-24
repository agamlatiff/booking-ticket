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

## Phase 1: Design System Setup

### 1.1 Update Tailwind Config

- [ ] Add custom colors (primary, accent, background, surface)
- [ ] Add custom border radius
- [ ] Add custom shadows
- [ ] Configure dark mode

### 1.2 Update Global Styles

- [ ] Import Inter font
- [ ] Import Material Symbols icons
- [ ] Add custom animations (float, draw)
- [ ] Add utility classes

### 1.3 Create Shared Components

- [ ] Update Button component (rounded-full style)
- [ ] Update Card component (rounded-2xl/3xl)
- [ ] Create NavBar component (new style)
- [ ] Create Footer component
- [ ] Create Badge component (new style)

---

## Phase 2: User Pages

### 2.1 Homepage (`/`)

- [ ] Hero section dengan search form
- [ ] Partners logo section
- [ ] Trending destinations grid
- [ ] Exclusive deals section
- [ ] Easy booking process steps
- [ ] Airline partners grid
- [ ] Testimonial section
- [ ] Stats section
- [ ] CTA section
- [ ] Footer

### 2.2 Login Page (`/sign-in`)

- [ ] Redesign login form
- [ ] Add illustration/background
- [ ] Dark/light mode support

### 2.3 Register Page (`/sign-up`)

- [ ] Redesign register form
- [ ] Add illustration/background
- [ ] Dark/light mode support

### 2.4 Flight Results (`/available-flights`)

- [ ] Flight search filters sidebar
- [ ] Flight cards grid/list
- [ ] Sorting options
- [ ] Empty state (no flights)

### 2.5 Choose Seat (`/choose-seat/[id]`)

- [ ] Airplane seat layout
- [ ] Seat legend
- [ ] Price summary sidebar
- [ ] Seat type indicators

### 2.6 Success Booking (`/success-checkout`)

- [ ] Booking confirmation card
- [ ] Ticket preview
- [ ] Download/Print actions

### 2.7 My Tickets (`/my-tickets`)

- [ ] Ticket cards grid
- [ ] Status badges
- [ ] Empty state

---

## Phase 3: New Pages (Optional)

### 3.1 Destinations List (`/destinations`)

- [ ] Destination cards grid
- [ ] Search/filter destinations
- [ ] Popular destinations

### 3.2 Destination Detail (`/destinations/[slug]`)

- [ ] Destination hero image
- [ ] Description
- [ ] Flights to destination

### 3.3 Partners Page (`/partners`)

- [ ] Partner airlines grid
- [ ] Partner info

### 3.4 Support Page (`/support`)

- [ ] FAQ accordion
- [ ] Contact form
- [ ] Help categories

---

## Phase 4: Admin Dashboard

### 4.1 Dashboard Home (`/dashboard`)

- [ ] Stats cards (new style)
- [ ] Recent bookings table
- [ ] Revenue chart
- [ ] Quick actions

### 4.2 Airplanes Management (`/dashboard/airplanes`)

- [ ] Data table (new style)
- [ ] CRUD forms
- [ ] Image upload

### 4.3 Flights Management (`/dashboard/flights`)

- [ ] Data table (new style)
- [ ] CRUD forms
- [ ] Calendar picker

### 4.4 Tickets Management (`/dashboard/tickets`)

- [ ] Data table (new style)
- [ ] Status filters
- [ ] Detail view

### 4.5 Users Management (`/dashboard/users`)

- [ ] Data table (new style)
- [ ] Role management
- [ ] User detail

---

## Phase 5: Polish & Testing

### 5.1 Responsive Design

- [ ] Mobile breakpoints
- [ ] Tablet breakpoints
- [ ] Touch-friendly interactions

### 5.2 Dark Mode

- [ ] Test all pages in dark mode
- [ ] Fix contrast issues
- [ ] Smooth transitions

### 5.3 Animations

- [ ] Page transitions
- [ ] Hover effects
- [ ] Loading states
- [ ] Micro-interactions

### 5.4 Performance

- [ ] Image optimization
- [ ] Code splitting
- [ ] Bundle size check

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
