# 5. Recommendations & Best Practices

> **Priority:** 🟡 **IMPORTANT** — Suggestions for scalability, maintainability, and future growth.

---

## 1. Slug System (SEO Improvement)

### Current State

URLs use UUIDs: `/choose-seat/clq1abc2def3ghi4`

### Recommended

Human-readable slugs: `/choose-seat/jkt-dps-2025-01-15`

### Implementation

```prisma
// Add to Flight model
slug String @unique  // e.g., "jkt-dps-2025-01-15-1" (with counter for duplicates)

// Add to Ticket model
slug String @unique  // e.g., "booking-flyh-abc123"
```

### Benefits

- ✅ Better SEO (keywords in URL)
- ✅ Easier to share and remember
- ✅ More professional appearance
- ✅ Analytics/debugging easier

### Fallback Strategy

Keep IDs for programmatic access, use slugs for user-facing URLs:

```typescript
// API supports both
GET / api / flights / clq1abc2def3ghi4; // By ID
GET / api / flights / jkt - dps - 2025 - 01 - 15; // By slug
```

---

## 2. Performance Optimizations

### 2.1 Image Optimization

```typescript
// Use next/image for automatic optimization
import Image from "next/image";

<Image
  src="/airplane.png"
  alt="Airplane"
  width={400}
  height={300}
  priority={isAboveFold}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>;
```

### 2.2 Bundle Optimization

```typescript
// Dynamic imports for heavy components
const SeatMap = dynamic(() => import("./_components/SeatMap"), {
  loading: () => <SeatMapSkeleton />,
  ssr: false, // Client-only if uses browser APIs
});

// Lazy load below-fold content
const DestinationCards = dynamic(
  () => import("./_components/DestinationCards")
);
```

### 2.3 Database Indexes

```prisma
// Add indexes for frequently queried fields
model Flight {
  // ...
  @@index([departureCityCode, destinationCityCode, departureDate])
  @@index([departureDate])
  @@index([price])
}

model FlightSeat {
  // ...
  @@index([flightId, type])
  @@index([flightId, isBooked])
}

model Ticket {
  // ...
  @@index([customerId])
  @@index([status])
  @@index([bookingDate])
}
```

### 2.4 API Response Caching

```typescript
// In API routes, add cache headers
export async function GET(request: Request) {
  const flights = await getFlights();

  return NextResponse.json(flights, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
    },
  });
}
```

---

## 3. SEO Implementation

### 3.1 Metadata per Page

```typescript
// src/app/(home)/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FlyHigher | Book Cheap Flights to Indonesia",
  description:
    "Find the best deals on flights to Bali, Jakarta, and more. Book your next adventure with FlyHigher.",
  keywords: ["flights", "booking", "indonesia", "bali", "cheap flights"],
  openGraph: {
    title: "FlyHigher | Book Cheap Flights",
    description: "Your journey starts here.",
    images: ["/og-image.jpg"],
  },
};
```

### 3.2 Dynamic Metadata

```typescript
// src/app/(home)/choose-seat/[slug]/page.tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const flight = await getFlight(params.slug);

  return {
    title: `Select Seat | ${flight.departureCity} to ${flight.destinationCity}`,
    description: `Choose your preferred seat on ${flight.plane.name} flight from ${flight.departureCity} to ${flight.destinationCity}.`,
  };
}
```

### 3.3 Sitemap

```typescript
// src/app/sitemap.ts
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const flights = await getActiveFlights();

  return [
    { url: "https://flyhigher.com", lastModified: new Date() },
    { url: "https://flyhigher.com/about", lastModified: new Date() },
    ...flights.map((flight) => ({
      url: `https://flyhigher.com/choose-seat/${flight.slug}`,
      lastModified: flight.updatedAt,
    })),
  ];
}
```

### 3.4 Structured Data

```typescript
// src/app/(home)/page.tsx
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "FlyHigher",
  url: "https://flyhigher.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://flyhigher.com/available-flights?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

// In component
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>;
```

---

## 4. Accessibility Improvements

### 4.1 ARIA Labels

```tsx
// Seat button
<button
  aria-label={`Seat ${seat.seatNumber}, ${seat.type} class, ${
    seat.isBooked ? "occupied" : "available"
  }`}
  aria-pressed={isSelected}
  disabled={seat.isBooked}
>
  {seat.seatNumber}
</button>
```

### 4.2 Keyboard Navigation

```tsx
// Seat grid with keyboard support
<div
  role="grid"
  aria-label="Seat selection map"
  onKeyDown={handleKeyNavigation}
>
  {rows.map((row) => (
    <div role="row" key={row.number}>
      {row.seats.map((seat) => (
        <div role="gridcell" key={seat.id}>
          <SeatButton seat={seat} />
        </div>
      ))}
    </div>
  ))}
