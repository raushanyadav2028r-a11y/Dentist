"use client"

import { useState, useEffect, useCallback, useTransition } from "react"
import { getTestimonials, upsertTestimonial, deleteTestimonial } from "@/actions/admin"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Trash2, Loader2, Star } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useToast } from "@/components/admin/AdminToast"
import NextImage from "next/image"

const testimonialSchema = z.object({
  name: z.string().min(2, "Patient name is required"),
  role: z.string().optional(),
  treatment_label: z.string().optional(),
  treatment_slug: z.string().optional(),
  rating: z.number().min(1).max(5),
  quote: z.string().min(10, "Review must be at least 10 characters"),
  review_date: z.string().optional(),
  before_image: z.string().optional(),
  after_image: z.string().optional(),
  is_approved: z.boolean().optional(),
})

type TestimonialFormData = z.infer<typeof testimonialSchema>
type Testimonial = { id: string; name: string; role: string | null; treatment_label: string | null; treatment_slug: string | null; rating: number; quote: string; review_date: string | null; before_image: string | null; after_image: string | null; is_approved: boolean }

const emptyForm: TestimonialFormData = { name: "", role: "", treatment_label: "", treatment_slug: "", rating: 5, quote: "", review_date: "", before_image: "", after_image: "", is_approved: true }

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const { showToast } = useToast()

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<TestimonialFormData>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: emptyForm,
  })

  const fetchData = useCallback(async () => {
    setLoading(true)
    const { data } = await getTestimonials()
    setTestimonials((data as Testimonial[]) || [])
    setLoading(false)
  }, [])

  const [, startTransition] = useTransition()
  useEffect(() => { startTransition(() => { void fetchData() }) }, [fetchData, startTransition])

  const beforePreview = watch("before_image")
  const afterPreview = watch("after_image")

  const onSubmit = async (data: TestimonialFormData) => {
    setSaving(true)
    const result = await upsertTestimonial({ ...data, id: editId || undefined })
    setSaving(false)
    if (result.error) { showToast("Failed to save. Try again.", "error"); return }
    setOpen(false)
    reset(emptyForm)
    setEditId(null)
    showToast(editId ? "Review updated ✓" : "Review added ✓", "success")
    fetchData()
  }

  const handleEdit = (t: Testimonial) => {
    setEditId(t.id)
    reset({
      name: t.name, role: t.role || "", treatment_label: t.treatment_label || "",
      treatment_slug: t.treatment_slug || "", rating: t.rating, quote: t.quote,
      review_date: t.review_date || "", before_image: t.before_image || "", after_image: t.after_image || "",
      is_approved: t.is_approved,
    })
    setOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this review?")) return
    await deleteTestimonial(id)
    showToast("Review deleted", "success")
    fetchData()
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#111827", margin: 0 }}>Testimonials</h1>
          <p style={{ color: "#6b7280", marginTop: "4px", fontSize: "14px" }}>Manage patient reviews</p>
        </div>
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) { reset(emptyForm); setEditId(null) } }}>
          <DialogTrigger asChild>
            <Button onClick={() => { reset(emptyForm); setEditId(null) }}><Plus size={16} className="mr-2" /> Add Review</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{editId ? "Edit Review" : "Add Review"}</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <Label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "6px", display: "block" }}>Patient Name *</Label>
                  <Input {...register("name")} placeholder="Sarah M." />
                  {errors.name && <p style={{ color: "#dc2626", fontSize: "12px", marginTop: "4px" }}>{errors.name.message}</p>}
                </div>
                <div>
                  <Label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "6px", display: "block" }}>Role/Title</Label>
                  <Input {...register("role")} placeholder="CEO" />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <Label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "6px", display: "block" }}>Treatment Type</Label>
                  <Input {...register("treatment_label")} placeholder="Smile Makeover" />
                </div>
                <div>
                  <Label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "6px", display: "block" }}>Rating (1-5)</Label>
                  <Input type="number" min={1} max={5} {...register("rating", { valueAsNumber: true })} />
                  {errors.rating && <p style={{ color: "#dc2626", fontSize: "12px", marginTop: "4px" }}>{errors.rating.message}</p>}
                </div>
              </div>
              <div>
                <Label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "6px", display: "block" }}>Review Text *</Label>
                <Textarea {...register("quote")} rows={4} placeholder="Patient's review..." />
                {errors.quote && <p style={{ color: "#dc2626", fontSize: "12px", marginTop: "4px" }}>{errors.quote.message}</p>}
              </div>
              {/* Before & After Images */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <Label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "6px", display: "block" }}>Before Image URL</Label>
                  <Input {...register("before_image")} placeholder="/transformations/before.webp" />
                  {beforePreview && (
                    <div style={{ marginTop: "8px", position: "relative", width: "100%", height: "80px", borderRadius: "8px", overflow: "hidden", border: "1px solid #e5e7eb", background: "#f9fafb" }}>
                      <NextImage src={beforePreview} alt="Before preview" fill className="object-cover" />
                    </div>
                  )}
                </div>
                <div>
                  <Label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "6px", display: "block" }}>After Image URL</Label>
                  <Input {...register("after_image")} placeholder="/transformations/after.webp" />
                  {afterPreview && (
                    <div style={{ marginTop: "8px", position: "relative", width: "100%", height: "80px", borderRadius: "8px", overflow: "hidden", border: "1px solid #e5e7eb", background: "#f9fafb" }}>
                      <NextImage src={afterPreview} alt="After preview" fill className="object-cover" />
                    </div>
                  )}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <input type="checkbox" id="rev-approved" defaultChecked {...register("is_approved")} style={{ borderRadius: "4px" }} />
                <Label htmlFor="rev-approved" style={{ fontSize: "13px", fontWeight: "500", color: "#374151" }}>Approved (visible on website)</Label>
              </div>
              <button type="submit" disabled={saving} style={{ width: "100%", background: "#0d9488", color: "white", padding: "10px 24px", borderRadius: "8px", fontSize: "14px", fontWeight: "600", border: "none", cursor: saving ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                {saving ? <><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> Saving...</> : editId ? "Update Review" : "Add Review"}
              </button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <p style={{ color: "#9ca3af", textAlign: "center", padding: "32px 0" }}>Loading reviews...</p>
      ) : testimonials.length === 0 ? (
        <div style={{ background: "white", borderRadius: "12px", border: "1px solid #f0f0f0", padding: "32px", textAlign: "center", color: "#9ca3af" }}>No reviews yet.</div>
      ) : (
        <div className="admin-testimonials-grid">
          {testimonials.map((t) => (
            <div key={t.id} style={{ background: "white", borderRadius: "12px", border: "1px solid #f0f0f0", padding: "20px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(13,148,136,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", color: "#0d9488", fontSize: "14px", flexShrink: 0 }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h3 style={{ fontWeight: "600", color: "#111827", fontSize: "13px", margin: 0 }}>{t.name}</h3>
                    <p style={{ color: "#6b7280", fontSize: "11px", margin: "2px 0 0" }}>{t.role}</p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "4px" }}>
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(t)}><Pencil size={14} /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(t.id)} style={{ color: "#f87171" }}><Trash2 size={14} /></Button>
                </div>
              </div>
              <div style={{ display: "flex", gap: "2px", marginBottom: "8px" }}>
                {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={12} style={{ color: "#f59e0b", fill: "#f59e0b" }} />)}
              </div>
              <p style={{ color: "#6b7280", fontSize: "13px", lineHeight: "1.5", margin: 0, fontStyle: "italic" }}>&ldquo;{t.quote}&rdquo;</p>
              <div style={{ display: "flex", gap: "8px", marginTop: "12px", flexWrap: "wrap" }}>
                <Badge variant={t.is_approved ? "success" : "warning"} style={{ fontSize: "10px" }}>{t.is_approved ? "Approved" : "Pending"}</Badge>
                {t.treatment_label && <Badge variant="outline" style={{ fontSize: "10px" }}>{t.treatment_label}</Badge>}
                {(t.before_image || t.after_image) && <Badge variant="outline" style={{ fontSize: "10px" }}>Has photos</Badge>}
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .admin-testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 16px;
        }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .admin-testimonials-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
