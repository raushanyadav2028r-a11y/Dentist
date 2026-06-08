-- ============================================================
-- Celestia Smiles – Supabase Database Schema
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- 1. SERVICES
-- ============================================================
create table public.services (
  id            uuid primary key default uuid_generate_v4(),
  slug          text unique not null,
  title         text not null,
  tagline       text,
  description   text,
  icon          text,                          -- lucide icon name
  benefits      text[] default '{}',
  duration      text,
  aftercare     text,
  is_featured   boolean default false,
  sort_order    integer default 0,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- ============================================================
-- 2. SPECIALISTS
-- ============================================================
create table public.specialists (
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

-- ============================================================
-- 3. TESTIMONIALS
-- ============================================================
create table public.testimonials (
  id              uuid primary key default uuid_generate_v4(),
  name            text not null,
  role            text,
  treatment_slug  text,
  treatment_label text,
  rating          smallint default 5 check (rating between 1 and 5),
  review_date     text,
  quote           text not null,
  is_approved     boolean default true,
  sort_order      integer default 0,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

-- ============================================================
-- 4. APPOINTMENTS (Book page)
-- ============================================================
create table public.appointments (
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
  notes         text,                          -- internal admin notes
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- ============================================================
-- 5. CONTACT INQUIRIES (Contact page form)
-- ============================================================
create table public.contact_inquiries (
  id            uuid primary key default uuid_generate_v4(),
  full_name     text not null,
  phone         text not null,
  email         text,
  service       text,
  preferred_date date,
  message       text,
  status        text default 'new'
                check (status in ('new', 'in_progress', 'resolved', 'spam')),
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- ============================================================
-- 6. FAQ
-- ============================================================
create table public.faq (
  id            uuid primary key default uuid_generate_v4(),
  question      text not null,
  answer        text not null,
  category      text,
  sort_order    integer default 0,
  is_active     boolean default true,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- ============================================================
-- 7. CLINIC SETTINGS (singleton-style)
-- ============================================================
create table public.clinic_settings (
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

insert into public.clinic_settings (id) values (1) on conflict do nothing;

-- ============================================================
-- 8. ADMIN USERS (basic, extend with Supabase Auth later)
-- ============================================================
create table public.admin_users (
  id            uuid primary key default uuid_generate_v4(),
  email         text unique not null,
  full_name     text,
  role          text default 'admin' check (role in ('super_admin', 'admin', 'receptionist')),
  is_active     boolean default true,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- ============================================================
-- INDEXES
-- ============================================================
create index idx_services_sort       on public.services (sort_order);
create index idx_specialists_sort    on public.specialists (sort_order);
create index idx_testimonials_sort   on public.testimonials (sort_order);
create index idx_appointments_status on public.appointments (status, created_at desc);
create index idx_appointments_date   on public.appointments (preferred_date);
create index idx_inquiries_status    on public.contact_inquiries (status, created_at desc);
create index idx_faq_sort            on public.faq (sort_order);

-- ============================================================
-- UPDATED_AT TRIGGER (auto-update on every row change)
-- ============================================================
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at before update on public.services        for each row execute procedure public.handle_updated_at();
create trigger set_updated_at before update on public.specialists     for each row execute procedure public.handle_updated_at();
create trigger set_updated_at before update on public.testimonials    for each row execute procedure public.handle_updated_at();
create trigger set_updated_at before update on public.appointments    for each row execute procedure public.handle_updated_at();
create trigger set_updated_at before update on public.contact_inquiries for each row execute procedure public.handle_updated_at();
create trigger set_updated_at before update on public.faq             for each row execute procedure public.handle_updated_at();
create trigger set_updated_at before update on public.clinic_settings for each row execute procedure public.handle_updated_at();
create trigger set_updated_at before update on public.admin_users     for each row execute procedure public.handle_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY (public read, authenticated write)
-- ============================================================
alter table public.services          enable row level security;
alter table public.specialists       enable row level security;
alter table public.testimonials      enable row level security;
alter table public.faq               enable row level security;
alter table public.clinic_settings   enable row level security;
alter table public.appointments      enable row level security;
alter table public.contact_inquiries enable row level security;
alter table public.admin_users       enable row level security;

-- Public read policies
create policy "Public can read services"          on public.services          for select using (true);
create policy "Public can read specialists"       on public.specialists       for select using (is_active = true);
create policy "Public can read testimonials"      on public.testimonials      for select using (is_approved = true);
create policy "Public can read faq"               on public.faq               for select using (is_active = true);
create policy "Public can read clinic settings"   on public.clinic_settings   for select using (true);

-- Anyone can insert appointments & inquiries (form submissions)
create policy "Anyone can create appointments"    on public.appointments      for insert with check (true);
create policy "Anyone can create inquiries"       on public.contact_inquiries for insert with check (true);

-- Authenticated users (admins) get full access
create policy "Auth full access services"          on public.services          for all using (auth.role() = 'authenticated');
create policy "Auth full access specialists"       on public.specialists       for all using (auth.role() = 'authenticated');
create policy "Auth full access testimonials"      on public.testimonials      for all using (auth.role() = 'authenticated');
create policy "Auth full access faq"               on public.faq               for all using (auth.role() = 'authenticated');
create policy "Auth full access settings"          on public.clinic_settings   for all using (auth.role() = 'authenticated');
create policy "Auth full access appointments"      on public.appointments      for all using (auth.role() = 'authenticated');
create policy "Auth full access inquiries"         on public.contact_inquiries for all using (auth.role() = 'authenticated');
create policy "Auth full access admin_users"       on public.admin_users       for all using (auth.role() = 'authenticated');
