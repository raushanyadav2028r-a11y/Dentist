"use client"

import { useState, useEffect } from "react"
import { getClinicSettings, updateClinicSettings } from "@/actions/admin"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Check } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

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
})

type SettingsForm = z.infer<typeof settingsSchema>

export default function ContactInfoPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

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
        })
      }
      setLoading(false)
    })()
  }, [reset])

  const onSubmit = async (data: SettingsForm) => {
    setSaving(true)
    setErrorMsg(null)
    setSaved(false)
    const result = await updateClinicSettings(data)
    setSaving(false)
    if (result.error) {
      setErrorMsg(result.error)
    } else {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
  }

  if (loading) return <p className="text-muted-light text-center py-8">Loading settings...</p>

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-navy">Contact Info</h1>
        <p className="text-muted mt-1">Edit clinic contact details shown on the website</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ci-phone">Phone *</Label>
                <Input id="ci-phone" {...register("phone")} placeholder="+1 888 235 3784" />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
              </div>
              <div>
                <Label htmlFor="ci-whatsapp">WhatsApp *</Label>
                <Input id="ci-whatsapp" {...register("whatsapp")} placeholder="+91 88 8235 3784" />
                {errors.whatsapp && <p className="text-red-500 text-xs mt-1">{errors.whatsapp.message}</p>}
              </div>
            </div>
            <div>
              <Label htmlFor="ci-email">Email *</Label>
              <Input id="ci-email" {...register("email")} placeholder="concierge@celestiasmiles.com" />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <Label htmlFor="ci-address">Address *</Label>
              <Input id="ci-address" {...register("address")} placeholder="422 Serenity Avenue, Suite 900" />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="ci-city">City</Label>
                <Input id="ci-city" {...register("city")} placeholder="New Delhi" />
              </div>
              <div>
                <Label htmlFor="ci-country">Country</Label>
                <Input id="ci-country" {...register("country")} placeholder="India" />
              </div>
              <div>
                <Label htmlFor="ci-postal">Postal Code</Label>
                <Input id="ci-postal" {...register("postal_code")} placeholder="110001" />
              </div>
            </div>

            <div className="border-t border-slate-200 pt-5 mt-5">
              <h3 className="font-semibold text-navy mb-3">Working Hours</h3>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="ci-hours-wd">Weekdays (Mon–Fri)</Label>
                  <Input id="ci-hours-wd" {...register("hours_weekday")} placeholder="9:00 AM – 7:00 PM" />
                </div>
                <div>
                  <Label htmlFor="ci-hours-sat">Saturday</Label>
                  <Input id="ci-hours-sat" {...register("hours_saturday")} placeholder="10:00 AM – 3:00 PM" />
                </div>
                <div>
                  <Label htmlFor="ci-hours-sun">Sunday</Label>
                  <Input id="ci-hours-sun" {...register("hours_sunday")} placeholder="Closed" />
                </div>
              </div>
            </div>

            {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

            <Button type="submit" disabled={saving} className="w-full sm:w-auto">
              {saving ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</>
              ) : saved ? (
                <><Check className="mr-2 h-4 w-4" /> Saved!</>
              ) : (
                "Save Changes"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
