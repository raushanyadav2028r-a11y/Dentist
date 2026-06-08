"use client"

import { useState, useEffect, useCallback } from "react"
import { getAppointments, updateAppointmentStatus, deleteAppointment } from "@/actions/admin"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Trash2, Calendar } from "lucide-react"

type Appointment = {
  id: string
  full_name: string
  phone: string
  email: string | null
  service: string | null
  selected_treatment: string | null
  preferred_date: string | null
  preferred_time: string | null
  message: string | null
  status: string
  created_at: string
  estimated_cost: string | null
  estimated_duration: string | null
  source: string | null
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
    fetchData()
  }

  const handleDelete = async (id: string) => {
    if (confirm("Delete this appointment?")) {
      await deleteAppointment(id)
      fetchData()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-navy">Appointments</h1>
          <p className="text-muted mt-1">Manage patient bookings</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-light" />
              <Input
                placeholder="Search by name, phone, email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
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
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-surface-dim border-b border-border">
              <tr>
                <th className="text-left p-4 font-semibold text-muted">Patient</th>
                <th className="text-left p-4 font-semibold text-muted">Treatment</th>
                <th className="text-left p-4 font-semibold text-muted">Est. Cost</th>
                <th className="text-left p-4 font-semibold text-muted">Date & Time</th>
                <th className="text-left p-4 font-semibold text-muted">Status</th>
                <th className="text-left p-4 font-semibold text-muted">Source</th>
                <th className="text-left p-4 font-semibold text-muted">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr><td colSpan={7} className="p-8 text-center text-muted-light">Loading...</td></tr>
              ) : appointments.length === 0 ? (
                <tr><td colSpan={7} className="p-8 text-center text-muted-light">No appointments found</td></tr>
              ) : (
                appointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-surface-dim">
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-navy">{apt.full_name}</p>
                        <p className="text-xs text-muted">{apt.phone}</p>
                        {apt.email && <p className="text-xs text-muted-light">{apt.email}</p>}
                      </div>
                    </td>
                    <td className="p-4 text-muted">{apt.service || "—"}</td>
                    <td className="p-4">
                      {apt.estimated_cost ? (
                        <span className="text-sm font-semibold text-primary">{apt.estimated_cost}</span>
                      ) : (
                        <span className="text-muted-light">—</span>
                      )}
                      {apt.estimated_duration && (
                        <p className="text-[10px] text-muted-light mt-0.5">{apt.estimated_duration}</p>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-muted">
                        <Calendar size={14} className="text-muted-light" />
                        <span>{apt.preferred_date || "—"}</span>
                        {apt.preferred_time && <span className="text-muted-light">· {apt.preferred_time}</span>}
                      </div>
                    </td>
                    <td className="p-4">
                      <Select value={apt.status} onValueChange={(v) => handleStatusChange(apt.id, v)}>
                        <SelectTrigger className="w-[130px] h-8">
                          <Badge variant={statusColors[apt.status] as "warning" | "info" | "success" | "destructive" | "secondary"} className="mr-2">
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
                    <td className="p-4">
                      <Badge variant="secondary" className="text-[10px]">Website</Badge>
                    </td>
                    <td className="p-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(apt.id)}
                        className="text-muted-light hover:text-red-500"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
