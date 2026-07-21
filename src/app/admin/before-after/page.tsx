"use client"

import { useState, useEffect, useCallback, useTransition } from "react"
import { getBeforeAfterCases, upsertBeforeAfterCase, deleteBeforeAfterCase } from "@/actions/admin"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Trash2, Loader2, Image as ImageIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useToast } from "@/components/admin/AdminToast"
import NextImage from "next/image"

const caseSchema = z.object({
  title: z.string().min(2, "Title is required"),
  treatment_type: z.string().optional(),
  before_image: z.string().optional(),
  after_image: z.string().optional(),
  description: z.string().optional(),
  is_featured: z.boolean().optional(),
})

type CaseFormData = z.infer<typeof caseSchema>
type CaseItem = { id: string; title: string; treatment_type: string | null; before_image: string | null; after_image: string | null; description: string | null; is_featured: boolean }

const emptyForm: CaseFormData = { title: "", treatment_type: "", before_image: "", after_image: "", description: "", is_featured: false }

export default function BeforeAfterPage() {
  const [cases, setCases] = useState<CaseItem[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const { showToast } = useToast()

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<CaseFormData>({
    resolver: zodResolver(caseSchema),
    defaultValues: emptyForm,
  })

  const fetchData = useCallback(async () => {
    setLoading(true)
    const { data } = await getBeforeAfterCases()
    setCases((data as CaseItem[]) || [])
    setLoading(false)
  }, [])

  const [, startTransition] = useTransition()
  useEffect(() => { startTransition(() => { void fetchData() }) }, [fetchData, startTransition])

  const beforePreview = watch("before_image")
  const afterPreview = watch("after_image")

  const onSubmit = async (data: CaseFormData) => {
    setSaving(true)
    const result = await upsertBeforeAfterCase({ ...data, id: editId || undefined })
    setSaving(false)
    if (result.error) { showToast("Failed to save. Try again.", "error"); return }
    setOpen(false)
    reset(emptyForm)
    setEditId(null)
    showToast(editId ? "Case updated ✓" : "Case added ✓", "success")
    fetchData()
  }

  const handleEdit = (c: CaseItem) => {
    setEditId(c.id)
    reset({
      title: c.title, treatment_type: c.treatment_type || "",
      before_image: c.before_image || "", after_image: c.after_image || "",
      description: c.description || "", is_featured: c.is_featured,
    })
    setOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this case?")) return
    await deleteBeforeAfterCase(id)
    showToast("Case deleted", "success")
    fetchData()
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#111827", margin: 0 }}>Before & After</h1>
          <p style={{ color: "#6b7280", marginTop: "4px", fontSize: "14px" }}>Manage transformation case studies</p>
        </div>
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) { reset(emptyForm); setEditId(null) } }}>
          <DialogTrigger asChild>
            <Button onClick={() => { reset(emptyForm); setEditId(null) }}><Plus size={16} className="mr-2" /> Add Case</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{editId ? "Edit Case" : "Add Case"}</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <Label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "6px", display: "block" }}>Title *</Label>
                <Input {...register("title")} placeholder="Laser Whitening Transformation" />
                {errors.title && <p style={{ color: "#dc2626", fontSize: "12px", marginTop: "4px" }}>{errors.title.message}</p>}
              </div>
              <div>
                <Label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "6px", display: "block" }}>Treatment Type</Label>
                <Input {...register("treatment_type")} placeholder="Laser Whitening" />
              </div>
              <div>
                <Label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "6px", display: "block" }}>Before Image URL</Label>
                <Input {...register("before_image")} placeholder="/before.webp" />
                {beforePreview && (
                  <div style={{ marginTop: "8px", position: "relative", width: "100%", height: "120px", borderRadius: "8px", overflow: "hidden", border: "1px solid #e5e7eb", background: "#f9fafb" }}>
                    <NextImage src={beforePreview} alt="Before preview" fill className="object-cover" />
                  </div>
                )}
              </div>
              <div>
                <Label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "6px", display: "block" }}>After Image URL</Label>
                <Input {...register("after_image")} placeholder="/after.webp" />
                {afterPreview && (
                  <div style={{ marginTop: "8px", position: "relative", width: "100%", height: "120px", borderRadius: "8px", overflow: "hidden", border: "1px solid #e5e7eb", background: "#f9fafb" }}>
                    <NextImage src={afterPreview} alt="After preview" fill className="object-cover" />
                  </div>
                )}
              </div>
              <div>
                <Label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "6px", display: "block" }}>Description</Label>
                <Textarea {...register("description")} rows={2} placeholder="Brief case description..." />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <input type="checkbox" id="case-featured" {...register("is_featured")} style={{ borderRadius: "4px" }} />
                <Label htmlFor="case-featured" style={{ fontSize: "13px", fontWeight: "500", color: "#374151" }}>Visible on homepage</Label>
              </div>
              <button type="submit" disabled={saving} style={{ width: "100%", background: "#0d9488", color: "white", padding: "10px 24px", borderRadius: "8px", fontSize: "14px", fontWeight: "600", border: "none", cursor: saving ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                {saving ? <><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> Saving...</> : editId ? "Update Case" : "Add Case"}
              </button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <p style={{ color: "#9ca3af", textAlign: "center", padding: "32px 0" }}>Loading cases...</p>
      ) : cases.length === 0 ? (
        <div style={{ background: "white", borderRadius: "12px", border: "1px solid #f0f0f0", padding: "32px", textAlign: "center", color: "#9ca3af" }}>No cases yet.</div>
      ) : (
        <div className="admin-beforeafter-grid">
          {cases.map((c) => (
            <div key={c.id} style={{ background: "white", borderRadius: "12px", border: "1px solid #f0f0f0", overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", background: "#f9fafb" }}>
                <div style={{ position: "relative", aspectRatio: "1", background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", color: "#9ca3af" }}>
                  {c.before_image ? <NextImage src={c.before_image} alt={`${c.title} before`} fill className="object-cover" /> : <ImageIcon size={32} />}
                </div>
                <div style={{ position: "relative", aspectRatio: "1", background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", color: "#9ca3af" }}>
                  {c.after_image ? <NextImage src={c.after_image} alt={`${c.title} after`} fill className="object-cover" /> : <ImageIcon size={32} />}
                </div>
              </div>
              <div style={{ padding: "16px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                  <div>
                    <h3 style={{ fontWeight: "600", color: "#111827", fontSize: "14px", margin: 0 }}>{c.title}</h3>
                    {c.treatment_type && <p style={{ color: "#6b7280", fontSize: "11px", marginTop: "2px" }}>{c.treatment_type}</p>}
                  </div>
                  <div style={{ display: "flex", gap: "4px" }}>
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(c)}><Pencil size={14} /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(c.id)} style={{ color: "#f87171" }}><Trash2 size={14} /></Button>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                  {c.is_featured && <Badge variant="success" style={{ fontSize: "10px" }}>Visible on site</Badge>}
                  {!c.is_featured && <Badge variant="secondary" style={{ fontSize: "10px" }}>Hidden</Badge>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .admin-beforeafter-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 16px;
        }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .admin-beforeafter-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
