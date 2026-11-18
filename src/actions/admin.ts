'use server'

import { createSupabaseServerClient, getUser } from '@/lib/supabase-server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// ─── AUTH GUARD ────────────────────────────────────────────────────────────────

async function requireAuth() {
  const user = await getUser()
  if (!user) redirect('/admin/login')
  return user
}

// ─── AUTH ──────────────────────────────────────────────────────────────────────

export async function signIn(formData: { email: string; password: string }) {
  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.auth.signInWithPassword(formData)
  if (error) return { error: error.message, success: false }
  revalidatePath('/admin', 'layout')
  return { error: null, success: true }
}

export async function signOut() {
  const supabase = await createSupabaseServerClient()
  await supabase.auth.signOut()
  revalidatePath('/admin', 'layout')
  redirect('/admin/login')
}

// ─── APPOINTMENTS ──────────────────────────────────────────────────────────────

export async function createAppointment(formData: {
  full_name: string
  phone: string
  email?: string
  service?: string
  preferred_date?: string
  preferred_time?: string
  message?: string
}) {
  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.from('appointments').insert({
    full_name: formData.full_name,
    phone: formData.phone,
    email: formData.email || null,
    service: formData.service || null,
    preferred_date: formData.preferred_date || null,
    preferred_time: formData.preferred_time || null,
    message: formData.message || null,
    status: 'pending',
  })
  if (error) return { error: error.message }
  revalidatePath('/admin/appointments')
  return { error: null }
}

export async function createContactInquiry(formData: {
  full_name: string
  phone: string
  email?: string
  service?: string
  preferred_date?: string
  message?: string
}) {
  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.from('contact_inquiries').insert({
    full_name: formData.full_name,
    phone: formData.phone,
    email: formData.email || null,
    service: formData.service || null,
    preferred_date: formData.preferred_date || null,
    message: formData.message || null,
  })
  if (error) return { error: error.message }
  revalidatePath('/admin/leads')
  return { error: null }
}

