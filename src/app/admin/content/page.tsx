"use client"

import { useState, useEffect, useCallback } from "react"
import { getWebsiteContent, updateWebsiteContent } from "@/actions/admin"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/admin/AdminToast"

type ContentItem = { id: string; section: string; key: string; value: string | null; value_type: string }

const sectionLabels: Record<string, string> = {
  hero: "Hero Section",
  stats: "Stats & Numbers",
  contact: "Contact Information",
  cta: "Homepage CTA",
  faq: "FAQ Content",
}

export default function ContentPage() {
  const [items, setItems] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const { showToast } = useToast()

  const fetchData = useCallback(async () => {
    const { data } = await getWebsiteContent()
    setItems((data as ContentItem[]) || [])
    setLoading(false)
  }, [])

  useEffect(() => {
    const timer = window.setTimeout(() => { void fetchData() }, 0)
    return () => window.clearTimeout(timer)
  }, [fetchData])

  const handleSave = async (item: ContentItem) => {
    setSaving(item.id)
    const result = await updateWebsiteContent(item.id, item.value || "")
    setSaving(null)
    if (result.error) {
      showToast("Failed to save. Try again.", "error")
    } else {
      showToast("Changes saved successfully ✓", "success")
    }
  }

  const updateItem = (id: string, value: string) => {
    setItems(items.map(i => i.id === id ? { ...i, value } : i))
  }

  const grouped = items.reduce<Record<string, ContentItem[]>>((acc, item) => {
    const section = item.section
    if (!acc[section]) acc[section] = []
    acc[section].push(item)
    return acc
  }, {})

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#111827", margin: 0 }}>Hero & Content</h1>
        <p style={{ color: "#6b7280", marginTop: "4px", fontSize: "14px" }}>Manage homepage hero section, CTA buttons, and stats</p>
      </div>

      {loading ? (
        <p style={{ color: "#9ca3af", textAlign: "center", padding: "32px 0" }}>Loading...</p>
      ) : Object.keys(grouped).length === 0 ? (
        <div style={{ background: "white", borderRadius: "12px", border: "1px solid #f0f0f0", padding: "32px", textAlign: "center", color: "#9ca3af" }}>
          No content yet. Run the seed SQL to populate or add website_content entries in Supabase.
        </div>
      ) : (
        Object.entries(grouped).map(([section, sectionItems]) => (
          <div key={section} style={{ background: "white", borderRadius: "12px", border: "1px solid #f0f0f0", padding: "24px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: "600", color: "#111827", margin: "0 0 20px", paddingBottom: "12px", borderBottom: "1px solid #f5f5f5" }}>
              {sectionLabels[section] || section}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {sectionItems.map((item) => (
                <div key={item.id} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <div style={{ width: "120px", flexShrink: 0, paddingTop: "8px" }}>
                    <Label style={{ fontSize: "12px", fontWeight: "600", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {item.key.replace(/_/g, " ")}
                    </Label>
                  </div>
                  <div style={{ flex: 1 }}>
                    {item.value_type === "html" || (item.value && item.value.length > 80) ? (
                      <Textarea value={item.value || ""} onChange={(e) => updateItem(item.id, e.target.value)} rows={3} />
                    ) : (
                      <Input value={item.value || ""} onChange={(e) => updateItem(item.id, e.target.value)} />
                    )}
                  </div>
                  <button
                    onClick={() => handleSave(item)}
                    disabled={saving === item.id}
                    style={{
                      flexShrink: 0,
                      padding: "8px 20px",
                      borderRadius: "8px",
                      fontSize: "13px",
                      fontWeight: "500",
                      border: "none",
                      cursor: saving === item.id ? "not-allowed" : "pointer",
                      background: "#0d9488",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      opacity: saving === item.id ? 0.7 : 1,
                    }}
                  >
                    {saving === item.id ? (
                      <><Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} /> Saving</>
                    ) : (
                      "Save"
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))
      )}

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
