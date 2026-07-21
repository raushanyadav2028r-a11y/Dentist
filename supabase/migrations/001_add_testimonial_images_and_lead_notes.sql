-- Add before/after images to testimonials
alter table public.testimonials add column if not exists before_image text;
alter table public.testimonials add column if not exists after_image text;

-- Add notes to contact_inquiries for admin lead management
alter table public.contact_inquiries add column if not exists notes text;
