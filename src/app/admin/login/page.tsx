"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { signIn } from "@/actions/admin"
import { Loader2, Eye, EyeOff } from "lucide-react"
import clinicConfig from "@/config/clinic"

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function AdminLoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true)
    setError(null)
    try {
      const result = await signIn(data)
      if (result?.error) {
        setError(result.error)
      } else if (result?.success) {
        router.push("/admin/dashboard")
      }
    } catch {
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #050d14 0%, #0a1f1f 50%, #0d2a2a 100%)",
        padding: "24px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "#ffffff",
          borderRadius: "20px",
          padding: "40px 32px",
          boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
          border: "none",
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #0d9488 0%, #0891b2 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
              boxShadow: "0 8px 24px rgba(13,148,136,0.35)",
            }}
          >
            <span style={{ color: "white", fontWeight: "700", fontSize: "20px", fontFamily: "inherit" }}>{clinicConfig.shortName || "DC"}</span>
          </div>
          <h1 style={{ fontSize: "22px", fontWeight: "700", color: "#111827", margin: "0 0 6px", fontFamily: "inherit" }}>
            Welcome Back
          </h1>
          <p style={{ fontSize: "13px", color: "#6b7280", margin: 0, fontFamily: "inherit" }}>
            Sign in to {clinicConfig.clinicName} Admin
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {error && (
            <div
              style={{
                padding: "12px 14px",
                borderRadius: "8px",
                background: "#fef2f2",
                border: "1px solid #fecaca",
                color: "#dc2626",
                fontSize: "13px",
                fontFamily: "inherit",
              }}
            >
              {error}
            </div>
          )}

          {/* Email */}
          <div>
            <label
              htmlFor="login-email"
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: "500",
                color: "#374151",
                marginBottom: "6px",
                fontFamily: "inherit",
              }}
            >
              Email Address
            </label>
            <input
              id="login-email"
              type="email"
              placeholder="admin@clinic.com"
              {...register("email")}
              style={{
                width: "100%",
                padding: "10px 14px",
                border: errors.email ? "1px solid #dc2626" : "1px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "14px",
                color: "#111827",
                background: "#ffffff",
                outline: "none",
                boxSizing: "border-box",
                fontFamily: "inherit",
                transition: "border-color 0.2s ease",
              }}
              onFocus={(e) => { e.target.style.borderColor = "#0d9488"; e.target.style.boxShadow = "0 0 0 3px rgba(13,148,136,0.1)" }}
              onBlur={(e) => { e.target.style.borderColor = errors.email ? "#dc2626" : "#e5e7eb"; e.target.style.boxShadow = "none" }}
            />
            {errors.email && (
              <p style={{ color: "#dc2626", fontSize: "12px", marginTop: "4px", fontFamily: "inherit" }}>
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="login-password"
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: "500",
                color: "#374151",
                marginBottom: "6px",
                fontFamily: "inherit",
              }}
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password")}
                style={{
                  width: "100%",
                  padding: "10px 44px 10px 14px",
                  border: errors.password ? "1px solid #dc2626" : "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "14px",
                  color: "#111827",
                  background: "#ffffff",
                  outline: "none",
                  boxSizing: "border-box",
                  fontFamily: "inherit",
                  transition: "border-color 0.2s ease",
                }}
                onFocus={(e) => { e.target.style.borderColor = "#0d9488"; e.target.style.boxShadow = "0 0 0 3px rgba(13,148,136,0.1)" }}
                onBlur={(e) => { e.target.style.borderColor = errors.password ? "#dc2626" : "#e5e7eb"; e.target.style.boxShadow = "none" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#9ca3af",
                  padding: "0",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && (
              <p style={{ color: "#dc2626", fontSize: "12px", marginTop: "4px", fontFamily: "inherit" }}>
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px 24px",
              background: loading ? "#9ca3af" : "linear-gradient(135deg, #0d9488 0%, #0891b2 100%)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "15px",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              transition: "all 0.2s ease",
              boxShadow: loading ? "none" : "0 8px 20px rgba(13,148,136,0.3)",
              fontFamily: "inherit",
            }}
          >
            {loading ? (
              <>
                <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            fontSize: "12px",
            color: "#9ca3af",
            marginTop: "24px",
            fontFamily: "inherit",
          }}
        >
          {clinicConfig.clinicName} Admin Portal
        </p>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
