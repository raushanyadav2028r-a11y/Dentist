"use client"

import { useState, useEffect, useCallback, useTransition } from "react"
import { getSpecialists, upsertSpecialist, deleteSpecialist } from "@/actions/admin"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useToast } from "@/components/admin/AdminToast"

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
  const { showToast } = useToast()

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

  const [, startTransition] = useTransition()
  useEffect(() => { startTransition(() => { void fetchData() }) }, [fetchData, startTransition])

  const onSubmit = async (data: DoctorFormData) => {
    setSaving(true)
    const result = await upsertSpecialist({
      ...data,
      id: editId || undefined,
      specialties: (data.specialties || "").split(",").map(s => s.trim()).filter(Boolean),
      gender: (data.gender as "male" | "female" | "other") || undefined,
    })
    setSaving(false)
    if (result.error) { showToast("Failed to save. Try again.", "error"); return }
    setOpen(false)
    reset(emptyForm)
    setEditId(null)
    showToast(editId ? "Doctor updated ✓" : "Doctor added ✓", "success")
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
    showToast("Doctor deleted", "success")
    fetchData()
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#111827", margin: 0 }}>Doctors</h1>
          <p style={{ color: "#6b7280", marginTop: "4px", fontSize: "14px" }}>Manage specialist profiles</p>
        </div>
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) { reset(emptyForm); setEditId(null) } }}>
          <DialogTrigger asChild>
            <Button onClick={() => { reset(emptyForm); setEditId(null) }}><Plus size={16} className="mr-2" /> Add Doctor</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{editId ? "Edit Doctor" : "Add Doctor"}</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <Label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "6px", display: "block" }}>Name *</Label>
                  <Input {...register("name")} placeholder="Dr. Jane Smith" />
                  {errors.name && <p style={{ color: "#dc2626", fontSize: "12px", marginTop: "4px" }}>{errors.name.message}</p>}
                </div>
                <div>
                  <Label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "6px", display: "block" }}>Role *</Label>
                  <Input {...register("role")} placeholder="Lead Orthodontist" />
                  {errors.role && <p style={{ color: "#dc2626", fontSize: "12px", marginTop: "4px" }}>{errors.role.message}</p>}
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <Label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "6px", display: "block" }}>Education</Label>
                  <Input {...register("education")} placeholder="BDS, MDS" />
                </div>
                <div>
                  <Label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "6px", display: "block" }}>Experience</Label>
                  <Input {...register("experience")} placeholder="e.g. 14 years or 2010" />
                </div>
              </div>
              <div>
                <Label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "6px", display: "block" }}>Short Bio</Label>
                <Textarea {...register("bio")} rows={3} placeholder="Brief professional summary..." />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <Label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "6px", display: "block" }}>Photo URL</Label>
                  <Input {...register("image_src")} placeholder="/stitch_male_doctor.webp" />
                  <p style={{ fontSize: "11px", color: "#9ca3af", marginTop: "4px" }}>Upload image to /public/ folder, then use path like /your-image.webp</p>
                </div>
                <div>
                  <Label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "6px", display: "block" }}>Specialties (comma-sep)</Label>
                  <Input {...register("specialties")} placeholder="Invisalign, Braces" />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                <div>
                  <Label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "6px", display: "block" }}>Languages</Label>
                  <Input {...register("languages")} placeholder="English, Hindi" />
                </div>
                <div>
                  <Label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "6px", display: "block" }}>Clinic Days</Label>
                  <Input {...register("clinic_days")} placeholder="Mon, Wed, Fri" />
                </div>
                <div>
                  <Label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "6px", display: "block" }}>Gender</Label>
                  <select {...register("gender")} style={{ width: "100%", padding: "10px 14px", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "14px", color: "#111827", background: "#ffffff", outline: "none" }}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <input type="checkbox" id="doc-active" defaultChecked {...register("is_active")} style={{ borderRadius: "4px" }} />
                <Label htmlFor="doc-active" style={{ fontSize: "13px", fontWeight: "500", color: "#374151" }}>Active (visible on website)</Label>
              </div>
              <button type="submit" disabled={saving} style={{ width: "100%", background: "#0d9488", color: "white", padding: "10px 24px", borderRadius: "8px", fontSize: "14px", fontWeight: "600", border: "none", cursor: saving ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                {saving ? <><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> Saving...</> : editId ? "Update Doctor" : "Add Doctor"}
              </button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <p style={{ color: "#9ca3af", textAlign: "center", padding: "32px 0" }}>Loading doctors...</p>
      ) : doctors.length === 0 ? (
        <div style={{ background: "white", borderRadius: "12px", border: "1px solid #f0f0f0", padding: "32px", textAlign: "center", color: "#9ca3af" }}>No doctors yet. Add your first one!</div>
      ) : (
        <div className="admin-doctors-grid">
          {doctors.map((doc) => (
            <div key={doc.id} style={{ background: "white", borderRadius: "12px", border: "1px solid #f0f0f0", padding: "20px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "rgba(13,148,136,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", color: "#0d9488", fontSize: "16px", flexShrink: 0 }}>
                    {doc.name.charAt(0)}
                  </div>
                  <div>
                    <h3 style={{ fontWeight: "600", color: "#111827", fontSize: "14px", margin: 0 }}>{doc.name}</h3>
                    <p style={{ color: "#6b7280", fontSize: "12px", margin: "2px 0 0" }}>{doc.role}</p>
                    <Badge variant={doc.is_active ? "success" : "secondary"} style={{ fontSize: "10px", marginTop: "4px" }}>
                      {doc.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "4px" }}>
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(doc)}><Pencil size={14} /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(doc.id)} style={{ color: "#f87171" }}><Trash2 size={14} /></Button>
                </div>
              </div>
              {doc.bio && <p style={{ color: "#6b7280", fontSize: "12px", marginTop: "12px", lineClamp: 2, overflow: "hidden", textOverflow: "ellipsis" }}>{doc.bio}</p>}
              {doc.experience && <p style={{ color: "#9ca3af", fontSize: "11px", marginTop: "8px" }}>{doc.experience} experience</p>}
            </div>
          ))}
        </div>
      )}

      <style>{`
        .admin-doctors-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 16px;
        }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .admin-doctors-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
