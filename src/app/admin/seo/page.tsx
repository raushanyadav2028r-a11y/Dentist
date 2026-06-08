"use client"

import { useState, useEffect } from "react"
import { getSeoContent, upsertSeoContent } from "@/actions/admin"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Check } from "lucide-react"

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
  const [savedKey, setSavedKey] = useState<string | null>(null)

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
    if (!result.error) {
      setSavedKey(key)
      setTimeout(() => setSavedKey(null), 2000)
    }
  }

  if (loading) return <p className="text-muted-light text-center py-8">Loading SEO settings...</p>

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-navy">SEO</h1>
        <p className="text-muted mt-1">Edit how your website appears in search engines and social media</p>
      </div>

      <div className="space-y-4">
        {seoFields.map((field) => (
          <Card key={field.key}>
            <CardContent className="p-6 space-y-3">
              <div>
                <Label htmlFor={`seo-${field.key}`}>{field.label}</Label>
                <p className="text-xs text-muted mt-0.5">{field.description}</p>
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
                <p className="text-xs text-muted-light">{(values[field.key] || "").length}/60 characters</p>
              )}
              {field.key === "meta_description" && (
                <p className="text-xs text-muted-light">{(values[field.key] || "").length}/160 characters</p>
              )}
              <div className="flex items-center gap-3">
                <Button
                  size="sm"
                  onClick={() => handleSave(field.key)}
                  disabled={savingKey === field.key}
                >
                  {savingKey === field.key ? (
                    <><Loader2 className="mr-1 h-3 w-3 animate-spin" /> Saving</>
                  ) : savedKey === field.key ? (
                    <><Check className="mr-1 h-3 w-3" /> Saved</>
                  ) : (
                    "Save"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
