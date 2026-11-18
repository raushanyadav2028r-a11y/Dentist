# Celestia Smiles — Premium Dental Clinic Website

A modern, high-converting dental clinic web application designed for aesthetic and general dentistry practices. Features a patient-facing booking engine, interactive before/after transformation showcase, treatments catalog, specialist team profiles, and a comprehensive admin management dashboard.

## Features

- **Public Patient Portal:**
  - Interactive Before & After smile transformation slider (touch-ready for mobile).
  - Multi-step appointment booking engine with international phone validation.
  - Comprehensive treatments and specialist directory.
  - Direct WhatsApp and phone inquiry integration.
  - Fully responsive across mobile (320px+), tablet, and desktop viewports.
  - Server-side rendering (SSR) & Incremental Static Regeneration (ISR) with JSON-LD SEO structured data.

- **Admin Management Dashboard (`/admin`):**
  - **Appointments:** Manage bookings, update patient appointment status, search & filter, export CSV.
  - **Leads:** Track contact inquiries, lead stages, and internal patient notes.
  - **Rosters & Content:** Manage doctors, treatments, patient testimonials, before/after cases, and FAQs.
  - **Clinic Settings:** Update clinic name, address, operating hours, phone, WhatsApp, and Google Map embeds in real-time.
  - **Analytics:** Monthly appointment trends, inquiry volume, and conversion metrics.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **Icons & Animation:** Lucide React, Framer Motion
- **Database & Auth:** Supabase (PostgreSQL + Supabase SSR Auth)

---

## Getting Started

### 1. Prerequisites
- Node.js 18+ installed
- A free [Supabase](https://supabase.com) account & project

### 2. Installation
```bash
# Clone the repository
git clone <repository-url>
cd Dentist

# Install dependencies
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the project root based on `.env.example`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Database Setup
1. Open your Supabase Project Dashboard ➔ **SQL Editor**.
2. Open `supabase/setup-all.sql` from this repository.
3. Paste into the SQL Editor and click **Run**.
4. To create an admin account, go to **Authentication ➔ Users ➔ Add User** (enable *Auto Confirm User*).

### 5. Run the Application
```bash
# Start development server
npm run dev

# Or build for production
npm run build
npm run start
```
Open [http://localhost:3000](http://localhost:3000) in your browser.  
Admin portal is available at [http://localhost:3000/admin/login](http://localhost:3000/admin/login).
