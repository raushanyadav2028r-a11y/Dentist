"use client"

import { useState, useEffect } from "react"
import { getClinicSettings, updateClinicSettings } from "@/actions/admin"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useToast } from "@/components/admin/AdminToast"

const settingsSchema = z.object({
  phone: z.string().min(5, "Valid phone required"),
  whatsapp: z.string().min(5, "Valid WhatsApp number required"),
  email: z.string().email("Valid email required"),
  address: z.string().min(5, "Address required"),
  city: z.string().optional(),
  country: z.string().optional(),
  postal_code: z.string().optional(),
  hours_weekday: z.string().optional(),
  hours_saturday: z.string().optional(),
  hours_sunday: z.string().optional(),
  map_embed_url: z.string().optional(),
})

type SettingsForm = z.infer<typeof settingsSchema>

export default function ContactInfoPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const { showToast } = useToast()

  const { register, handleSubmit, reset, formState: { errors } } = useForm<SettingsForm>({
    resolver: zodResolver(settingsSchema),
  })

  useEffect(() => {
    (async () => {
      const { data } = await getClinicSettings()
      if (data) {
        reset({
          phone: data.phone || "",
          whatsapp: data.whatsapp || "",
          email: data.email || "",
          address: data.address || "",
          city: data.city || "",
          country: data.country || "",
          postal_code: data.postal_code || "",
          hours_weekday: data.hours_weekday || "",
          hours_saturday: data.hours_saturday || "",
          hours_sunday: data.hours_sunday || "",
          map_embed_url: data.map_embed_url || "",
        })
      }
      setLoading(false)
    })()
  }, [reset])

  const onSubmit = async (data: SettingsForm) => {
    setSaving(true)
    const result = await updateClinicSettings(data)
    setSaving(false)
    if (result.error) {
      showToast("Failed to save. Try again.", "error")
    } else {
      showToast("Changes saved successfully ✓", "success")
    }
  }

  if (loading) return <p style={{ color: "#9ca3af", textAlign: "center", padding: "32px 0" }}>Loading settings...</p>

  return (
    <div style={{ maxWidth: "640px", display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#111827", margin: 0 }}>Contact Info</h1>
        <p style={{ color: "#6b7280", marginTop: "4px", fontSize: "14px" }}>Edit clinic contact details shown on the website</p>
      </div>

      <div style={{ background: "white", borderRadius: "12px", border: "1px solid #f0f0f0", padding: "24px" }}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <Label htmlFor="ci-phone" style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "6px", display: "block" }}>Phone *</Label>
              <Input id="ci-phone" {...register("phone")} placeholder="+1 888 235 3784" />
              {errors.phone && <p style={{ color: "#dc2626", fontSize: "12px", marginTop: "4px" }}>{errors.phone.message}</p>}
            </div>
            <div>
              <Label htmlFor="ci-whatsapp" style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "6px", display: "block" }}>WhatsApp *</Label>
              <Input id="ci-whatsapp" {...register("whatsapp")} placeholder="+91 88 8235 3784" />
              {errors.whatsapp && <p style={{ color: "#dc2626", fontSize: "12px", marginTop: "4px" }}>{errors.whatsapp.message}</p>}
            </div>
          </div>
          <div>
            <Label htmlFor="ci-email" style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "6px", display: "block" }}>Email *</Label>
            <Input id="ci-email" {...register("email")} placeholder="concierge@celestiasmiles.com" />
            {errors.email && <p style={{ color: "#dc2626", fontSize: "12px", marginTop: "4px" }}>{errors.email.message}</p>}
          </div>
          <div>
            <Label htmlFor="ci-address" style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "6px", display: "block" }}>Address *</Label>
            <Input id="ci-address" {...register("address")} placeholder="422 Serenity Avenue, Suite 900" />
            {errors.address && <p style={{ color: "#dc2626", fontSize: "12px", marginTop: "4px" }}>{errors.address.message}</p>}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
            <div>
              <Label htmlFor="ci-city" style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "6px", display: "block" }}>City</Label>
              <Input id="ci-city" {...register("city")} placeholder="New Delhi" />
            </div>
            <div>
              <Label htmlFor="ci-country" style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "6px", display: "block" }}>Country</Label>
              <Input id="ci-country" {...register("country")} placeholder="India" />
            </div>
            <div>
              <Label htmlFor="ci-postal" style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "6px", display: "block" }}>Postal Code</Label>
              <Input id="ci-postal" {...register("postal_code")} placeholder="110001" />
            </div>
          </div>

          <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: "20px" }}>
            <h3 style={{ fontSize: "14px", fontWeight: "600", color: "#111827", margin: "0 0 16px" }}>Working Hours</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div>
                <Label htmlFor="ci-hours-wd" style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "6px", display: "block" }}>Weekdays (Mon–Fri)</Label>
                <Input id="ci-hours-wd" {...register("hours_weekday")} placeholder="9:00 AM – 7:00 PM" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <Label htmlFor="ci-hours-sat" style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "6px", display: "block" }}>Saturday</Label>
                  <Input id="ci-hours-sat" {...register("hours_saturday")} placeholder="10:00 AM – 3:00 PM" />
                </div>
                <div>
                  <Label htmlFor="ci-hours-sun" style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "6px", display: "block" }}>Sunday</Label>
                  <Input id="ci-hours-sun" {...register("hours_sunday")} placeholder="Closed" />
                </div>
              </div>
            </div>
          </div>

          <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: "20px" }}>
            <h3 style={{ fontSize: "14px", fontWeight: "600", color: "#111827", margin: "0 0 " }}>Google Maps</h3>
            <p style={{ fontSize: "12px", color: "#9ca3af", margin: "0 0 16px" }}>Embed URL for maps or iframe src</p>
            <div>
              <Label htmlFor="ci-map" style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "6px", display: "block" }}>Google Maps Link / Embed URL</Label>
              <Input id="ci-map" {...register("map_embed_url")} placeholder="https://maps.google.com/?q=..." />
            </div>
          </div>

          <button type="submit" disabled={saving} style={{ width: "100%", background: "#0d9488", color: "white", padding: "10px 24px", borderRadius: "8px", fontSize: "14px", fontWeight: "600", border: "none", cursor: saving ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", opacity: saving ? 0.7 : 1 }}>
            {saving ? <><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> Saving...</> : "Save Changes"}
          </button>
        </form>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
