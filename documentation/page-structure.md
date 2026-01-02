# Page Structure - Dental Clinic App

Daftar halaman dan section-section yang ada di setiap halaman.

## Public Pages

| Page            | Path               | Sections                                                                                                                              |
| --------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| Landing Page    | `/`                | Navbar, Hero, Features, Services Bento Grid, How It Works, Doctors Preview, CTA, Footer                                               | SUDAH |
| Sign In         | `/sign-in`         | Hero Image, Sign In Form (Google OAuth), Info Box, Footer Terms                                                                       | SUDAH |
| Booking         | `/booking`         | Navbar, Page Header, Step Indicator, Step 1 (Service Selection), Step 2 (Doctor & Schedule), Step 3 (Checkout Form + Summary), Footer | SUDAH |
| Booking Success | `/booking/success` | Navbar, Success Header, E-Ticket Card (QR Code, Details, Payment Info, Clinic Address), Reminder Alert, Action Buttons, Footer        | SUDAH |
| Layanan         | `/layanan`         | Navbar, Page Header, Service Cards Grid, CTA, Footer                                                                                  | SUDAH |
| Gallery         | `/gallery`         | Navbar, Page Header, Photo Grid (Before/After, Clinic, Team), Footer                                                                  | SUDAH |

## Patient Pages

| Page        | Path           | Sections                                                                  |
| ----------- | -------------- | ------------------------------------------------------------------------- | ----- |
| My Bookings | `/my-bookings` | Navbar, Page Header, Filter Tabs, Booking Cards List, Empty State, Footer | SUDAH |

## Doctor Portal

| Page             | Path                   | Sections                                                                  | ----- |
| ---------------- | ---------------------- | ------------------------------------------------------------------------- | ----- |
| Doctor Dashboard | `/doctor`              | Header, Stats Cards (4x), Today's Schedule, Upcoming Appointments, Footer | SUDAH |
| Doctor Schedule  | `/doctor/schedule`     | Header, Weekly Calendar, Slot View, Footer                                | SUDAH |
| Doctor Patients  | `/doctor/patients`     | Header, Search, Patient List, Footer                                      | SUDAH |
| Buat Janji Temu  | `/doctor/booking/new`  | Header, Patient Select, Service Select, Date/Time Picker, Form, Footer    | SUDAH |
| Tambah Pasien    | `/doctor/patients/new` | Header, Patient Form (Name, Phone, Email, Address), Footer                | SUDAH |

## Admin Dashboard

| Page                | Path                  | Sections                                                                   |
| ------------------- | --------------------- | -------------------------------------------------------------------------- | ----- |
| Dashboard Home      | `/dashboard`          | Header, Stats Cards (4x), Today's Schedule, Recent Bookings, Quick Actions | SUDAH |
| Bookings Management | `/dashboard/bookings` | Header, Filter Bar, Data Table, Row Actions                                | SUDAH |
| Schedule Master     | `/dashboard/schedule` | Header, Calendar View, Slot Management                                     | SUDAH |
| Doctor Management   | `/dashboard/doctors`  | Header, Doctor Cards/Table, Add/Edit Modal                                 | SUDAH |
| Services Management | `/dashboard/services` | Header, Service Cards/Table, Add/Edit Modal                                | SUDAH |
| Patients Database   | `/dashboard/patients` | Header, Search, Data Table, Detail View                                    | SUDAH |
| Reports             | `/dashboard/reports`  | Header, Revenue Chart, Popular Services, Doctor Stats                      | SUDAH |
| Settings            | `/dashboard/settings` | Clinic Info, Payment Gateway, WhatsApp Integration                         | SUDAH |

## Planned Pages (Belum Diimplementasi)

| Page             | Path               | Sections                                            |
| ---------------- | ------------------ | --------------------------------------------------- | ----- |
| 404 Not Found    | `/not-found`       | Error Message, Back to Home Button                  | SUDAH |
| Privacy Policy   | `/privacy`         | Navbar, Policy Content, Footer                      | SUDAH |
| Terms of Service | `/terms`           | Navbar, Terms Content, Footer                       | SUDAH |
| Edit Profile     | `/profile`         | Navbar, Profile Form (Name, Phone, Address), Footer | SUDAH |
| Contact Us       | `/contact`         | Navbar, Contact Info, Contact Form, Map, Footer     | SUDAH |
| About Us         | `/about`           | Navbar, Story, Team, Facilities Gallery, Footer     | SUDAH |
| Service Detail   | `/services/[slug]` | Navbar, Service Info, FAQ, Pricing, CTA, Footer     | SUDAH | 
| Doctor Profile   | `/doctors/[id]`    | Navbar, Bio, Stats, Schedule, Reviews, Footer       | SUDAH |
| Blog             | `/blog`            | Navbar, Article List, Categories, Footer            | SUDAH |