export async function getAppointments(search?: string, status?: string) {
  await requireAuth()
  const supabase = await createSupabaseServerClient()
  let query = supabase
    .from('appointments')
    .select('*')
    .order('created_at', { ascending: false })

  if (status && status !== 'all') {
    query = query.eq('status', status as 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no_show')
  }
  if (search) {
    query = query.or(`full_name.ilike.%${search}%,phone.ilike.%${search}%,email.ilike.%${search}%`)
  }

  const { data, error } = await query
  return { data, error: error?.message }
}

export async function updateAppointmentStatus(id: string, status: string) {
  await requireAuth()
  const supabase = await createSupabaseServerClient()
  const { error } = await supabase
    .from('appointments')
    .update({ status: status as 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no_show' })
    .eq('id', id)
  revalidatePath('/admin/appointments')
  return { error: error?.message }
}

export async function deleteAppointment(id: string) {
  await requireAuth()
  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.from('appointments').delete().eq('id', id)
  revalidatePath('/admin/appointments')
  return { error: error?.message }
}

// ─── LEADS ─────────────────────────────────────────────────────────────────────

export async function getLeads(search?: string, status?: string) {
  await requireAuth()
  const supabase = await createSupabaseServerClient()
  let query = supabase
    .from('contact_inquiries')
    .select('*')
    .order('created_at', { ascending: false })

  if (status && status !== 'all') {
    query = query.eq('lead_status', status)
  }
  if (search) {
    query = query.or(`full_name.ilike.%${search}%,phone.ilike.%${search}%,email.ilike.%${search}%`)
  }

  const { data, error } = await query
  return { data, error: error?.message }
}

export async function updateLeadStatus(id: string, lead_status: string) {
  await requireAuth()
  const supabase = await createSupabaseServerClient()
  const { error } = await supabase
    .from('contact_inquiries')
    .update({ lead_status })
    .eq('id', id)
  revalidatePath('/admin/leads')
  return { error: error?.message }
}

export async function deleteLead(id: string) {
  await requireAuth()
  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.from('contact_inquiries').delete().eq('id', id)
  revalidatePath('/admin/leads')
  return { error: error?.message }
}

export async function updateLeadNotes(id: string, notes: string) {
  await requireAuth()
  const supabase = await createSupabaseServerClient()
  const { error } = await supabase
    .from('contact_inquiries')
    .update({ notes })
    .eq('id', id)
  revalidatePath('/admin/leads')
  return { error: error?.message }
}

// ─── SPECIALISTS (DOCTORS) ─────────────────────────────────────────────────────

export async function getSpecialists() {
  await requireAuth()
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('specialists')
    .select('*')
    .order('sort_order')
  return { data, error: error?.message }
}

export async function upsertSpecialist(data: {
  id?: string
  name: string
  role?: string
  education?: string
  experience?: string
  bio?: string
  image_src?: string
  specialties?: string[]
  languages?: string
  clinic_days?: string
  gender?: 'male' | 'female' | 'other'
}) {
  const supabase = await createSupabaseServerClient()
  const { id, ...payload } = data
  if (id) {
    const { error } = await supabase.from('specialists').update(payload).eq('id', id)
    revalidatePath('/admin/doctors')
    revalidatePath('/specialists')
    revalidatePath('/')
    return { error: error?.message }
  } else {
    const { error } = await supabase.from('specialists').insert(data)
    revalidatePath('/admin/doctors')
    revalidatePath('/specialists')
    revalidatePath('/')
    return { error: error?.message }
  }
}

export async function deleteSpecialist(id: string) {
  await requireAuth()
  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.from('specialists').delete().eq('id', id)
  revalidatePath('/admin/doctors')
  revalidatePath('/specialists')
  revalidatePath('/')
  return { error: error?.message }
}

// ─── SERVICES ──────────────────────────────────────────────────────────────────

export async function getServices() {
  await requireAuth()
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('sort_order')
  return { data, error: error?.message }
}

export async function upsertService(data: {
  id?: string
  slug: string
  title: string
  tagline?: string
  description?: string
  icon?: string
  benefits?: string[]
  duration?: string
  aftercare?: string
  price_range?: string
  is_featured?: boolean
}) {
  const supabase = await createSupabaseServerClient()
  const { id, ...payload } = data
  if (id) {
    const { error } = await supabase.from('services').update(payload).eq('id', id)
    revalidatePath('/admin/services')
    revalidatePath('/services')
    revalidatePath('/')
    return { error: error?.message }
  } else {
    const { error } = await supabase.from('services').insert(data)
    revalidatePath('/admin/services')
    revalidatePath('/services')
    revalidatePath('/')
    return { error: error?.message }
  }
}

export async function deleteService(id: string) {
  await requireAuth()
  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.from('services').delete().eq('id', id)
  revalidatePath('/admin/services')
  revalidatePath('/services')
  revalidatePath('/')
  return { error: error?.message }
}

// ─── TESTIMONIALS ──────────────────────────────────────────────────────────────

export async function getTestimonials() {
  await requireAuth()
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('sort_order')
  return { data, error: error?.message }
}

export async function upsertTestimonial(data: {
  id?: string
  name: string
  role?: string
  treatment_slug?: string
  treatment_label?: string
  rating?: number
  review_date?: string
  quote: string
  is_approved?: boolean
}) {
  const supabase = await createSupabaseServerClient()
  const { id, ...payload } = data
  if (id) {
    const { error } = await supabase.from('testimonials').update(payload).eq('id', id)
    revalidatePath('/admin/testimonials')
    revalidatePath('/testimonials')
    revalidatePath('/')
    return { error: error?.message }
  } else {
    const { error } = await supabase.from('testimonials').insert(data)
    revalidatePath('/admin/testimonials')
    revalidatePath('/testimonials')
    revalidatePath('/')
    return { error: error?.message }
  }
}

export async function deleteTestimonial(id: string) {
  await requireAuth()
  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.from('testimonials').delete().eq('id', id)
  revalidatePath('/admin/testimonials')
  revalidatePath('/testimonials')
  revalidatePath('/')
  return { error: error?.message }
}

// ─── BEFORE & AFTER ────────────────────────────────────────────────────────────

export async function getBeforeAfterCases() {
  await requireAuth()
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('before_after_cases')
    .select('*')
    .order('sort_order')
  return { data, error: error?.message }
}

export async function upsertBeforeAfterCase(data: {
  id?: string
  title: string
  treatment_type?: string
  before_image?: string
  after_image?: string
  description?: string
  is_featured?: boolean
}) {
  const supabase = await createSupabaseServerClient()
  const { id, ...payload } = data
  if (id) {
    const { error } = await supabase.from('before_after_cases').update(payload).eq('id', id)
    revalidatePath('/admin/before-after')
    revalidatePath('/')
    return { error: error?.message }
  } else {
    const { error } = await supabase.from('before_after_cases').insert(data)
    revalidatePath('/admin/before-after')
    revalidatePath('/')
    return { error: error?.message }
  }
}

export async function deleteBeforeAfterCase(id: string) {
  await requireAuth()
  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.from('before_after_cases').delete().eq('id', id)
  revalidatePath('/admin/before-after')
  return { error: error?.message }
}

// ─── WEBSITE CONTENT ───────────────────────────────────────────────────────────

export async function getWebsiteContent(section?: string) {
  await requireAuth()
  const supabase = await createSupabaseServerClient()
  let query = supabase.from('website_content').select('*').order('section')
  if (section) {
    query = query.eq('section', section)
  }
  const { data, error } = await query
  return { data, error: error?.message }
}

export async function updateWebsiteContent(id: string, value: string) {
  await requireAuth()
  const supabase = await createSupabaseServerClient()
  const { error } = await supabase
    .from('website_content')
    .update({ value })
    .eq('id', id)
  revalidatePath('/admin/content')
  revalidatePath('/')
  return { error: error?.message }
}

// ─── DASHBOARD STATS ───────────────────────────────────────────────────────────

export async function getDashboardStats() {
  await requireAuth()
  const supabase = await createSupabaseServerClient()

  const [
    { count: appointments },
    { count: leads },
    { count: doctors },
    { count: services },
    { count: testimonials },
  ] = await Promise.all([
    supabase.from('appointments').select('*', { count: 'exact', head: true }),
    supabase.from('contact_inquiries').select('*', { count: 'exact', head: true }),
    supabase.from('specialists').select('*', { count: 'exact', head: true }),
    supabase.from('services').select('*', { count: 'exact', head: true }),
    supabase.from('testimonials').select('*', { count: 'exact', head: true }),
  ])

  return {
    appointments: appointments ?? 0,
    leads: leads ?? 0,
    doctors: doctors ?? 0,
    services: services ?? 0,
    testimonials: testimonials ?? 0,
  }
}

// ─── ANALYTICS ─────────────────────────────────────────────────────────────────

export async function getAnalyticsData() {
  await requireAuth()
  const supabase = await createSupabaseServerClient()

  const { data: appointments } = await supabase
    .from('appointments')
    .select('created_at, status')
    .gte('created_at', new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString())
    .order('created_at')

  const { data: leads } = await supabase
    .from('contact_inquiries')
    .select('created_at, lead_status')
    .gte('created_at', new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString())
    .order('created_at')

  return { appointments: appointments ?? [], leads: leads ?? [] }
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

export async function getFaqs() {
  await requireAuth()
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('faq')
    .select('*')
    .order('sort_order')
  return { data, error: error?.message }
}

export async function upsertFaq(data: {
  id?: string
  question: string
  answer: string
  category?: string
  is_active?: boolean
}) {
  await requireAuth()
  const supabase = await createSupabaseServerClient()
  const { id, ...payload } = data
  if (id) {
    const { error } = await supabase.from('faq').update(payload).eq('id', id)
    revalidatePath('/admin/faq')
    revalidatePath('/')
    return { error: error?.message }
  } else {
    const { error } = await supabase.from('faq').insert(payload)
    revalidatePath('/admin/faq')
    revalidatePath('/')
    return { error: error?.message }
  }
}

export async function deleteFaq(id: string) {
  await requireAuth()
  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.from('faq').delete().eq('id', id)
  revalidatePath('/admin/faq')
  revalidatePath('/')
  return { error: error?.message }
}

// ─── CLINIC SETTINGS (CONTACT INFO) ─────────────────────────────────────────

export async function getClinicSettings() {
  await requireAuth()
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('clinic_settings')
    .select('*')
    .limit(1)
    .maybeSingle()
  return { data, error: error?.message }
}

export async function updateClinicSettings(data: {
  clinic_name?: string
  phone?: string
  whatsapp?: string
  email?: string
  address?: string
  city?: string
  country?: string
  postal_code?: string
  hours_weekday?: string
  hours_saturday?: string
  hours_sunday?: string
  map_embed_url?: string
}) {
  await requireAuth()
  const supabase = await createSupabaseServerClient()
  const { error } = await supabase
    .from('clinic_settings')
    .update(data)
    .eq('id', 1)
  revalidatePath('/admin/contact-info')
  revalidatePath('/contact')
  revalidatePath('/')
  revalidatePath('/', 'layout')
  return { error: error?.message }
}

// ─── SEO ────────────────────────────────────────────────────────────────────

export async function getSeoContent() {
  await requireAuth()
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('website_content')
    .select('*')
    .eq('section', 'seo')
  return { data, error: error?.message }
}

export async function upsertSeoContent(data: {
  key: string
  value: string
}) {
  await requireAuth()
  const supabase = await createSupabaseServerClient()
  // Try update first, then insert
  const { error: updateError } = await supabase
    .from('website_content')
    .update({ value: data.value })
    .eq('section', 'seo')
    .eq('key', data.key)
  if (!updateError) {
    revalidatePath('/admin/seo')
    return { error: null }
  }
  // If update affected 0 rows, insert
  const { error: insertError } = await supabase
    .from('website_content')
    .insert({ section: 'seo', key: data.key, value: data.value, value_type: 'text' })
  revalidatePath('/admin/seo')
  revalidatePath('/')
  return { error: insertError?.message }
}

// ─── PUBLIC DATA ────────────────────────────────────────────────────────────
// Public, read-only website data is fetched with a cookie-free Supabase client
// in `src/lib/public-data.ts` so those pages stay static/ISR. Do NOT add public
// getters here — anything in this file that calls createSupabaseServerClient()
// forces the consuming route to render dynamically.
