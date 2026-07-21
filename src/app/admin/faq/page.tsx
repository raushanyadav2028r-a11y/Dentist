"use client"

import { useState, useEffect, useCallback, useTransition } from "react"
import { getFaqs, upsertFaq, deleteFaq } from "@/actions/admin"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Trash2, Loader2, GripVertical } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useToast } from "@/components/admin/AdminToast"

const faqSchema = z.object({
  question: z.string().min(3, "Question must be at least 3 characters"),
  answer: z.string().min(10, "Answer must be at least 10 characters"),
  category: z.string().optional(),
  is_active: z.boolean().optional(),
})

type FaqFormData = z.infer<typeof faqSchema>
type Faq = { id: string; question: string; answer: string; category: string | null; is_active: boolean }

const emptyForm: FaqFormData = { question: "", answer: "", category: "", is_active: true }

export default function FaqPage() {
  const [faqs, setFaqs] = useState<Faq[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const { showToast } = useToast()

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FaqFormData>({
    resolver: zodResolver(faqSchema),
    defaultValues: emptyForm,
  })

  const fetchData = useCallback(async () => {
    setLoading(true)
    const { data } = await getFaqs()
    setFaqs((data as Faq[]) || [])
    setLoading(false)
  }, [])

  const [, startTransition] = useTransition()
  useEffect(() => { startTransition(() => { void fetchData() }) }, [fetchData, startTransition])

  const onSubmit = async (data: FaqFormData) => {
    setSaving(true)
    const result = await upsertFaq({ ...data, id: editId || undefined })
    setSaving(false)
    if (result.error) { showToast("Failed to save. Try again.", "error"); return }
    setOpen(false)
    reset(emptyForm)
    setEditId(null)
    showToast(editId ? "FAQ updated successfully ✓" : "FAQ added successfully ✓", "success")
    fetchData()
  }

  const handleEdit = (faq: Faq) => {
    setEditId(faq.id)
    reset({ question: faq.question, answer: faq.answer, category: faq.category || "", is_active: faq.is_active })
    setOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this FAQ?")) return
    await deleteFaq(id)
    showToast("FAQ deleted", "success")
    fetchData()
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#111827", margin: 0 }}>FAQ</h1>
          <p style={{ color: "#6b7280", marginTop: "4px", fontSize: "14px" }}>Manage frequently asked questions</p>
        </div>
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) { reset(emptyForm); setEditId(null) } }}>
          <DialogTrigger asChild>
            <Button onClick={() => { reset(emptyForm); setEditId(null) }}><Plus size={16} className="mr-2" /> Add FAQ</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>{editId ? "Edit FAQ" : "Add FAQ"}</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <Label htmlFor="faq-question" style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "6px", display: "block" }}>Question *</Label>
                <Input id="faq-question" {...register("question")} placeholder="e.g. Do you offer emergency appointments?" />
                {errors.question && <p style={{ color: "#dc2626", fontSize: "12px", marginTop: "4px" }}>{errors.question.message}</p>}
              </div>
              <div>
                <Label htmlFor="faq-answer" style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "6px", display: "block" }}>Answer *</Label>
                <Textarea id="faq-answer" {...register("answer")} rows={4} placeholder="Detailed answer..." />
                {errors.answer && <p style={{ color: "#dc2626", fontSize: "12px", marginTop: "4px" }}>{errors.answer.message}</p>}
              </div>
              <div>
                <Label htmlFor="faq-category" style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "6px", display: "block" }}>Category</Label>
                <Input id="faq-category" {...register("category")} placeholder="e.g. General, Billing, Treatment" />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <input type="checkbox" id="faq-active" defaultChecked {...register("is_active")} style={{ borderRadius: "4px" }} />
                <Label htmlFor="faq-active" style={{ fontSize: "13px", fontWeight: "500", color: "#374151" }}>Active (visible on website)</Label>
              </div>
              <Button type="submit" disabled={saving} style={{ width: "100%", background: "#0d9488", color: "white", padding: "10px 24px", borderRadius: "8px", fontSize: "14px", fontWeight: "600", border: "none", cursor: saving ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                {saving ? <><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> Saving...</> : editId ? "Update FAQ" : "Add FAQ"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <p style={{ color: "#9ca3af", textAlign: "center", padding: "32px 0" }}>Loading FAQs...</p>
      ) : faqs.length === 0 ? (
        <div style={{ background: "white", borderRadius: "12px", border: "1px solid #f0f0f0", padding: "32px", textAlign: "center", color: "#9ca3af" }}>No FAQs yet. Add your first one!</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {faqs.map((faq) => (
            <div key={faq.id} style={{ background: "white", borderRadius: "12px", border: "1px solid #f0f0f0", padding: "20px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                    <GripVertical size={14} style={{ color: "#d1d5db", cursor: "grab", flexShrink: 0 }} />
                    <h3 style={{ fontWeight: "600", color: "#111827", fontSize: "14px", margin: 0 }}>{faq.question}</h3>
                    <Badge variant={faq.is_active ? "success" : "secondary"} style={{ fontSize: "10px" }}>
                      {faq.is_active ? "Active" : "Inactive"}
                    </Badge>
                    {faq.category && <Badge variant="outline" style={{ fontSize: "10px" }}>{faq.category}</Badge>}
                  </div>
                  <p style={{ color: "#6b7280", fontSize: "13px", margin: "8px 0 0", lineHeight: "1.5" }}>{faq.answer}</p>
                </div>
                <div style={{ display: "flex", gap: "4px", flexShrink: 0 }}>
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(faq)}><Pencil size={14} /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(faq.id)} style={{ color: "#f87171" }}><Trash2 size={14} /></Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
