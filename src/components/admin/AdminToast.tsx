"use client"

import { useEffect } from "react"

type ToastType = "success" | "error"

export function useToast() {
  const showToast = (message: string, type: ToastType = "success") => {
    const event = new CustomEvent("admin-toast", { detail: { message, type } })
    window.dispatchEvent(event)
  }
  return { showToast }
}

export function AdminToast() {
  useEffect(() => {
    const handler = (e: Event) => {
      const { message, type } = (e as CustomEvent).detail
      const existing = document.querySelector(".admin-toast-container")
      if (existing) existing.remove()

      const container = document.createElement("div")
      container.className = "admin-toast-container"
      container.style.cssText = `
        position: fixed; top: 20px; right: 20px; z-index: 99999;
        display: flex; align-items: center; gap: 10px;
        padding: 14px 22px; border-radius: 10px;
        font-size: 14px; font-weight: 500;
        background: ${type === "success" ? "#0d9488" : "#dc2626"};
        color: white; box-shadow: 0 8px 30px rgba(0,0,0,0.2);
        animation: slideInToast 0.3s ease;
        font-family: inherit;
      `
      container.innerHTML = `
        <span style="display:flex;align-items:center;">${type === "success" ? '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' : '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'}
        </span>
        <span>${message}</span>
      `
      document.body.appendChild(container)

      setTimeout(() => {
        container.style.transition = "opacity 0.3s ease, transform 0.3s ease"
        container.style.opacity = "0"
        container.style.transform = "translateX(100px)"
        setTimeout(() => container.remove(), 300)
      }, 3000)
    }

    window.addEventListener("admin-toast", handler)
    return () => window.removeEventListener("admin-toast", handler)
  }, [])

  return null
}
