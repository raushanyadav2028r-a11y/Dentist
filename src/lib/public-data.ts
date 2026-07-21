import { createClient } from "@supabase/supabase-js";

// Anonymous, cookie-free Supabase client for PUBLIC, read-only data.
//
// IMPORTANT: unlike the admin server client (which calls cookies() and forces
// every route dynamic), this client touches NO request data. That means any
// Server Component using these getters is statically rendered and benefits
// from ISR. Set `export const revalidate` on the consuming route.
//
// The anon key is public by design — RLS on these tables should remain
// read-permitting for anon. Never put the service-role key here.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const publicSupabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

export async function getPublicServices() {
  const { data, error } = await publicSupabase
    .from("services")
    .select("*")
    .eq("is_featured", true)
    .order("sort_order");
  return { data: data ?? [], error: error?.message };
}

export async function getAllServices() {
  const { data, error } = await publicSupabase
    .from("services")
    .select("*")
    .order("sort_order");
  return { data: data ?? [], error: error?.message };
}

export async function getPublicSpecialists() {
  const { data, error } = await publicSupabase
    .from("specialists")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");
  return { data: data ?? [], error: error?.message };
}

export async function getPublicTestimonials() {
  const { data, error } = await publicSupabase
    .from("testimonials")
    .select("*")
    .eq("is_approved", true)
    .order("sort_order");
  return { data: data ?? [], error: error?.message };
}

export async function getPublicFaqs() {
  const { data, error } = await publicSupabase
    .from("faq")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");
  return { data: data ?? [], error: error?.message };
}

export async function getPublicClinicSettings() {
  const { data, error } = await publicSupabase
    .from("clinic_settings")
    .select("*")
    .limit(1)
    .maybeSingle();
  return { data, error: error?.message };
}
