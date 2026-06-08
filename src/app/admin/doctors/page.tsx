"use client"

import { useState, useEffect, useCallback } from "react"
import { getSpecialists, upsertSpecialist, deleteSpecialist } from "@/actions/admin"
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

const doctorSchema = z.object({
  name: z.string().min(2, "Name is required"),
  role: z.string().min(2, "Role is required"),
  education: z.string().optional(),
  experience: z.string().optional(),
  bio: z.string().optional(),
  image_src: z.string().optional(),
  specialties: z.string().optional(),
  languages: z.string().optional(),
  clinic_days: z.string().optional(),
  gender: z.string().optional(),
  is_active: z.boolean().optional(),
})

type DoctorFormData = z.infer<typeof doctorSchema>
type Doctor = { id: string; name: string; role: string | null; education: string | null; experience: string | null; bio: string | null; image_src: string | null; specialties: string[]; languages: string | null; clinic_days: string | null; gender: string | null; is_active: boolean }

const emptyForm: DoctorFormData = { name: "", role: "", education: "", experience: "", bio: "", image_src: "", specialties: "", languages: "", clinic_days: "", gender: "male", is_active: true }

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<DoctorFormData>({
    resolver: zodResolver(doctorSchema),
    defaultValues: emptyForm,
  })

  const fetchData = useCallback(async () => {
    setLoading(true)
    const { data } = await getSpecialists()
    setDoctors((data as Doctor[]) || [])
    setLoading(false)
  }, [])

  useEffect(() => { void fetchData() }, [fetchData])

  const onSubmit = async (data: DoctorFormData) => {
    setSaving(true)
    const result = await upsertSpecialist({
      ...data,
      id: editId || undefined,
      specialties: (data.specialties || "").split(",").map(s => s.trim()).filter(Boolean),
      gender: (data.gender as "male" | "female" | "other") || undefined,
    })
    setSaving(false)
    if (result.error) { alert(result.error); return }
    setOpen(false)
    reset(emptyForm)
    setEditId(null)
    setSuccessMsg(editId ? "Doctor updated" : "Doctor added")
    setTimeout(() => setSuccessMsg(null), 2000)
    fetchData()
  }

  const handleEdit = (doc: Doctor) => {
    setEditId(doc.id)
    reset({
      name: doc.name, role: doc.role || "", education: doc.education || "",
      experience: doc.experience || "", bio: doc.bio || "", image_src: doc.image_src || "",
      specialties: (doc.specialties || []).join(", "), languages: doc.languages || "",
      clinic_days: doc.clinic_days || "", gender: doc.gender || "male", is_active: doc.is_active,
    })
    setOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this doctor?")) return
    await deleteSpecialist(id)
    fetchData()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-navy">Doctors</h1>
          <p className="text-muted mt-1">Manage specialist profiles</p>
        </div>
        <div className="flex items-center gap-3">
          {successMsg && <span className="flex items-center gap-1 text-sm text-green-600 font-medium"><Check size={16} /> {successMsg}</span>}
          <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) { reset(emptyForm); setEditId(null) } }}>
            <DialogTrigger asChild>
              <Button onClick={() => { reset(emptyForm); setEditId(null) }}><Plus size={16} className="mr-2" /> Add Doctor</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
              <DialogHeader><DialogTitle>{editId ? "Edit Doctor" : "Add Doctor"}</DialogTitle></DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Name *</Label>
                    <Input {...register("name")} placeholder="Dr. Jane Smith" />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <Label>Role *</Label>
                    <Input {...register("role")} placeholder="Lead Orthodontist" />
                    {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Education</Label><Input {...register("education")} placeholder="BDS, MDS" /></div>
                  <div><Label>Experience</Label><Input {...register("experience")} placeholder="14 years" /></div>
                </div>
                <div><Label>Short Bio</Label><Textarea {...register("bio")} rows={3} placeholder="Brief professional summary..." /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Photo URL</Label><Input {...register("image_src")} placeholder="/stitch_male_doctor.png" /></div>
                  <div><Label>Specialties (comma-separated)</Label><Input {...register("specialties")} placeholder="Invisalign, Braces" /></div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div><Label>Languages</Label><Input {...register("languages")} placeholder="English, Hindi" /></div>
                  <div><Label>Clinic Days</Label><Input {...register("clinic_days")} placeholder="Mon, Wed, Fri" /></div>
                  <div>
                    <Label>Gender</Label>
                    <select {...register("gender")} className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm">
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="doc-active" defaultChecked {...register("is_active")} className="rounded" />
                  <Label htmlFor="doc-active">Active (visible on website)</Label>
                </div>
                <Button type="submit" className="w-full" disabled={saving}>
                  {saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : editId ? "Update Doctor" : "Add Doctor"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {loading ? (
        <p className="text-muted-light text-center py-8">Loading doctors...</p>
      ) : doctors.length === 0 ? (
        <Card><CardContent className="p-8 text-center text-muted-light">No doctors yet. Add your first one!</CardContent></Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {doctors.map((doc) => (
            <Card key={doc.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {doc.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy">{doc.name}</h3>
                      <p className="text-sm text-muted">{doc.role}</p>
                      <Badge variant={doc.is_active ? "success" : "secondary"} className="text-[10px] mt-1">
                        {doc.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(doc)}><Pencil size={14} /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(doc.id)} className="text-red-400 hover:text-red-600"><Trash2 size={14} /></Button>
                  </div>
                </div>
                {doc.bio && <p className="text-sm text-muted mt-3 line-clamp-2">{doc.bio}</p>}
                {doc.experience && <p className="text-xs text-muted-light mt-2">{doc.experience} experience</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
