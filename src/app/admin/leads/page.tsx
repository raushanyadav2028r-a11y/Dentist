"use client"

import { useState, useEffect, useCallback } from "react"
import { getLeads, updateLeadStatus, deleteLead, updateLeadNotes } from "@/actions/admin"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Trash2, Phone, Mail, FileText } from "lucide-react"
import { useToast } from "@/components/admin/AdminToast"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

type Lead = {
  id: string
  full_name: string
  phone: string
  email: string | null
  service: string | null
  message: string | null
  lead_status: string
  notes: string | null
  created_at: string
}

const statusColors: Record<string, string> = {
  new: "info",
  contacted: "warning",
  qualified: "success",
  converted: "success",
  lost: "destructive",
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [loading, setLoading] = useState(true)
  const { showToast } = useToast()
  const [notesOpen, setNotesOpen] = useState(false)
  const [notesLead, setNotesLead] = useState<Lead | null>(null)
  const [notesText, setNotesText] = useState("")
  const [savingNotes, setSavingNotes] = useState(false)

  const fetchData = useCallback(async () => {
    setLoading(true)
    const { data } = await getLeads(search || undefined, statusFilter)
    setLeads((data as Lead[]) || [])
    setLoading(false)
  }, [search, statusFilter])

  useEffect(() => {
    const timer = window.setTimeout(() => { void fetchData() }, 0)
    return () => window.clearTimeout(timer)
  }, [fetchData])

  const handleStatusChange = async (id: string, lead_status: string) => {
    await updateLeadStatus(id, lead_status)
    showToast("Status updated ✓", "success")
    fetchData()
  }

  const handleDelete = async (id: string) => {
    if (confirm("Delete this lead?")) {
      await deleteLead(id)
      showToast("Lead deleted", "success")
      fetchData()
    }
  }

  const openNotes = (lead: Lead) => {
    setNotesLead(lead)
    setNotesText(lead.notes || "")
    setNotesOpen(true)
  }

  const saveNotes = async () => {
    if (!notesLead) return
    setSavingNotes(true)
    const result = await updateLeadNotes(notesLead.id, notesText)
    setSavingNotes(false)
    if (result.error) {
      showToast("Failed to save notes", "error")
    } else {
      showToast("Notes saved ✓", "success")
      setNotesOpen(false)
      fetchData()
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#111827", margin: 0 }}>Leads</h1>
        <p style={{ color: "#6b7280", marginTop: "4px", fontSize: "14px" }}>Manage contact inquiries & conversions</p>
      </div>

      <div style={{ background: "white", borderRadius: "12px", border: "1px solid #f0f0f0", padding: "16px" }}>
        <div style={{ display: "flex", gap: "12px", flexDirection: "row" }} className="leads-filters">
          <div style={{ position: "relative", flex: 1 }}>
            <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
            <Input placeholder="Search leads..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ paddingLeft: "36px" }} />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger style={{ width: "160px" }}><SelectValue placeholder="All Statuses" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="qualified">Qualified</SelectItem>
              <SelectItem value="converted">Converted</SelectItem>
              <SelectItem value="lost">Lost</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div style={{ background: "white", borderRadius: "12px", border: "1px solid #f0f0f0", overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", fontSize: "13px", borderCollapse: "collapse" }}>
            <thead style={{ background: "#f8fafc", borderBottom: "1px solid #e5e7eb" }}>
              <tr>
                <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: "600", color: "#6b7280", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Name</th>
                <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: "600", color: "#6b7280", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Contact</th>
                <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: "600", color: "#6b7280", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Service</th>
                <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: "600", color: "#6b7280", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Status</th>
                <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: "600", color: "#6b7280", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Date</th>
                <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: "600", color: "#6b7280", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Actions</th>
              </tr>
            </thead>
            <tbody style={{ borderTop: "1px solid #e5e7eb" }}>
              {loading ? (
                <tr><td colSpan={6} style={{ padding: "32px", textAlign: "center", color: "#9ca3af" }}>Loading...</td></tr>
              ) : leads.length === 0 ? (
                <tr><td colSpan={6} style={{ padding: "32px", textAlign: "center", color: "#9ca3af" }}>No leads found</td></tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                    <td style={{ padding: "12px 16px", fontWeight: "500", color: "#111827" }}>{lead.full_name}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#6b7280", fontSize: "12px" }}><Phone size={12} /> {lead.phone}</div>
                        {lead.email && <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#9ca3af", fontSize: "11px", marginTop: "2px" }}><Mail size={11} /> {lead.email}</div>}
                      </div>
                    </td>
                    <td style={{ padding: "12px 16px", color: "#6b7280" }}>{lead.service || "—"}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <Select value={lead.lead_status || "new"} onValueChange={(v) => handleStatusChange(lead.id, v)}>
                        <SelectTrigger style={{ width: "130px", height: "32px" }}>
                          <Badge variant={statusColors[lead.lead_status || "new"] as "info" | "warning" | "success" | "destructive"} style={{ marginRight: "8px" }}>{lead.lead_status || "new"}</Badge>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="contacted">Contacted</SelectItem>
                          <SelectItem value="qualified">Qualified</SelectItem>
                          <SelectItem value="converted">Converted</SelectItem>
                          <SelectItem value="lost">Lost</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td style={{ padding: "12px 16px", color: "#6b7280", fontSize: "12px" }}>{new Date(lead.created_at).toLocaleDateString()}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", gap: "4px" }}>
                        <Button variant="ghost" size="icon" onClick={() => openNotes(lead)} title="Add notes">
                          <FileText size={14} />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(lead.id)} style={{ color: "#9ca3af" }}>
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={notesOpen} onOpenChange={setNotesOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Notes for {notesLead?.full_name}</DialogTitle></DialogHeader>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <Label style={{ fontSize: "13px", fontWeight: "500", color: "#374151" }}>Internal Notes</Label>
            <Textarea rows={4} value={notesText} onChange={(e) => setNotesText(e.target.value)} placeholder="Add internal notes about this lead..." />
            <Button onClick={saveNotes} disabled={savingNotes} style={{ background: "#0d9488", color: "white", padding: "10px 24px", borderRadius: "8px", fontSize: "14px", fontWeight: "600", border: "none", cursor: "pointer" }}>
              {savingNotes ? "Saving..." : "Save Notes"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <style>{`
        @media (max-width: 768px) {
          .leads-filters { flex-direction: column !important; }
        }
      `}</style>
    </div>
  )
}
