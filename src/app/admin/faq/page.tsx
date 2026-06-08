"use client"

import { useState, useEffect, useCallback } from "react"
import { getFaqs, upsertFaq, deleteFaq } from "@/actions/admin"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Trash2, Loader2, Check } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

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
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

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

  useEffect(() => { void fetchData() }, [fetchData])

  const onSubmit = async (data: FaqFormData) => {
    setSaving(true)
    const result = await upsertFaq({ ...data, id: editId || undefined })
    setSaving(false)
    if (result.error) { alert(result.error); return }
    setOpen(false)
    reset(emptyForm)
    setEditId(null)
    setSuccessMsg(editId ? "FAQ updated" : "FAQ added")
    setTimeout(() => setSuccessMsg(null), 2000)
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
    fetchData()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-navy">FAQ</h1>
          <p className="text-muted mt-1">Manage frequently asked questions</p>
        </div>
        <div className="flex items-center gap-3">
          {successMsg && (
            <span className="flex items-center gap-1 text-sm text-green-600 font-medium">
              <Check size={16} /> {successMsg}
            </span>
          )}
          <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) { reset(emptyForm); setEditId(null) } }}>
            <DialogTrigger asChild>
              <Button onClick={() => { reset(emptyForm); setEditId(null) }}>
                <Plus size={16} className="mr-2" /> Add FAQ
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>{editId ? "Edit FAQ" : "Add FAQ"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="faq-question">Question *</Label>
                  <Input id="faq-question" {...register("question")} placeholder="e.g. Do you offer emergency appointments?" />
                  {errors.question && <p className="text-red-500 text-xs mt-1">{errors.question.message}</p>}
                </div>
                <div>
                  <Label htmlFor="faq-answer">Answer *</Label>
                  <Textarea id="faq-answer" {...register("answer")} rows={4} placeholder="Detailed answer..." />
                  {errors.answer && <p className="text-red-500 text-xs mt-1">{errors.answer.message}</p>}
                </div>
                <div>
                  <Label htmlFor="faq-category">Category</Label>
                  <Input id="faq-category" {...register("category")} placeholder="e.g. General, Billing, Treatment" />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="faq-active" defaultChecked {...register("is_active")} className="rounded" />
                  <Label htmlFor="faq-active">Active</Label>
                </div>
                <Button type="submit" className="w-full" disabled={saving}>
                  {saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : editId ? "Update FAQ" : "Add FAQ"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {loading ? (
        <p className="text-muted-light text-center py-8">Loading FAQs...</p>
      ) : faqs.length === 0 ? (
        <Card><CardContent className="p-8 text-center text-muted-light">No FAQs yet. Add your first one!</CardContent></Card>
      ) : (
        <div className="space-y-3">
          {faqs.map((faq) => (
            <Card key={faq.id}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-navy text-sm">{faq.question}</h3>
                      <Badge variant={faq.is_active ? "success" : "secondary"} className="text-[10px]">
                        {faq.is_active ? "Active" : "Inactive"}
                      </Badge>
                      {faq.category && <Badge variant="outline" className="text-[10px]">{faq.category}</Badge>}
                    </div>
                    <p className="text-muted text-sm line-clamp-2">{faq.answer}</p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(faq)}><Pencil size={14} /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(faq.id)} className="text-red-400 hover:text-red-600"><Trash2 size={14} /></Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
