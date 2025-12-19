# FlyHigher Website Enhancement - Phase 2 Documentation

**Project:** Flight Booking Website (booking-ticket)  
**Date:** December 19, 2025  
**Developer:** AI Assistant (Antigravity)

---

## Overview

Continuing from documentation-1, this phase focuses on **functionality improvements** and **feature enhancements** for the FlyHigher website. The redesign from Phase 1 is complete; now we'll add more practical features to make the booking experience richer and more user-friendly.

---

## Current State Analysis

Based on the screenshot review, the Choose Seat page is functional with:

- ✅ Working seat selection (Business Class - A1-D5 grid)
- ✅ Seat status indicators (Available, Occupied, Selected)
- ✅ Price display with seat upgrade pricing
- ✅ Flight info sidebar with route visualization
- ✅ Confirm button leading to checkout

---

## Proposed Improvements

### 1. 🪑 Multi-Passenger Seat Selection

**Current:** Only 1 passenger can select 1 seat  
**Improvement:** Support multiple passengers selecting seats

| Feature            | Description                                        |
| ------------------ | -------------------------------------------------- |
| Passenger Tabs     | Add tabs to switch between Passenger 1, 2, 3, etc. |
| Multi-Seat Summary | Show all selected seats in sidebar                 |
| Price Calculation  | Calculate total for all passengers                 |

---

### 2. 💺 Seat Class Toggle

**Current:** Class is pre-determined from search query  
**Improvement:** Allow switching between classes on this page

| Feature           | Description                                     |
| ----------------- | ----------------------------------------------- |
| Class Tabs        | Economy / Business / First Class toggle buttons |
| Live Price Update | Show price difference when switching            |
| Seat Map Update   | Dynamically reload seats for selected class     |

---

### 3. 🎯 Seat Amenities Info

**Current:** Seats are just numbered buttons  
**Improvement:** Show seat features on hover/click

| Feature                 | Description                          |
| ----------------------- | ------------------------------------ |
| Hover Tooltip           | Show seat type (Window/Aisle/Middle) |
| Extra Legroom Indicator | Badge for premium seats              |
| Seat Preview            | Small modal with seat features       |

---

### 4. 📱 Mobile UX Improvements

**Current:** Basic responsive layout  
**Improvement:** Better mobile experience

| Feature            | Description                       |
| ------------------ | --------------------------------- |
| Draggable Seat Map | Pinch/zoom on mobile              |
| Sticky Summary     | Fixed bottom bar with price & CTA |
| Swipe Gestures     | Swipe between passengers          |

---

### 5. 🔔 Real-time Seat Availability

**Current:** Static seat status from database  
**Improvement:** Live updates for better UX

| Feature             | Description                             |
| ------------------- | --------------------------------------- |
| Socket Integration  | Real-time seat status updates           |
| Booking Timer       | 5-min hold on selected seat             |
| Conflict Resolution | Alert if seat gets booked mid-selection |

---

### 6. 🎨 Visual Polish

| Feature         | Description                         |
| --------------- | ----------------------------------- |
| Seat Animations | Smooth transitions when selecting   |
| Row Labels      | Add A, B, C, D labels above columns |
| Wing Indicator  | Show where airplane wings are       |
| Exit Row Badge  | Emergency exit row indicator        |

---

## Implementation Status

| Priority  | Feature                                | Status     |
| --------- | -------------------------------------- | ---------- |
| 🔴 High   | Seat Class Toggle                      | ✅ DONE    |
| 🔴 High   | Visual Polish (Row Labels, Animations) | ✅ DONE    |
| 🟡 Medium | Seat Amenities Info                    | ⏳ Pending |
| 🟡 Medium | Mobile UX Improvements                 | ⏳ Pending |
| 🟢 Low    | Multi-Passenger Selection              | ⏳ Pending |
| 🟢 Low    | Real-time Seat Availability            | ⏳ Pending |

---

## Questions for User

1. **Which features do you want to prioritize?**

   - [ ] Seat Class Toggle (switch Economy/Business/First)
   - [ ] Visual Polish (row labels, animations, better indicators)
   - [ ] Seat Amenities (tooltips, legroom indicators)
   - [ ] Mobile improvements
   - [ ] Other: **\*\***\_**\*\***

2. **Do you want to add multi-passenger support?** (requires backend changes)

3. **Any specific issues with current functionality you want fixed first?**

---

## Files Affected (Reference)

| File                                                           | Purpose                                        |
| -------------------------------------------------------------- | ---------------------------------------------- |
| `src/app/(home)/choose-seat/[id]/page.tsx`                     | Main page layout                               |
| `src/app/(home)/choose-seat/[id]/_components/SeatList.tsx`     | Seat grid component                            |
| `src/app/(home)/choose-seat/[id]/_components/SeatItem.tsx`     | Individual seat button                         |
| `src/app/(home)/choose-seat/[id]/_components/FlightDetail.tsx` | Sidebar summary                                |
| `src/app/(home)/choose-seat/[id]/providers/SeatProvider.tsx`   | Seat selection state                           |
| `src/app/(home)/choose-seat/[id]/loading.tsx`                  | Loading state (already updated to light theme) |

---

## Session Notes

### Completed in This Session:

1. ✅ Fixed Outfit font not applying (added CSS variable integration)
2. ✅ Updated loading state to match light theme
3. ✅ **Seat Class Toggle** - Economy/Business/First Class tabs with live pricing
4. ✅ **Visual Polish**:
   - Column labels (A, B, C, D)
   - Exit row indicator with "Emergency Exit" badge
   - Extra legroom badge on exit row seats
   - Wing position indicators
   - Smooth hover/selection animations
   - Disabled button state when no seat selected

### Files Modified:

- `providers/SeatProvider.tsx` - Added `selectedClass` state
- `_components/SeatClassToggle.tsx` - NEW component
- `_components/SeatList.tsx` - Column labels, exit row, class filtering
- `_components/SeatItem.tsx` - Animations, hover effects, tooltips
- `_components/FlightDetail.tsx` - Dynamic pricing from context
- `page.tsx` - Integrated all components, wing indicators

### Pending:

- Seat Amenities Info (tooltips with seat features)
- Mobile UX Improvements

---

_Last updated: December 19, 2025 - 22:30 WIB_
