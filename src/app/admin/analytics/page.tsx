"use client"

import { useState, useEffect } from "react"
import { getAnalyticsData } from "@/actions/admin"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts"
import { format, parseISO, startOfMonth, endOfMonth, eachMonthOfInterval, isWithinInterval } from "date-fns"

type Appointment = { created_at: string; status: string }
type Lead = { created_at: string; lead_status: string }

export default function AnalyticsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      const data = await getAnalyticsData()
      setAppointments(data.appointments as Appointment[])
      setLeads(data.leads as Lead[])
      setLoading(false)
    })()
  }, [])

  if (loading) return <p className="text-muted-light text-center py-8">Loading analytics...</p>

  // Appointment trends by month
  const now = new Date()
  const months = eachMonthOfInterval({ start: new Date(now.getFullYear(), now.getMonth() - 11, 1), end: now })

  const appointmentData = months.map(month => {
    const count = appointments.filter(a => {
      const d = parseISO(a.created_at)
      return isWithinInterval(d, { start: startOfMonth(month), end: endOfMonth(month) })
    }).length
    return { month: format(month, "MMM"), appointments: count }
  })

  // Leads per month
  const leadData = months.map(month => {
    const count = leads.filter(l => {
      const d = parseISO(l.created_at)
      return isWithinInterval(d, { start: startOfMonth(month), end: endOfMonth(month) })
    }).length
    return { month: format(month, "MMM"), leads: count }
  })

  // Appointment status breakdown
  const statusCounts = appointments.reduce<Record<string, number>>((acc, a) => {
    acc[a.status] = (acc[a.status] || 0) + 1
    return acc
  }, {})
  const pieData = Object.entries(statusCounts).map(([name, value]) => ({ name, value }))
  const COLORS = ["#0e6b70", "#b78b4b", "#a7dadc", "#ef4444", "#0b1220"]

  // Conversion rate
  const totalLeads = leads.length || 1
  const converted = leads.filter(l => l.lead_status === "converted").length
  const conversionRate = ((converted / totalLeads) * 100).toFixed(1)

  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold text-navy">Analytics</h1><p className="text-muted mt-1">Performance insights from real data</p></div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-3xl font-bold text-primary">{appointments.length}</p>
            <p className="text-sm text-muted mt-1">Total Appointments</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-3xl font-bold text-accent">{leads.length}</p>
            <p className="text-sm text-muted mt-1">Total Leads</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-3xl font-bold text-navy">{converted}</p>
            <p className="text-sm text-muted mt-1">Conversions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-3xl font-bold text-primary-hover">{conversionRate}%</p>
            <p className="text-sm text-muted mt-1">Conversion Rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointment Trends */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-navy mb-4">Appointment Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={appointmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#dce7ea" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="appointments" stroke="#0e6b70" strokeWidth={2} dot={{ fill: "#0e6b70" }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Leads Per Month */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-navy mb-4">Leads Per Month</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={leadData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#dce7ea" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="leads" fill="#b78b4b" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Status Breakdown */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-navy mb-4">Appointment Status Breakdown</h3>
            {pieData.length > 0 ? (
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <ResponsiveContainer width={300} height={250}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}>
                      {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2">
                  {pieData.map((d, i) => (
                    <div key={d.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                      <span className="text-sm text-muted capitalize">{d.name}: {d.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-muted-light text-center py-8">No appointment data available yet</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
