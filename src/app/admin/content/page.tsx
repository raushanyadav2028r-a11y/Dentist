"use client"

import { useState, useEffect, useCallback } from "react"
import { getWebsiteContent, updateWebsiteContent } from "@/actions/admin"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Save, CheckCircle } from "lucide-react"

type ContentItem = { id: string; section: string; key: string; value: string | null; value_type: string }

const sectionLabels: Record<string, string> = {
  hero: "Hero Section",
  contact: "Contact Information",
  cta: "Homepage CTA",
  faq: "FAQ Content",
}

export default function ContentPage() {
  const [items, setItems] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [saved, setSaved] = useState<string | null>(null)

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
    await updateWebsiteContent(item.id, item.value || "")
    setSaving(null)
    setSaved(item.id)
    setTimeout(() => setSaved(null), 2000)
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
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold text-navy">Website Content</h1><p className="text-muted mt-1">Manage homepage and page content</p></div>

      {loading ? (
        <p className="text-muted-light text-center py-8">Loading...</p>
      ) : Object.keys(grouped).length === 0 ? (
        <p className="text-muted-light text-center py-8">No content yet. Run the seed SQL to populate.</p>
      ) : (
        Object.entries(grouped).map(([section, sectionItems]) => (
          <Card key={section}>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-navy mb-4">{sectionLabels[section] || section}</h2>
              <div className="space-y-4">
                {sectionItems.map((item) => (
                  <div key={item.id} className="flex items-start gap-3">
                    <Label className="w-32 shrink-0 pt-2 text-xs uppercase tracking-wider text-muted">{item.key.replace(/_/g, " ")}</Label>
                    <div className="flex-1">
                      {item.value_type === "html" || (item.value && item.value.length > 80) ? (
                        <Textarea value={item.value || ""} onChange={(e) => updateItem(item.id, e.target.value)} rows={3} />
                      ) : (
                        <Input value={item.value || ""} onChange={(e) => updateItem(item.id, e.target.value)} />
                      )}
                    </div>
                    <Button
                      size="sm"
                      variant={saved === item.id ? "secondary" : "default"}
                      onClick={() => handleSave(item)}
                      disabled={saving === item.id}
                      className="shrink-0"
                    >
                      {saved === item.id ? <><CheckCircle size={14} className="mr-1" /> Saved</> : saving === item.id ? "Saving..." : <><Save size={14} className="mr-1" /> Save</>}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}
