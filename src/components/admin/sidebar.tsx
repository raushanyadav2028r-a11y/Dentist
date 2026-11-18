"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Calendar,
  Users,
  Stethoscope,
  Sparkles,
  Star,
  Image,
  FileText,
  BarChart3,
  HelpCircle,
  Phone,
  Search,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import { useState } from "react"
import { signOut } from "@/actions/admin"
import clinicConfig from "@/config/clinic"

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/appointments", label: "Appointments", icon: Calendar },
  { href: "/admin/leads", label: "Leads", icon: Users },
  { href: "/admin/doctors", label: "Doctors", icon: Stethoscope },
  { href: "/admin/services", label: "Services", icon: Sparkles },
  { href: "/admin/testimonials", label: "Testimonials", icon: Star },
  { href: "/admin/before-after", label: "Before & After", icon: Image },
  { href: "/admin/faq", label: "FAQ", icon: HelpCircle },
  { href: "/admin/content", label: "Hero & Content", icon: FileText },
  { href: "/admin/contact-info", label: "Contact Info", icon: Phone },
  { href: "/admin/seo", label: "SEO", icon: Search },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
]

export function Sidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  if (pathname === "/admin/login") return null

  return (
    <>
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle admin navigation"
        style={{
          position: "fixed",
          top: "16px",
          left: "16px",
          zIndex: 1000,
          background: "#0d9488",
          color: "white",
          border: "none",
          borderRadius: "8px",
          padding: "8px 10px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 12px rgba(13,148,136,0.3)",
        }}
        className="admin-hamburger"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 998,
          }}
        />
      )}

      <aside
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: "220px",
          background: "#ffffff",
          borderRight: "1px solid #f0f0f0",
          display: "flex",
          flexDirection: "column",
          zIndex: 999,
          overflowY: "auto",
          overflowX: "hidden",
          boxShadow: "2px 0 12px rgba(0,0,0,0.04)",
          transition: "left 0.3s ease",
        }}
        className={`admin-sidebar${mobileOpen ? " admin-sidebar-open" : ""}`}
      >
        <div
          style={{
            padding: "20px 16px",
            borderBottom: "1px solid #f5f5f5",
          }}
        >
          <div style={{ fontWeight: "700", fontSize: "15px", color: "#111827" }}>{clinicConfig.clinicName}</div>
          <div style={{ fontSize: "11px", color: "#9ca3af", marginTop: "2px", fontWeight: "500" }}>Admin Panel</div>
        </div>

        <nav style={{ flex: 1, padding: "12px 8px", overflowY: "auto" }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: "500",
                  color: isActive ? "#ffffff" : "#374151",
                  background: isActive ? "#0d9488" : "transparent",
                  marginBottom: "2px",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.background = "#f0fdfa"
                    ;(e.currentTarget as HTMLElement).style.color = "#0d9488"
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.background = "transparent"
                    ;(e.currentTarget as HTMLElement).style.color = "#374151"
                  }
                }}
              >
                <Icon size={16} style={{ flexShrink: 0 }} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div style={{ padding: "12px 8px", borderTop: "1px solid #f5f5f5" }}>
          <form action={signOut}>
            <button
              type="submit"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                width: "100%",
                padding: "10px 12px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: "500",
                color: "#6b7280",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s ease",
                textAlign: "left",
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.background = "#fef2f2"
                ;(e.currentTarget as HTMLElement).style.color = "#dc2626"
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.background = "transparent"
                ;(e.currentTarget as HTMLElement).style.color = "#6b7280"
              }}
            >
              <LogOut size={16} style={{ flexShrink: 0 }} />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      <style>{`
        @media (max-width: 768px) {
          .admin-hamburger {
            display: flex !important;
          }
          .admin-sidebar {
            left: -100% !important;
            width: 260px !important;
          }
          .admin-sidebar.admin-sidebar-open {
            left: 0 !important;
          }
        }
        @media (min-width: 769px) {
          .admin-hamburger {
            display: none !important;
          }
          .admin-sidebar {
            left: 0 !important;
          }
        }
      `}</style>
    </>
  )
}
