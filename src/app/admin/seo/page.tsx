"use client"

import { useState, useEffect } from "react"
import { getSeoContent, upsertSeoContent } from "@/actions/admin"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/admin/AdminToast"

type SeoField = { key: string; label: string; description: string; multiline?: boolean }

const seoFields: SeoField[] = [
  { key: "meta_title", label: "Meta Title", description: "Page title shown in browser tabs and search results (50–60 chars)" },
  { key: "meta_description", label: "Meta Description", description: "Description shown under your site in search results (150–160 chars)", multiline: true },
  { key: "og_image", label: "OG Image URL", description: "Image shown when your site is shared on social media (1200×630px recommended)" },
]

export default function SeoPage() {
  const [values, setValues] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [savingKey, setSavingKey] = useState<string | null>(null)
  const { showToast } = useToast()

  useEffect(() => {
    (async () => {
      const { data } = await getSeoContent()
      if (data) {
        const map: Record<string, string> = {}
        data.forEach((item: { key: string; value: string | null }) => {
          map[item.key] = item.value || ""
        })
        setValues(map)
      }
      setLoading(false)
    })()
  }, [])

  const handleSave = async (key: string) => {
    setSavingKey(key)
    const result = await upsertSeoContent({ key, value: values[key] || "" })
    setSavingKey(null)
    if (result.error) {
      showToast("Failed to save. Try again.", "error")
    } else {
      showToast("SEO setting saved ✓", "success")
    }
  }

  if (loading) return <p style={{ color: "#9ca3af", textAlign: "center", padding: "32px 0" }}>Loading SEO settings...</p>

  return (
    <div style={{ maxWidth: "640px", display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#111827", margin: 0 }}>SEO</h1>
        <p style={{ color: "#6b7280", marginTop: "4px", fontSize: "14px" }}>Edit how your website appears in search engines and social media</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {seoFields.map((field) => (
          <div key={field.key} style={{ background: "white", borderRadius: "12px", border: "1px solid #f0f0f0", padding: "24px" }}>
            <div style={{ marginBottom: "12px" }}>
              <Label htmlFor={`seo-${field.key}`} style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "4px", display: "block" }}>{field.label}</Label>
              <p style={{ fontSize: "12px", color: "#9ca3af", margin: 0 }}>{field.description}</p>
            </div>
            {field.multiline ? (
              <Textarea
                id={`seo-${field.key}`}
                rows={3}
                value={values[field.key] || ""}
                onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
                placeholder={`Enter ${field.label.toLowerCase()}...`}
              />
            ) : (
              <Input
                id={`seo-${field.key}`}
                value={values[field.key] || ""}
                onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
                placeholder={`Enter ${field.label.toLowerCase()}...`}
              />
            )}
            {field.key === "meta_title" && (
              <p style={{ fontSize: "11px", color: "#9ca3af", marginTop: "6px" }}>{(values[field.key] || "").length}/60 characters</p>
            )}
            {field.key === "meta_description" && (
              <p style={{ fontSize: "11px", color: "#9ca3af", marginTop: "6px" }}>{(values[field.key] || "").length}/160 characters</p>
            )}
            <div style={{ marginTop: "12px" }}>
              <Button
                size="sm"
                onClick={() => handleSave(field.key)}
                disabled={savingKey === field.key}
                style={{ background: "#0d9488", color: "white", padding: "8px 20px", borderRadius: "8px", fontSize: "13px", fontWeight: "500", border: "none", cursor: "pointer" }}
              >
                {savingKey === field.key ? <><Loader2 size={14} style={{ animation: "spin 1s linear infinite", marginRight: "6px" }} /> Saving</> : "Save"}
              </Button>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
