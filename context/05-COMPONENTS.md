# Components

## Overview

Komponen UI terletak di `/src/components/ui/` menggunakan pattern yang terinspirasi dari shadcn/ui.

---

## UI Components

| Component      | File                | Description                     |
| -------------- | ------------------- | ------------------------------- |
| `Accordion`    | `accordion.tsx`     | Expandable content sections     |
| `Badge`        | `badge.tsx`         | Status badges/labels            |
| `Breadcrumb`   | `breadcrumb.tsx`    | Navigation breadcrumbs          |
| `Button`       | `button.tsx`        | Tombol dengan berbagai variant  |
| `Card`         | `card.tsx`          | Card container component        |
| `DataTable`    | `data-table.tsx`    | Tabel data dengan fitur sorting |
| `DropdownMenu` | `dropdown-menu.tsx` | Menu dropdown                   |
| `EmptyState`   | `empty-state.tsx`   | Empty state placeholder         |
| `Input`        | `input.tsx`         | Form input field                |
| `Label`        | `label.tsx`         | Form label                      |
| `Select`       | `select.tsx`        | Dropdown select                 |
| `Skeleton`     | `skeleton.tsx`      | Loading skeleton                |
| `Table`        | `table.tsx`         | Basic table component           |
| `Tabs`         | `tabs.tsx`          | Tab navigation                  |
| `Toast`        | `toast.tsx`         | Toast notifications             |
| `Toaster`      | `toaster.tsx`       | Toast container                 |

---

## Page-Specific Components

### Home Page (`/src/app/(home)/_components/`)

- Hero section
- Flight search form
- Popular destinations

### Available Flights (`/src/app/(home)/available-flights/_components/`)

- Flight card
- Flight list
- Filter sidebar

### Choose Seat (`/src/app/(home)/choose-seat/_components/`)

- Seat grid
- Seat legend
- Seat selection

### Checkout (`/src/app/(home)/checkout/_components/`)

- Booking summary
- Payment form
- Price breakdown

### My Tickets (`/src/app/(home)/my-tickets/_components/`)

- Ticket card
- Ticket list
- Ticket detail

---

## Dashboard Components (`/src/app/dashboard/(home)/_components/`)

- Stats cards
- Recent bookings table
- Charts/graphs
- Quick actions

---

## Component Conventions

### Naming

- File: `kebab-case.tsx`
- Component: `PascalCase`
- Props interface: `ComponentNameProps`

### Structure

```tsx
import { cn } from "@/lib/utils";

interface ButtonProps {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

export function Button({ variant = "primary", children }: ButtonProps) {
  return (
    <button
      className={cn("base-styles", variant === "primary" && "primary-styles")}
    >
      {children}
    </button>
  );
}
```
