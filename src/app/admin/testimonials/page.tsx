"use client"

import { useState, useEffect, useCallback } from "react"
import { getTestimonials, upsertTestimonial, deleteTestimonial } from "@/actions/admin"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Trash2, Loader2, Check, Star } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const testimonialSchema = z.object({
  name: z.string().min(2, "Patient name is required"),
  role: z.string().optional(),
  treatment_label: z.string().optional(),
  treatment_slug: z.string().optional(),
  rating: z.number().min(1).max(5),
  quote: z.string().min(10, "Review must be at least 10 characters"),
  review_date: z.string().optional(),
  is_approved: z.boolean().optional(),
})

type TestimonialFormData = z.infer<typeof testimonialSchema>
type Testimonial = { id: string; name: string; role: string | null; treatment_label: string | null; treatment_slug: string | null; rating: number; quote: string; review_date: string | null; is_approved: boolean }

const emptyForm: TestimonialFormData = { name: "", role: "", treatment_label: "", treatment_slug: "", rating: 5, quote: "", review_date: "", is_approved: true }

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<TestimonialFormData>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: emptyForm,
  })

  const fetchData = useCallback(async () => {
    setLoading(true)
    const { data } = await getTestimonials()
    setTestimonials((data as Testimonial[]) || [])
    setLoading(false)
  }, [])

  useEffect(() => { void fetchData() }, [fetchData])

  const onSubmit = async (data: TestimonialFormData) => {
    setSaving(true)
    const result = await upsertTestimonial({ ...data, id: editId || undefined })
    setSaving(false)
    if (result.error) { alert(result.error); return }
    setOpen(false)
    reset(emptyForm)
    setEditId(null)
    setSuccessMsg(editId ? "Review updated" : "Review added")
    setTimeout(() => setSuccessMsg(null), 2000)
    fetchData()
  }

  const handleEdit = (t: Testimonial) => {
    setEditId(t.id)
    reset({
      name: t.name, role: t.role || "", treatment_label: t.treatment_label || "",
      treatment_slug: t.treatment_slug || "", rating: t.rating, quote: t.quote,
      review_date: t.review_date || "", is_approved: t.is_approved,
    })
    setOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this review?")) return
    await deleteTestimonial(id)
    fetchData()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-navy">Testimonials</h1>
          <p className="text-muted mt-1">Manage patient reviews</p>
        </div>
        <div className="flex items-center gap-3">
          {successMsg && <span className="flex items-center gap-1 text-sm text-green-600 font-medium"><Check size={16} /> {successMsg}</span>}
          <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) { reset(emptyForm); setEditId(null) } }}>
            <DialogTrigger asChild>
              <Button onClick={() => { reset(emptyForm); setEditId(null) }}><Plus size={16} className="mr-2" /> Add Review</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader><DialogTitle>{editId ? "Edit Review" : "Add Review"}</DialogTitle></DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Patient Name *</Label>
                    <Input {...register("name")} placeholder="Sarah M." />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div><Label>Role/Title</Label><Input {...register("role")} placeholder="CEO" /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Treatment Type</Label><Input {...register("treatment_label")} placeholder="Smile Makeover" /></div>
                  <div>
                    <Label>Rating (1-5)</Label>
                    <Input type="number" min={1} max={5} {...register("rating", { valueAsNumber: true })} />
                    {errors.rating && <p className="text-red-500 text-xs mt-1">{errors.rating.message}</p>}
                  </div>
                </div>
                <div>
                  <Label>Review Text *</Label>
                  <Textarea {...register("quote")} rows={4} placeholder="Patient's review..." />
                  {errors.quote && <p className="text-red-500 text-xs mt-1">{errors.quote.message}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="rev-approved" defaultChecked {...register("is_approved")} className="rounded" />
                  <Label htmlFor="rev-approved">Approved (visible on website)</Label>
                </div>
                <Button type="submit" className="w-full" disabled={saving}>
                  {saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : editId ? "Update Review" : "Add Review"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {loading ? (
        <p className="text-muted-light text-center py-8">Loading reviews...</p>
      ) : testimonials.length === 0 ? (
        <Card><CardContent className="p-8 text-center text-muted-light">No reviews yet.</CardContent></Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <Card key={t.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">{t.name.charAt(0)}</div>
                    <div>
                      <h3 className="font-semibold text-navy text-sm">{t.name}</h3>
                      <p className="text-xs text-muted">{t.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(t)}><Pencil size={14} /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(t.id)} className="text-red-400 hover:text-red-600"><Trash2 size={14} /></Button>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-2">
                  {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={12} className="text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-sm text-muted line-clamp-3 italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex gap-2 mt-3">
                  <Badge variant={t.is_approved ? "success" : "warning"} className="text-[10px]">{t.is_approved ? "Approved" : "Pending"}</Badge>
                  {t.treatment_label && <Badge variant="outline" className="text-[10px]">{t.treatment_label}</Badge>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
