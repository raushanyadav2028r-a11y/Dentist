"use client"

import { usePathname } from "next/navigation"
import { Sidebar } from "@/components/admin/sidebar"
import { AdminToast } from "@/components/admin/AdminToast"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLogin = pathname === "/admin/login"

  if (isLogin) {
    return <>{children}</>
  }

  return (
    <>
      <AdminToast />
      <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
        <Sidebar />

        <main className="admin-main-content">
          <header
            style={{
              height: "60px",
              background: "#ffffff",
              borderBottom: "1px solid #f0f0f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 32px",
              position: "sticky",
              top: 0,
              zIndex: 99,
              boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            }}
            className="admin-topbar"
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: "rgba(13,148,136,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ color: "#0d9488", fontWeight: "700", fontSize: "12px" }}>CS</span>
              </div>
              <span style={{ fontSize: "14px", fontWeight: "600", color: "#111827" }}>Celestia Smiles</span>
              <span style={{ fontSize: "13px", color: "#9ca3af" }}>— Admin</span>
            </div>
            <div
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "50%",
                background: "rgba(13,148,136,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <span style={{ color: "#0d9488", fontWeight: "700", fontSize: "13px" }}>A</span>
            </div>
          </header>

          <div style={{ padding: "32px" }} className="admin-page-content">
            {children}
          </div>
        </main>
      </div>

      <style>{`
        .admin-main-content {
          margin-left: 220px;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        .admin-page-content {
          flex: 1;
        }
        @media (max-width: 768px) {
          .admin-main-content {
            margin-left: 0 !important;
          }
          .admin-page-content {
            padding: 70px 16px 24px !important;
          }
          .admin-topbar {
            padding-left: 60px !important;
            padding-right: 16px !important;
          }
        }
      `}</style>
    </>
  )
}
