"use client"

import { useState, useEffect, useCallback } from "react"
import { getServices, upsertService, deleteService } from "@/actions/admin"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Trash2, Loader2, Check, Sparkles } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const serviceSchema = z.object({
  title: z.string().min(2, "Title is required"),
  slug: z.string().min(2, "Slug is required"),
  tagline: z.string().optional(),
  description: z.string().optional(),
  icon: z.string().optional(),
  benefits: z.string().optional(),
  duration: z.string().optional(),
  aftercare: z.string().optional(),
  price_range: z.string().optional(),
  is_featured: z.boolean().optional(),
})

type ServiceFormData = z.infer<typeof serviceSchema>
type Service = { id: string; title: string; slug: string; tagline: string | null; description: string | null; icon: string | null; benefits: string[]; duration: string | null; aftercare: string | null; price_range: string | null; is_featured: boolean }

const emptyForm: ServiceFormData = { title: "", slug: "", tagline: "", description: "", icon: "", benefits: "", duration: "", aftercare: "", price_range: "", is_featured: false }

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: emptyForm,
  })

  const fetchData = useCallback(async () => {
    setLoading(true)
    const { data } = await getServices()
    setServices((data as Service[]) || [])
    setLoading(false)
  }, [])

  useEffect(() => { void fetchData() }, [fetchData])

  // Auto-generate slug from title
  const titleVal = watch("title")
  useEffect(() => {
    if (!editId && titleVal) {
      setValue("slug", titleVal.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""))
    }
  }, [titleVal, editId, setValue])

  const onSubmit = async (data: ServiceFormData) => {
    setSaving(true)
    const result = await upsertService({
      ...data,
      id: editId || undefined,
      benefits: (data.benefits || "").split(",").map(s => s.trim()).filter(Boolean),
    })
    setSaving(false)
    if (result.error) { alert(result.error); return }
    setOpen(false)
    reset(emptyForm)
    setEditId(null)
    setSuccessMsg(editId ? "Service updated" : "Service added")
    setTimeout(() => setSuccessMsg(null), 2000)
    fetchData()
  }

  const handleEdit = (s: Service) => {
    setEditId(s.id)
    reset({
      title: s.title, slug: s.slug, tagline: s.tagline || "", description: s.description || "",
      icon: s.icon || "", benefits: (s.benefits || []).join(", "),
      duration: s.duration || "", aftercare: s.aftercare || "", price_range: s.price_range || "",
      is_featured: s.is_featured,
    })
    setOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this service?")) return
    await deleteService(id)
    fetchData()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-navy">Services</h1>
          <p className="text-muted mt-1">Manage dental service listings</p>
        </div>
        <div className="flex items-center gap-3">
          {successMsg && <span className="flex items-center gap-1 text-sm text-green-600 font-medium"><Check size={16} /> {successMsg}</span>}
          <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) { reset(emptyForm); setEditId(null) } }}>
            <DialogTrigger asChild>
              <Button onClick={() => { reset(emptyForm); setEditId(null) }}><Plus size={16} className="mr-2" /> Add Service</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
              <DialogHeader><DialogTitle>{editId ? "Edit Service" : "Add Service"}</DialogTitle></DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Title *</Label>
                    <Input {...register("title")} placeholder="Teeth Whitening" />
                    {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                  </div>
                  <div>
                    <Label>Slug *</Label>
                    <Input {...register("slug")} placeholder="teeth-whitening" />
                    {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug.message}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Tagline</Label><Input {...register("tagline")} placeholder="Brighter. Faster. Safer." /></div>
                  <div><Label>Icon (lucide name)</Label><Input {...register("icon")} placeholder="Sparkles" /></div>
                </div>
                <div><Label>Description</Label><Textarea {...register("description")} rows={3} placeholder="Full service description..." /></div>
                <div className="grid grid-cols-3 gap-4">
                  <div><Label>Duration</Label><Input {...register("duration")} placeholder="1–2 sessions" /></div>
                  <div><Label>Price Range</Label><Input {...register("price_range")} placeholder="₹8,000 – ₹15,000" /></div>
                  <div><Label>Benefits (comma-sep)</Label><Input {...register("benefits")} placeholder="Safe, Fast, Painless" /></div>
                </div>
                <div><Label>Aftercare</Label><Textarea {...register("aftercare")} rows={2} placeholder="Post-treatment care instructions..." /></div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="svc-featured" {...register("is_featured")} className="rounded" />
                  <Label htmlFor="svc-featured">Featured on homepage</Label>
                </div>
                <Button type="submit" className="w-full" disabled={saving}>
                  {saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : editId ? "Update Service" : "Add Service"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {loading ? (
        <p className="text-muted-light text-center py-8">Loading services...</p>
      ) : services.length === 0 ? (
        <Card><CardContent className="p-8 text-center text-muted-light">No services yet.</CardContent></Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s) => (
            <Card key={s.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><Sparkles size={18} className="text-primary" /></div>
                    <div>
                      <h3 className="font-semibold text-navy">{s.title}</h3>
                      {s.tagline && <p className="text-xs text-muted italic">{s.tagline}</p>}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(s)}><Pencil size={14} /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(s.id)} className="text-red-400 hover:text-red-600"><Trash2 size={14} /></Button>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  {s.is_featured && <Badge variant="success" className="text-[10px]">Featured</Badge>}
                  {s.duration && <Badge variant="outline" className="text-[10px]">{s.duration}</Badge>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
