"use client"

import { useState, useEffect, useCallback, useTransition } from "react"
import { getServices, upsertService, deleteService } from "@/actions/admin"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Trash2, Loader2, Sparkles } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useToast } from "@/components/admin/AdminToast"

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

const ICON_OPTIONS = [
  "Sparkles", "Tooth", "Syringe", "Microwave", "Smile", "Heart",
  "Shield", "Zap", "Star", "Gem", "Sun", "Droplets",
]

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const { showToast } = useToast()

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

  const [, startTransition] = useTransition()
  useEffect(() => { startTransition(() => { void fetchData() }) }, [fetchData, startTransition])

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
    if (result.error) { showToast("Failed to save. Try again.", "error"); return }
    setOpen(false)
    reset(emptyForm)
    setEditId(null)
    showToast(editId ? "Service updated ✓" : "Service added ✓", "success")
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
    showToast("Service deleted", "success")
    fetchData()
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#111827", margin: 0 }}>Services</h1>
          <p style={{ color: "#6b7280", marginTop: "4px", fontSize: "14px" }}>Manage dental service listings</p>
        </div>
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) { reset(emptyForm); setEditId(null) } }}>
          <DialogTrigger asChild>
            <Button onClick={() => { reset(emptyForm); setEditId(null) }}><Plus size={16} className="mr-2" /> Add Service</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{editId ? "Edit Service" : "Add Service"}</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <Label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "6px", display: "block" }}>Title *</Label>
                  <Input {...register("title")} placeholder="Teeth Whitening" />
                  {errors.title && <p style={{ color: "#dc2626", fontSize: "12px", marginTop: "4px" }}>{errors.title.message}</p>}
                </div>
                <div>
                  <Label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "6px", display: "block" }}>Slug *</Label>
                  <Input {...register("slug")} placeholder="teeth-whitening" />
                  {errors.slug && <p style={{ color: "#dc2626", fontSize: "12px", marginTop: "4px" }}>{errors.slug.message}</p>}
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <Label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "6px", display: "block" }}>Tagline</Label>
                  <Input {...register("tagline")} placeholder="Brighter. Faster. Safer." />
                </div>
                <div>
                  <Label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "6px", display: "block" }}>Icon</Label>
                  <select {...register("icon")} style={{ width: "100%", padding: "10px 14px", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "14px", color: "#111827", background: "#ffffff", outline: "none" }}>
                    <option value="">Select an icon...</option>
                    {ICON_OPTIONS.map(ico => <option key={ico} value={ico}>{ico}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <Label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "6px", display: "block" }}>Description</Label>
                <Textarea {...register("description")} rows={3} placeholder="Full service description..." />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                <div>
                  <Label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "6px", display: "block" }}>Duration</Label>
                  <Input {...register("duration")} placeholder="1–2 sessions" />
                </div>
                <div>
                  <Label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "6px", display: "block" }}>Price Range</Label>
                  <Input {...register("price_range")} placeholder="₹8,000 – ₹15,000" />
                </div>
                <div>
                  <Label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "6px", display: "block" }}>Benefits (comma-sep)</Label>
                  <Input {...register("benefits")} placeholder="Safe, Fast, Painless" />
                </div>
              </div>
              <div>
                <Label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "6px", display: "block" }}>Aftercare</Label>
                <Textarea {...register("aftercare")} rows={2} placeholder="Post-treatment care instructions..." />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <input type="checkbox" id="svc-featured" {...register("is_featured")} style={{ borderRadius: "4px" }} />
                <Label htmlFor="svc-featured" style={{ fontSize: "13px", fontWeight: "500", color: "#374151" }}>Featured on homepage</Label>
              </div>
              <button type="submit" disabled={saving} style={{ width: "100%", background: "#0d9488", color: "white", padding: "10px 24px", borderRadius: "8px", fontSize: "14px", fontWeight: "600", border: "none", cursor: saving ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                {saving ? <><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> Saving...</> : editId ? "Update Service" : "Add Service"}
              </button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <p style={{ color: "#9ca3af", textAlign: "center", padding: "32px 0" }}>Loading services...</p>
      ) : services.length === 0 ? (
        <div style={{ background: "white", borderRadius: "12px", border: "1px solid #f0f0f0", padding: "32px", textAlign: "center", color: "#9ca3af" }}>No services yet.</div>
      ) : (
        <div className="admin-services-grid">
          {services.map((s) => (
            <div key={s.id} style={{ background: "white", borderRadius: "12px", border: "1px solid #f0f0f0", padding: "20px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(13,148,136,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Sparkles size={18} style={{ color: "#0d9488" }} />
                  </div>
                  <div>
                    <h3 style={{ fontWeight: "600", color: "#111827", fontSize: "14px", margin: 0 }}>{s.title}</h3>
                    {s.tagline && <p style={{ color: "#6b7280", fontSize: "11px", fontStyle: "italic", margin: "2px 0 0" }}>{s.tagline}</p>}
                  </div>
                </div>
                <div style={{ display: "flex", gap: "4px" }}>
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(s)}><Pencil size={14} /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(s.id)} style={{ color: "#f87171" }}><Trash2 size={14} /></Button>
                </div>
              </div>
              <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
                {s.is_featured && <Badge variant="success" style={{ fontSize: "10px" }}>Featured</Badge>}
                {s.duration && <Badge variant="outline" style={{ fontSize: "10px" }}>{s.duration}</Badge>}
                {s.price_range && <Badge variant="outline" style={{ fontSize: "10px" }}>{s.price_range}</Badge>}
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .admin-services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 16px;
        }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .admin-services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
