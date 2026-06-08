"use client"

import { useState, useEffect, useCallback } from "react"
import { getBeforeAfterCases, upsertBeforeAfterCase, deleteBeforeAfterCase } from "@/actions/admin"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Trash2, Loader2, Check, Image as ImageIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
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
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

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

  useEffect(() => { void fetchData() }, [fetchData])

  const beforePreview = watch("before_image")
  const afterPreview = watch("after_image")

  const onSubmit = async (data: CaseFormData) => {
    setSaving(true)
    const result = await upsertBeforeAfterCase({ ...data, id: editId || undefined })
    setSaving(false)
    if (result.error) { alert(result.error); return }
    setOpen(false)
    reset(emptyForm)
    setEditId(null)
    setSuccessMsg(editId ? "Case updated" : "Case added")
    setTimeout(() => setSuccessMsg(null), 2000)
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
    fetchData()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-navy">Before & After</h1>
          <p className="text-muted mt-1">Manage transformation case studies</p>
        </div>
        <div className="flex items-center gap-3">
          {successMsg && <span className="flex items-center gap-1 text-sm text-green-600 font-medium"><Check size={16} /> {successMsg}</span>}
          <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) { reset(emptyForm); setEditId(null) } }}>
            <DialogTrigger asChild>
              <Button onClick={() => { reset(emptyForm); setEditId(null) }}><Plus size={16} className="mr-2" /> Add Case</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
              <DialogHeader><DialogTitle>{editId ? "Edit Case" : "Add Case"}</DialogTitle></DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label>Title *</Label>
                  <Input {...register("title")} placeholder="Laser Whitening Transformation" />
                  {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                </div>
                <div><Label>Treatment Type</Label><Input {...register("treatment_type")} placeholder="Laser Whitening" /></div>
                <div>
                  <Label>Before Image URL</Label>
                  <Input {...register("before_image")} placeholder="/before.png" />
                  {beforePreview && (
                    <div className="mt-2 relative w-full h-32 rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
                      <NextImage src={beforePreview} alt="Before preview" fill className="object-cover" />
                    </div>
                  )}
                </div>
                <div>
                  <Label>After Image URL</Label>
                  <Input {...register("after_image")} placeholder="/after.png" />
                  {afterPreview && (
                    <div className="mt-2 relative w-full h-32 rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
                      <NextImage src={afterPreview} alt="After preview" fill className="object-cover" />
                    </div>
                  )}
                </div>
                <div><Label>Description</Label><Textarea {...register("description")} rows={2} placeholder="Brief case description..." /></div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="case-featured" {...register("is_featured")} className="rounded" />
                  <Label htmlFor="case-featured">Featured on homepage</Label>
                </div>
                <Button type="submit" className="w-full" disabled={saving}>
                  {saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : editId ? "Update Case" : "Add Case"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {loading ? (
        <p className="text-muted-light text-center py-8">Loading cases...</p>
      ) : cases.length === 0 ? (
        <Card><CardContent className="p-8 text-center text-muted-light">No cases yet.</CardContent></Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cases.map((c) => (
            <Card key={c.id} className="overflow-hidden">
              <div className="grid grid-cols-2 gap-0 bg-slate-50">
                <div className="relative aspect-square bg-slate-100 flex items-center justify-center text-muted-light">
                  {c.before_image ? (
                    <NextImage src={c.before_image} alt={`${c.title} before`} fill className="object-cover" />
                  ) : <ImageIcon size={32} />}
                </div>
                <div className="relative aspect-square bg-slate-100 flex items-center justify-center text-muted-light">
                  {c.after_image ? (
                    <NextImage src={c.after_image} alt={`${c.title} after`} fill className="object-cover" />
                  ) : <ImageIcon size={32} />}
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-navy">{c.title}</h3>
                    {c.treatment_type && <p className="text-xs text-muted">{c.treatment_type}</p>}
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(c)}><Pencil size={14} /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(c.id)} className="text-red-400 hover:text-red-600"><Trash2 size={14} /></Button>
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  {c.is_featured && <Badge variant="success" className="text-[10px]">Featured</Badge>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
