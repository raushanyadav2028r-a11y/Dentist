"use client"

import { useState, useEffect, useCallback } from "react"
import { getLeads, updateLeadStatus, deleteLead } from "@/actions/admin"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Trash2, Phone, Mail } from "lucide-react"

type Lead = {
  id: string
  full_name: string
  phone: string
  email: string | null
  service: string | null
  message: string | null
  lead_status: string
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
    fetchData()
  }

  const handleDelete = async (id: string) => {
    if (confirm("Delete this lead?")) {
      await deleteLead(id)
      fetchData()
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-navy">Leads</h1>
        <p className="text-muted mt-1">Manage contact inquiries & conversions</p>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-light" />
              <Input placeholder="Search leads..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]"><SelectValue placeholder="All Statuses" /></SelectTrigger>
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
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-surface-dim border-b border-border">
              <tr>
                <th className="text-left p-4 font-semibold text-muted">Name</th>
                <th className="text-left p-4 font-semibold text-muted">Contact</th>
                <th className="text-left p-4 font-semibold text-muted">Service</th>
                <th className="text-left p-4 font-semibold text-muted">Status</th>
                <th className="text-left p-4 font-semibold text-muted">Date</th>
                <th className="text-left p-4 font-semibold text-muted">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr><td colSpan={6} className="p-8 text-center text-muted-light">Loading...</td></tr>
              ) : leads.length === 0 ? (
                <tr><td colSpan={6} className="p-8 text-center text-muted-light">No leads found</td></tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-surface-dim">
                    <td className="p-4 font-medium text-navy">{lead.full_name}</td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-muted"><Phone size={12} /> {lead.phone}</div>
                        {lead.email && <div className="flex items-center gap-1 text-muted-light text-xs"><Mail size={12} /> {lead.email}</div>}
                      </div>
                    </td>
                    <td className="p-4 text-muted">{lead.service || "—"}</td>
                    <td className="p-4">
                      <Select value={lead.lead_status || "new"} onValueChange={(v) => handleStatusChange(lead.id, v)}>
                        <SelectTrigger className="w-[130px] h-8">
                          <Badge variant={statusColors[lead.lead_status || "new"] as "info" | "warning" | "success" | "destructive"} className="mr-2">{lead.lead_status || "new"}</Badge>
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
                    <td className="p-4 text-muted text-xs">{new Date(lead.created_at).toLocaleDateString()}</td>
                    <td className="p-4">
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(lead.id)} className="text-muted-light hover:text-red-500">
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
