import { Sidebar } from "@/components/admin/sidebar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-navy">
      <Sidebar />
      <main className="lg:ml-64 min-h-screen flex flex-col">
        {/* Admin topbar — logo left, user avatar right, no nav links */}
        <header className="sticky top-0 z-30 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="lg:hidden w-10" /> {/* spacer for mobile sidebar toggle */}
            <div className="hidden lg:flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold text-xs">CS</span>
              </div>
              <span className="text-sm font-bold text-navy">Celestia Smiles</span>
              <span className="text-xs text-muted font-medium">— Admin</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-bold text-xs">A</span>
            </div>
          </div>
        </header>
        <div className="flex-1 p-5 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
