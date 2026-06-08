import { redirect } from "next/navigation"
import { getUser } from "@/lib/supabase-server"

export default async function AdminPage() {
  const user = await getUser()
  if (user) {
    redirect("/admin/dashboard")
  } else {
    redirect("/admin/login")
  }
}
