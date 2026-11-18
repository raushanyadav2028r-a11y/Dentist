-- ============================================================
-- CELESTIA SMILES - COMPLETE SUPABASE SETUP SCRIPT
-- Run this ONCE in the Supabase SQL Editor:
-- https://supabase.com/dashboard/project/rcotcsulgvsytzmaktzn/sql/new
-- ============================================================

-- 1. Enable UUID Extension
create extension if not exists "uuid-ossp";

-- 2. Trigger Function for updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ============================================================
-- 3. TABLES
-- ============================================================

-- SERVICES
create table if not exists public.services (
  id            uuid primary key default uuid_generate_v4(),
  slug          text unique not null,
  title         text not null,
  tagline       text,
  description   text,
  icon          text,
  benefits      text[] default '{}',
  duration      text,
  aftercare     text,
  price_range   text,
  is_featured   boolean default false,
  sort_order    integer default 0,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- SPECIALISTS
create table if not exists public.specialists (
  id            uuid primary key default uuid_generate_v4(),
  name          text not null,
  role          text,
  education     text,
  experience    text,
  specialties   text[] default '{}',
  languages     text,
  clinic_days   text,
  bio           text,
  image_src     text,
  gender        text check (gender in ('male', 'female', 'other')),
  is_active     boolean default true,
  sort_order    integer default 0,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- TESTIMONIALS
create table if not exists public.testimonials (
  id              uuid primary key default uuid_generate_v4(),
  name            text not null,
  role            text,
  treatment_slug  text,
  treatment_label text,
  rating          smallint default 5 check (rating between 1 and 5),
  review_date     text,
  quote           text not null,
  before_image    text,
  after_image     text,
  is_approved     boolean default true,
  sort_order      integer default 0,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

-- APPOINTMENTS
create table if not exists public.appointments (
  id            uuid primary key default uuid_generate_v4(),
  full_name     text not null,
  phone         text not null,
  email         text,
  service       text,
  preferred_date date,
  preferred_time text,
  message       text,
  status        text default 'pending'
                check (status in ('pending', 'confirmed', 'cancelled', 'completed', 'no_show')),
  notes         text,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- CONTACT INQUIRIES / LEADS
create table if not exists public.contact_inquiries (
  id            uuid primary key default uuid_generate_v4(),
  full_name     text not null,
  phone         text not null,
  email         text,
  service       text,
  preferred_date date,
  message       text,
  status        text default 'new'
                check (status in ('new', 'in_progress', 'resolved', 'spam')),
  lead_status   text default 'new'
                check (lead_status in ('new', 'contacted', 'qualified', 'converted', 'lost')),
  notes         text,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- FAQ
create table if not exists public.faq (
  id            uuid primary key default uuid_generate_v4(),
  question      text not null,
  answer        text not null,
  category      text,
  sort_order    integer default 0,
  is_active     boolean default true,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- CLINIC SETTINGS
create table if not exists public.clinic_settings (
  id              integer primary key default 1 check (id = 1),
  clinic_name     text default 'Celestia Smiles',
  address         text,
  city            text,
  country         text,
  postal_code     text,
  phone           text,
  whatsapp        text,
  email           text,
  hours_weekday   text,
  hours_saturday  text,
  hours_sunday    text,
  map_embed_url   text,
  updated_at      timestamptz default now()
);

-- BEFORE & AFTER CASES
create table if not exists public.before_after_cases (
  id              uuid primary key default uuid_generate_v4(),
  title           text not null,
  treatment_type  text,
  before_image    text,
  after_image     text,
  description     text,
  is_featured     boolean default false,
  sort_order      integer default 0,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

-- WEBSITE CONTENT (Key-Value Content)
create table if not exists public.website_content (
  id          uuid primary key default uuid_generate_v4(),
  section     text not null,
  key         text not null,
  value       text,
  value_type  text default 'text' check (value_type in ('text', 'html', 'image', 'json')),
  updated_at  timestamptz default now(),
  unique(section, key)
);

-- ============================================================
-- 4. TRIGGERS
-- ============================================================
drop trigger if exists set_updated_at on public.services;
create trigger set_updated_at before update on public.services for each row execute procedure public.handle_updated_at();

drop trigger if exists set_updated_at on public.specialists;
create trigger set_updated_at before update on public.specialists for each row execute procedure public.handle_updated_at();

drop trigger if exists set_updated_at on public.testimonials;
create trigger set_updated_at before update on public.testimonials for each row execute procedure public.handle_updated_at();

drop trigger if exists set_updated_at on public.appointments;
create trigger set_updated_at before update on public.appointments for each row execute procedure public.handle_updated_at();

drop trigger if exists set_updated_at on public.contact_inquiries;
create trigger set_updated_at before update on public.contact_inquiries for each row execute procedure public.handle_updated_at();

drop trigger if exists set_updated_at on public.faq;
create trigger set_updated_at before update on public.faq for each row execute procedure public.handle_updated_at();

drop trigger if exists set_updated_at on public.clinic_settings;
create trigger set_updated_at before update on public.clinic_settings for each row execute procedure public.handle_updated_at();

drop trigger if exists set_updated_at on public.before_after_cases;
create trigger set_updated_at before update on public.before_after_cases for each row execute procedure public.handle_updated_at();

drop trigger if exists set_updated_at on public.website_content;
create trigger set_updated_at before update on public.website_content for each row execute procedure public.handle_updated_at();

-- ============================================================
-- 5. ROW LEVEL SECURITY (RLS) & POLICIES
-- ============================================================
alter table public.services enable row level security;
alter table public.specialists enable row level security;
alter table public.testimonials enable row level security;
alter table public.appointments enable row level security;
alter table public.contact_inquiries enable row level security;
alter table public.faq enable row level security;
alter table public.clinic_settings enable row level security;
alter table public.before_after_cases enable row level security;
alter table public.website_content enable row level security;

-- Drop existing policies if re-running
drop policy if exists "Public can read services" on public.services;
drop policy if exists "Auth full access services" on public.services;
create policy "Public can read services" on public.services for select using (true);
create policy "Auth full access services" on public.services for all using (auth.role() = 'authenticated');

drop policy if exists "Public can read specialists" on public.specialists;
drop policy if exists "Auth full access specialists" on public.specialists;
create policy "Public can read specialists" on public.specialists for select using (is_active = true);
create policy "Auth full access specialists" on public.specialists for all using (auth.role() = 'authenticated');

drop policy if exists "Public can read testimonials" on public.testimonials;
drop policy if exists "Auth full access testimonials" on public.testimonials;
create policy "Public can read testimonials" on public.testimonials for select using (is_approved = true);
create policy "Auth full access testimonials" on public.testimonials for all using (auth.role() = 'authenticated');

drop policy if exists "Anyone can create appointments" on public.appointments;
drop policy if exists "Auth full access appointments" on public.appointments;
create policy "Anyone can create appointments" on public.appointments for insert with check (true);
create policy "Auth full access appointments" on public.appointments for all using (auth.role() = 'authenticated');

drop policy if exists "Anyone can create inquiries" on public.contact_inquiries;
drop policy if exists "Auth full access inquiries" on public.contact_inquiries;
create policy "Anyone can create inquiries" on public.contact_inquiries for insert with check (true);
create policy "Auth full access inquiries" on public.contact_inquiries for all using (auth.role() = 'authenticated');

drop policy if exists "Public can read faq" on public.faq;
drop policy if exists "Auth full access faq" on public.faq;
create policy "Public can read faq" on public.faq for select using (is_active = true);
create policy "Auth full access faq" on public.faq for all using (auth.role() = 'authenticated');

drop policy if exists "Public can read clinic settings" on public.clinic_settings;
drop policy if exists "Auth full access settings" on public.clinic_settings;
create policy "Public can read clinic settings" on public.clinic_settings for select using (true);
create policy "Auth full access settings" on public.clinic_settings for all using (auth.role() = 'authenticated');

drop policy if exists "Public can read before_after" on public.before_after_cases;
drop policy if exists "Auth full access before_after" on public.before_after_cases;
create policy "Public can read before_after" on public.before_after_cases for select using (true);
create policy "Auth full access before_after" on public.before_after_cases for all using (auth.role() = 'authenticated');

drop policy if exists "Public can read content" on public.website_content;
drop policy if exists "Auth full access content" on public.website_content;
create policy "Public can read content" on public.website_content for select using (true);
create policy "Auth full access content" on public.website_content for all using (auth.role() = 'authenticated');

-- ============================================================
-- 6. SEED DATA (INITIAL CLINIC DATA)
-- ============================================================

-- Clinic Settings
insert into public.clinic_settings (
  id, clinic_name, address, city, country, postal_code, phone, whatsapp, email, hours_weekday, hours_saturday, hours_sunday, map_embed_url
) values (
  1,
  'Celestia Smiles',
  '422 Serenity Avenue, Suite 900',
  'Beverly Hills',
  'United States',
  '90210',
  '+1 888 235 3784',
  '+1 888 235 3784',
  'concierge@celestiasmiles.com',
  'Mon–Fri: 9am – 7pm',
  'Saturday: 10am – 3pm',
  'Sunday: Closed',
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.7152!2d-118.4003!3d34.0736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDA0JzI1LjAiTiAxMTjCsDI0JzAxLjAiVw!5e0!3m2!1sen!2sus!4v1'
) on conflict (id) do update set
  clinic_name = excluded.clinic_name,
  address = excluded.address,
  city = excluded.city,
  country = excluded.country,
  postal_code = excluded.postal_code,
  phone = excluded.phone,
  whatsapp = excluded.whatsapp,
  email = excluded.email;

-- Services
insert into public.services (slug, title, tagline, description, icon, benefits, duration, aftercare, is_featured, sort_order) values
('aesthetic-dentistry', 'Aesthetic Dentistry', 'Beauty through precision.', 'Cosmetic bonding, contouring and advanced smile design tailored to your facial geometry.', 'Smile', array['Natural-looking results', 'Minimal tooth preparation', 'Single-visit options', 'Long-lasting materials'], '1–3 visits', 'Regular polishing every 6 months. Avoid hard or staining foods for 48 hours.', true, 1),
('orthodontics', 'Orthodontics', 'Straight, confident, invisible.', 'From Invisalign clear aligners to aesthetic ceramic braces, align your teeth at any age with minimal impact on your daily life.', 'AlignCenter', array['Virtually invisible options', 'Faster treatment with digital planning', 'Comfortable, smooth aligners', 'Adult and teen friendly'], '12–24 months', 'Wear retainers as directed. Clean aligners with cold water daily.', true, 2),
('implants', 'Implantology', 'Permanent roots. Permanent confidence.', 'Dental implants that look, feel and function exactly like your natural teeth with guided surgical precision.', 'Landmark', array['Permanent tooth replacement', 'Preserves natural bone', 'No adhesives or removal', '99% success rate'], '3–6 months', 'Soft diet for 2 weeks post-surgery. Gentle brushing around implant site.', true, 3),
('whitening', 'Teeth Whitening', 'Brighter. Faster. Safer.', 'Professional in-chair laser whitening that delivers up to 8 shades brighter in a single 60-minute appointment.', 'Sparkles', array['Up to 8 shades brighter', 'Enamel-safe protocol', 'Zero sensitivity technology', 'Home maintenance kit included'], '1–2 sessions', 'Avoid coffee, tea, and red wine for 48 hours.', true, 4)
on conflict (slug) do nothing;

-- Specialists
insert into public.specialists (name, role, education, experience, specialties, languages, clinic_days, bio, image_src, gender, sort_order) values
('Dr. Julian Hayes', 'Lead Orthodontist', 'DMD, MS (Orthodontics) – Board Certified', '14 years', array['Invisalign Diamond Provider', 'Complex Alignment Cases', 'Digital Orthodontics'], 'English, Spanish', 'Monday, Wednesday, Friday', 'Founding specialist with an artistry-first approach and mastery in smile symmetry.', '/stitch_male_doctor.webp', 'male', 1),
('Dr. Elena Rostova', 'Cosmetic & Restorative Dentist', 'DDS – Advanced Aesthetic Dentistry Fellow', '10 years', array['Porcelain Veneers', 'Smile Makeovers', 'Laser Whitening'], 'English, French', 'Tuesday, Thursday, Saturday', 'Specialising in full smile transformations with hand-characterised porcelain veneers.', '/stitch_female_doctor.webp', 'female', 2),
('Dr. Marcus Vance', 'Oral & Maxillofacial Surgeon', 'DMD, Board Certified Oral Implantology', '16 years', array['Guided Implant Surgery', 'Bone Grafting', 'Jaw Reconstruction'], 'English, German', 'Wednesday, Friday', 'Surgical lead with extensive expertise in computer-guided implants and full-arch rehabilitation.', '/stitch_male_doctor.webp', 'male', 3),
('Dr. Sophia Turner', 'Endodontist', 'DMD, Master of Clinical Endodontics', '12 years', array['Painless Root Canals', 'Retreatment Cases', 'Microscopic Dentistry'], 'English', 'Monday, Tuesday, Thursday', 'Painless root canal therapy utilizing high-power surgical microscopes to preserve natural teeth.', '/stitch_female_doctor.webp', 'female', 4)
on conflict do nothing;

-- Testimonials
insert into public.testimonials (name, role, treatment_slug, treatment_label, rating, review_date, quote, sort_order) values
('Sarah M.', 'Executive Director', 'smile-makeover', 'Smile Makeover', 5, 'March 2024', 'I was terrified of dentists for years. Celestia Smiles completely changed that. My new smile transformed my confidence in meetings. Worth every investment.', 1),
('Marcus R.', 'Entrepreneur', 'implants', 'Dental Implants', 5, 'January 2024', 'The implant process was seamless — zero pain, no downtime. Dr. Elena explained every step clearly. It looks and feels 100% natural.', 2),
('Priya S.', 'Architect', 'orthodontics', 'Invisalign Aligners', 5, 'February 2024', '14 months of aligners and colleagues barely noticed I had them on. The digital previews matched the final result perfectly.', 3)
on conflict do nothing;

-- FAQ
insert into public.faq (question, answer, category, sort_order) values
('Does the treatment involve any discomfort?', 'We use computer-guided local anaesthesia and gentle laser techniques to ensure procedures are virtually painless.', 'general', 1),
('How long does laser whitening last?', 'Professional whitening typically lasts 1–3 years depending on dietary habits and lifestyle. We include bespoke home maintenance trays.', 'whitening', 2),
('Do you offer emergency appointments?', 'Yes. We reserve dedicated slots daily for patients requiring urgent pain relief or immediate restorative attention.', 'general', 3)
on conflict do nothing;
