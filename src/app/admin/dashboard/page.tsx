import { getDashboardStats } from "@/actions/admin"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Users, Stethoscope, Sparkles, Star, TrendingUp } from "lucide-react"
import Link from "next/link"

const kpiConfig = [
  { key: "appointments", label: "Total Appointments", icon: Calendar, color: "bg-primary", href: "/admin/appointments" },
  { key: "leads", label: "Total Leads", icon: Users, color: "bg-accent", href: "/admin/leads" },
  { key: "doctors", label: "Total Doctors", icon: Stethoscope, color: "bg-navy", href: "/admin/doctors" },
  { key: "services", label: "Total Services", icon: Sparkles, color: "bg-sky-blue", href: "/admin/services" },
  { key: "testimonials", label: "Total Testimonials", icon: Star, color: "bg-primary/80", href: "/admin/testimonials" },
] as const

export default async function DashboardPage() {
  const stats = await getDashboardStats()

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-navy">Dashboard</h1>
        <p className="text-muted mt-1">Overview of your dental clinic</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpiConfig.map((kpi) => {
          const value = stats[kpi.key]
          const Icon = kpi.icon
          return (
            <Link key={kpi.key} href={kpi.href}>
              <Card className="premium-card-hover cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted font-medium">{kpi.label}</p>
                      <p className="text-3xl font-bold text-navy mt-2">{value}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-xl ${kpi.color} flex items-center justify-center`}>
                      <Icon size={20} className="text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Quick Links */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-navy mb-4 flex items-center gap-2">
            <TrendingUp size={20} className="text-primary" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link href="/admin/appointments" className="p-4 rounded-xl bg-surface-card hover:bg-border transition-colors">
              <p className="font-medium text-primary">View Appointments</p>
              <p className="text-sm text-muted mt-1">Manage patient bookings</p>
            </Link>
            <Link href="/admin/leads" className="p-4 rounded-xl bg-surface-card hover:bg-border transition-colors">
              <p className="font-medium text-accent">Manage Leads</p>
              <p className="text-sm text-muted mt-1">Track inquiries & conversions</p>
            </Link>
            <Link href="/admin/analytics" className="p-4 rounded-xl bg-surface-card hover:bg-border transition-colors">
              <p className="font-medium text-navy">View Analytics</p>
              <p className="text-sm text-muted mt-1">Charts & performance data</p>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
