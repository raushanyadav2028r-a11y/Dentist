export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      services: {
        Row: {
          id: string
          slug: string
          title: string
          tagline: string | null
          description: string | null
          icon: string | null
          benefits: string[]
          duration: string | null
          aftercare: string | null
          price_range: string | null
          is_featured: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['services']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['services']['Row']>
      }
      specialists: {
        Row: {
          id: string
          name: string
          role: string | null
          education: string | null
          experience: string | null
          specialties: string[]
          languages: string | null
          clinic_days: string | null
          bio: string | null
          image_src: string | null
          gender: 'male' | 'female' | 'other' | null
          is_active: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['specialists']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['specialists']['Row']>
      }
      testimonials: {
        Row: {
          id: string
          name: string
          role: string | null
          treatment_slug: string | null
          treatment_label: string | null
          rating: number
          review_date: string | null
          quote: string
          is_approved: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['testimonials']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['testimonials']['Row']>
      }
      appointments: {
        Row: {
          id: string
          full_name: string
          phone: string
          email: string | null
          service: string | null
          preferred_date: string | null
          preferred_time: string | null
          message: string | null
          status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no_show'
          notes: string | null
          selected_treatment: string | null
          estimated_cost: string | null
          estimated_duration: string | null
          source: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['appointments']['Row'], 'id' | 'created_at' | 'updated_at' | 'status'> & {
          id?: string
          created_at?: string
          updated_at?: string
          status?: Database['public']['Tables']['appointments']['Row']['status']
        }
        Update: Partial<Database['public']['Tables']['appointments']['Row']>
      }
      contact_inquiries: {
        Row: {
          id: string
          full_name: string
          phone: string
          email: string | null
          service: string | null
          preferred_date: string | null
          message: string | null
          status: 'new' | 'in_progress' | 'resolved' | 'spam'
          lead_status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost' | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['contact_inquiries']['Row'], 'id' | 'created_at' | 'updated_at' | 'status'> & {
          id?: string
          created_at?: string
          updated_at?: string
          status?: Database['public']['Tables']['contact_inquiries']['Row']['status']
        }
        Update: Partial<Database['public']['Tables']['contact_inquiries']['Row']>
      }
      faq: {
        Row: {
          id: string
          question: string
          answer: string
          category: string | null
          sort_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['faq']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['faq']['Row']>
      }
      clinic_settings: {
        Row: {
          id: number
          clinic_name: string | null
          address: string | null
          city: string | null
          country: string | null
          postal_code: string | null
          phone: string | null
          whatsapp: string | null
          email: string | null
          hours_weekday: string | null
          hours_saturday: string | null
          hours_sunday: string | null
          map_embed_url: string | null
          updated_at: string
        }
        Insert: Partial<Database['public']['Tables']['clinic_settings']['Row']>
        Update: Partial<Database['public']['Tables']['clinic_settings']['Row']>
      }
      admin_users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: 'super_admin' | 'admin' | 'receptionist'
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['admin_users']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['admin_users']['Row']>
      }
      before_after_cases: {
        Row: {
          id: string
          title: string
          treatment_type: string | null
          before_image: string | null
          after_image: string | null
          description: string | null
          is_featured: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['before_after_cases']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['before_after_cases']['Row']>
      }
      website_content: {
        Row: {
          id: string
          section: string
          key: string
          value: string | null
          value_type: 'text' | 'html' | 'image' | 'json'
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['website_content']['Row'], 'updated_at'> & {
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['website_content']['Row']>
      }
    }
  }
}
