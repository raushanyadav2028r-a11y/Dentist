-- ============================================================
-- Additional tables for Admin Panel
-- Run in Supabase SQL Editor after schema.sql
-- ============================================================

-- LEADS (contact_inquiries renamed concept + status workflow)
-- contact_inquiries already exists, add lead_status field
alter table public.contact_inquiries add column if not exists lead_status text default 'new'
  check (lead_status in ('new', 'contacted', 'qualified', 'converted', 'lost'));

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

create trigger set_updated_at before update on public.before_after_cases
  for each row execute procedure public.handle_updated_at();

alter table public.before_after_cases enable row level security;
create policy "Public can read before_after" on public.before_after_cases for select using (true);
create policy "Auth full access before_after" on public.before_after_cases for all using (auth.role() = 'authenticated');

-- WEBSITE CONTENT (key-value store)
create table if not exists public.website_content (
  id          uuid primary key default uuid_generate_v4(),
  section     text not null,
  key         text not null,
  value       text,
  value_type  text default 'text' check (value_type in ('text', 'html', 'image', 'json')),
  updated_at  timestamptz default now(),
  unique(section, key)
);

create trigger set_updated_at before update on public.website_content
  for each row execute procedure public.handle_updated_at();

alter table public.website_content enable row level security;
create policy "Public can read content" on public.website_content for select using (true);
create policy "Auth full access content" on public.website_content for all using (auth.role() = 'authenticated');

-- Add price_range to services if not exists
alter table public.services add column if not exists price_range text;

-- SEED website content
insert into public.website_content (section, key, value, value_type) values
('hero', 'title', 'Precision Meets Perfection.', 'text'),
('hero', 'subtitle', 'Experience the future of aesthetic dentistry. World-class expertise delivered in an environment of absolute serenity.', 'text'),
('hero', 'cta_primary', 'Begin Your Transformation', 'text'),
('hero', 'cta_secondary', 'Explore The Clinic', 'text'),
('contact', 'phone', '+1 888 235 3784', 'text'),
('contact', 'whatsapp', '+91 88 8235 3784', 'text'),
('contact', 'email', 'concierge@celestiasmiles.com', 'text'),
('contact', 'address', '422 Serenity Avenue, Suite 900, New Delhi, 110001, India', 'text'),
('cta', 'heading', 'Your Masterpiece Awaits.', 'text'),
('cta', 'subtitle', 'Reserve your private consultation today and step into the future of aesthetic dentistry.', 'text')
on conflict (section, key) do nothing;
