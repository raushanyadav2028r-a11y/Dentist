"use client"

import { useState, useEffect, useCallback } from "react"
import { getAppointments, updateAppointmentStatus, deleteAppointment } from "@/actions/admin"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Trash2, Calendar, Download } from "lucide-react"
import { useToast } from "@/components/admin/AdminToast"

type Appointment = {
  id: string
  full_name: string
  phone: string
  email: string | null
  service: string | null
  preferred_date: string | null
  preferred_time: string | null
  message: string | null
  status: string
  created_at: string
}

const statusColors: Record<string, string> = {
  pending: "warning",
  confirmed: "info",
  completed: "success",
  cancelled: "destructive",
  no_show: "secondary",
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [loading, setLoading] = useState(true)
  const { showToast } = useToast()

  const fetchData = useCallback(async () => {
    setLoading(true)
    const { data } = await getAppointments(search || undefined, statusFilter)
    setAppointments((data as Appointment[]) || [])
    setLoading(false)
  }, [search, statusFilter])

  useEffect(() => {
    const timer = window.setTimeout(() => { void fetchData() }, 0)
    return () => window.clearTimeout(timer)
  }, [fetchData])

  const handleStatusChange = async (id: string, status: string) => {
    await updateAppointmentStatus(id, status)
    showToast("Status updated ✓", "success")
    fetchData()
  }

  const handleDelete = async (id: string) => {
    if (confirm("Delete this appointment?")) {
      await deleteAppointment(id)
      showToast("Appointment deleted", "success")
      fetchData()
    }
  }

  const exportCSV = () => {
    const headers = ["Name", "Phone", "Email", "Service", "Date", "Time", "Status", "Message", "Created"]
    const rows = appointments.map(a => [
      a.full_name, a.phone, a.email || "", a.service || "",
      a.preferred_date || "", a.preferred_time || "", a.status,
      (a.message || "").replace(/"/g, '""'), a.created_at,
    ])
    const csv = [headers.join(","), ...rows.map(r => r.map(c => `"${c}"`).join(","))].join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url; a.download = `appointments-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
    showToast("CSV exported ✓", "success")
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#111827", margin: 0 }}>Appointments</h1>
          <p style={{ color: "#6b7280", marginTop: "4px", fontSize: "14px" }}>Manage patient bookings</p>
        </div>
        <Button variant="outline" size="sm" onClick={exportCSV} disabled={appointments.length === 0}>
          <Download size={14} className="mr-2" /> Export CSV
        </Button>
      </div>

      <div style={{ background: "white", borderRadius: "12px", border: "1px solid #f0f0f0", padding: "16px" }}>
        <div style={{ display: "flex", gap: "12px", flexDirection: "row" }} className="appointments-filters">
          <div style={{ position: "relative", flex: 1 }}>
            <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
            <Input
              placeholder="Search by name, phone, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: "36px" }}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger style={{ width: "160px" }}>
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div style={{ background: "white", borderRadius: "12px", border: "1px solid #f0f0f0", overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", fontSize: "13px", borderCollapse: "collapse" }}>
            <thead style={{ background: "#f8fafc", borderBottom: "1px solid #e5e7eb" }}>
              <tr>
                <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: "600", color: "#6b7280", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Patient</th>
                <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: "600", color: "#6b7280", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Service</th>
                <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: "600", color: "#6b7280", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Date & Time</th>
                <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: "600", color: "#6b7280", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Status</th>
                <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: "600", color: "#6b7280", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Actions</th>
              </tr>
            </thead>
            <tbody style={{ borderTop: "1px solid #e5e7eb" }}>
              {loading ? (
                <tr><td colSpan={5} style={{ padding: "32px", textAlign: "center", color: "#9ca3af" }}>Loading...</td></tr>
              ) : appointments.length === 0 ? (
                <tr><td colSpan={5} style={{ padding: "32px", textAlign: "center", color: "#9ca3af" }}>No appointments found</td></tr>
              ) : (
                appointments.map((apt) => (
                  <tr key={apt.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                    <td style={{ padding: "12px 16px" }}>
                      <div>
                        <p style={{ fontWeight: "500", color: "#111827", margin: 0 }}>{apt.full_name}</p>
                        <p style={{ fontSize: "12px", color: "#6b7280", margin: "2px 0 0" }}>{apt.phone}</p>
                        {apt.email && <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0 }}>{apt.email}</p>}
                      </div>
                    </td>
                    <td style={{ padding: "12px 16px", color: "#6b7280" }}>{apt.service || "—"}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#6b7280" }}>
                        <Calendar size={14} style={{ color: "#9ca3af" }} />
                        <span>{apt.preferred_date || "—"}</span>
                        {apt.preferred_time && <span style={{ color: "#9ca3af" }}>· {apt.preferred_time}</span>}
                      </div>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <Select value={apt.status} onValueChange={(v) => handleStatusChange(apt.id, v)}>
                        <SelectTrigger style={{ width: "130px", height: "32px" }}>
                          <Badge variant={statusColors[apt.status] as "warning" | "info" | "success" | "destructive" | "secondary"} style={{ marginRight: "8px" }}>
                            {apt.status}
                          </Badge>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                          <SelectItem value="no_show">No Show</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(apt.id)} style={{ color: "#9ca3af" }}>
                        <Trash2 size={16} />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .appointments-filters {
            flex-direction: column !important;
          }
          .appointments-filters > div:first-child {
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  )
}