</div>
```

### 4.3 Focus Management

```css
/* Visible focus indicators */
button:focus-visible,
a:focus-visible {
  outline: 2px solid theme("colors.sky-primary");
  outline-offset: 2px;
}
```

---

## 5. Feature Suggestions

### 5.1 Near-Term (Next Sprint)

| Feature                     | Benefit                               | Complexity |
| --------------------------- | ------------------------------------- | ---------- |
| **Flight alerts**           | Notify users of price drops           | Medium     |
| **Save search**             | Quick access to frequent routes       | Low        |
| **Guest checkout**          | Reduce friction, increase conversions | Medium     |
| **Multi-passenger booking** | Book for groups                       | High       |

### 5.2 Medium-Term (Next Quarter)

| Feature                   | Benefit               | Complexity |
| ------------------------- | --------------------- | ---------- |
| **Loyalty program**       | Customer retention    | High       |
| **Round-trip booking**    | Complete booking flow | Medium     |
| **Seat upgrade offers**   | Upselling opportunity | Medium     |
| **Flexible dates search** | Find cheapest dates   | Medium     |

### 5.3 Long-Term (Future Roadmap)

| Feature                       | Benefit                      | Complexity |
| ----------------------------- | ---------------------------- | ---------- |
| **Mobile app (React Native)** | Mobile-first experience      | Very High  |
| **Hotel/car bundles**         | Cross-selling                | Very High  |
| **AI travel assistant**       | Personalized recommendations | Very High  |
| **Real-time flight status**   | Better UX                    | Medium     |

---

## 6. Monitoring & Analytics

### 6.1 Recommended Tools

| Tool                   | Purpose                |
| ---------------------- | ---------------------- |
| **Vercel Analytics**   | Performance monitoring |
| **Sentry**             | Error tracking         |
| **Google Analytics 4** | User behavior          |
| **Prisma Accelerate**  | Database metrics       |

### 6.2 Key Metrics to Track

| Metric                         | Target      |
| ------------------------------ | ----------- |
| Time to First Byte (TTFB)      | < 200ms     |
| Largest Contentful Paint (LCP) | < 2.5s      |
| Cumulative Layout Shift (CLS)  | < 0.1       |
| First Input Delay (FID)        | < 100ms     |
| Booking conversion rate        | > 3%        |
| Search-to-booking time         | < 5 minutes |

---

## 7. Security Recommendations

### 7.1 Current ✅

- Lucia Auth for authentication
- Prisma for SQL injection prevention
- Session-based auth with secure cookies

### 7.2 To Add

| Measure                         | Priority  |
| ------------------------------- | --------- |
| Rate limiting on API routes     | 🔴 High   |
| CSRF protection for mutations   | 🔴 High   |
| Input sanitization              | 🟡 Medium |
| Content Security Policy headers | 🟡 Medium |
| Audit logging for admin actions | 🟡 Medium |

---

## 8. Code Quality

### 8.1 Linting & Formatting

```bash
# Already configured
eslint
eslint-config-next

# Recommend adding
prettier
lint-staged
husky (pre-commit hooks)
```

### 8.2 TypeScript Strictness

```json
// tsconfig.json - ensure these are enabled
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true
  }
}
```

### 8.3 Component Documentation

Use JSDoc for complex components:

```typescript
/**
 * SeatItem displays a single seat button in the seat selection grid.
 *
 * @param seat - The seat data including number, type, and booking status
 * @param isHighlighted - Whether this seat matches the current filter
 * @param onSelect - Callback when user clicks to select this seat
 *
 * @example
 * <SeatItem
 *   seat={seatData}
 *   isHighlighted={filter === 'all' || filter === seat.type}
 *   onSelect={() => handleSelect(seat)}
 * />
 */
```

---

## Summary

**Immediate Priorities:**

1. 🔴 Implement slug system for SEO
2. 🔴 Add meta tags to all pages
3. 🔴 Create missing UI components
4. 🟡 Add rate limiting
5. 🟡 Performance audit with Lighthouse

**This completes the documentation suite.** Use these files as references during implementation:

1. [1-architecture-fundamentals.md](file:///c:/Projects/booking-ticket/context/1-architecture-fundamentals.md) — Start here
2. [2-design-system.md](file:///c:/Projects/booking-ticket/context/2-design-system.md) — Component patterns
3. [3-data-layer.md](file:///c:/Projects/booking-ticket/context/3-data-layer.md) — API & state
4. [4-implementation-roadmap.md](file:///c:/Projects/booking-ticket/context/4-implementation-roadmap.md) — Task checklist
5. [5-recommendations.md](file:///c:/Projects/booking-ticket/context/5-recommendations.md) — This file

---

_Last updated: December 21, 2025_
