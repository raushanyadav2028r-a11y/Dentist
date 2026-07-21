import { getDashboardStats } from "@/actions/admin"
import { Calendar, Users, Stethoscope, Sparkles, Star, TrendingUp } from "lucide-react"
import Link from "next/link"

const kpiConfig = [
  { key: "appointments", label: "Total Appointments", icon: Calendar, color: "bg-[#0d9488]", href: "/admin/appointments" },
  { key: "leads", label: "Total Leads", icon: Users, color: "bg-[#b78b4b]", href: "/admin/leads" },
  { key: "doctors", label: "Total Doctors", icon: Stethoscope, color: "bg-[#0b1220]", href: "/admin/doctors" },
  { key: "services", label: "Total Services", icon: Sparkles, color: "bg-[#0e6b70]", href: "/admin/services" },
  { key: "testimonials", label: "Total Testimonials", icon: Star, color: "bg-[#0d9488]", href: "/admin/testimonials" },
] as const

export default async function DashboardPage() {
  const stats = await getDashboardStats()

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <div>
        <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#111827", margin: 0 }}>Dashboard</h1>
        <p style={{ color: "#6b7280", marginTop: "4px", fontSize: "14px" }}>Overview of your dental clinic</p>
      </div>

      <div className="dashboard-stats-grid">
        {kpiConfig.map((kpi) => {
          const value = stats[kpi.key]
          const Icon = kpi.icon
          return (
            <Link key={kpi.key} href={kpi.href} style={{ textDecoration: "none" }}>
              <div className="dashboard-stat-card">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <p style={{ fontSize: "12px", color: "#6b7280", fontWeight: "500", margin: 0 }}>{kpi.label}</p>
                    <p style={{ fontSize: "28px", fontWeight: "700", color: "#111827", marginTop: "8px", marginBottom: 0 }}>{value}</p>
                  </div>
                  <div style={{
                    width: "44px", height: "44px", borderRadius: "12px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: kpi.color.includes("0d9488") ? "rgba(13,148,136,0.1)" :
                                kpi.color.includes("b78b4b") ? "rgba(183,139,75,0.1)" :
                                kpi.color.includes("0b1220") ? "rgba(11,18,32,0.1)" : "rgba(14,107,112,0.1)",
                  }}>
                    <Icon size={20} style={{ color: kpi.color.replace("bg-", "#") }} />
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      <div style={{ background: "white", borderRadius: "12px", border: "1px solid #f0f0f0", padding: "24px" }}>
        <h2 style={{ fontSize: "16px", fontWeight: "600", color: "#111827", margin: "0 0 16px", display: "flex", alignItems: "center", gap: "8px" }}>
          <TrendingUp size={18} style={{ color: "#0d9488" }} />
          Quick Actions
        </h2>
        <div className="dashboard-quick-actions">
          <Link href="/admin/appointments" style={{
            padding: "14px 16px", borderRadius: "10px",
            background: "#f0fdfa", textDecoration: "none",
            display: "block", transition: "background 0.2s",
          }}>
            <p style={{ fontWeight: "600", color: "#0d9488", margin: 0, fontSize: "14px" }}>View Appointments</p>
            <p style={{ fontSize: "12px", color: "#6b7280", margin: "4px 0 0" }}>Manage patient bookings</p>
          </Link>
          <Link href="/admin/leads" style={{
            padding: "14px 16px", borderRadius: "10px",
            background: "#fefce8", textDecoration: "none",
            display: "block", transition: "background 0.2s",
          }}>
            <p style={{ fontWeight: "600", color: "#a16207", margin: 0, fontSize: "14px" }}>Manage Leads</p>
            <p style={{ fontSize: "12px", color: "#6b7280", margin: "4px 0 0" }}>Track inquiries & conversions</p>
          </Link>
          <Link href="/admin/analytics" style={{
            padding: "14px 16px", borderRadius: "10px",
            background: "#f8fafc", textDecoration: "none",
            display: "block", transition: "background 0.2s",
          }}>
            <p style={{ fontWeight: "600", color: "#0b1220", margin: 0, fontSize: "14px" }}>View Analytics</p>
            <p style={{ fontSize: "12px", color: "#6b7280", margin: "4px 0 0" }}>Charts & performance data</p>
          </Link>
        </div>
      </div>

      <style>{`
        .dashboard-stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 16px;
        }
        .dashboard-stat-card {
          background: white;
          border-radius: 12px;
          padding: 20px;
          border: 1px solid #f0f0f0;
          transition: all 0.2s ease;
        }
        .dashboard-stat-card:hover {
          box-shadow: 0 4px 12px rgba(0,0,0,0.06);
          border-color: #e5e7eb;
        }
        .dashboard-quick-actions {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        .dashboard-quick-actions a:hover {
          opacity: 0.85;
        }
        @media (max-width: 768px) {
          .dashboard-stats-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 12px !important;
          }
          .dashboard-stat-card {
            padding: 16px !important;
            border-radius: 12px !important;
          }
          .dashboard-quick-actions {
            grid-template-columns: 1fr !important;
            gap: 10px !important;
          }
        }
        @media (max-width: 480px) {
          .dashboard-stats-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
