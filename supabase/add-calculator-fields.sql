-- Add treatment calculator fields to appointments
-- Run this in Supabase SQL Editor

alter table public.appointments add column if not exists selected_treatment text;
alter table public.appointments add column if not exists estimated_cost text;
alter table public.appointments add column if not exists estimated_duration text;
alter table public.appointments add column if not exists source text default 'website';
