"use client"

import { useState, useEffect } from "react"
import { ChatInterface } from "@/components/chat-interface"
import { ChatSidebar } from "@/components/chat-sidebar"
import { ChatHeader } from "@/components/chat/chat-header"
import { useAuth } from "@/hooks/use-auth"
import { API_URL } from "@/lib/config"
import type { ChatMessage } from "@/lib/chat"

export function AuthenticatedChat() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      // Auto-hide sidebar on mobile
      if (window.innerWidth < 768) {
        setIsSidebarCollapsed(true)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const token = localStorage.getItem("auth_token")
    if (!token || !user) return
    fetch(`${API_URL}/api/messages`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Accept": "application/json"
      },
      credentials: "include",
    })
      .then(async (res) => {
        if (!res.ok) return
        const data = await res.json()
        const items = (data.data ?? []).map((m: any) => ({
          id: String(m.id ?? crypto.randomUUID()),
          role: m.role,
          content: m.content,
        })) as ChatMessage[]
        setMessages(items)
      })
      .catch(() => { })
  }, [user])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim() || !user) return
    const token = localStorage.getItem("auth_token")
    if (!token) return
    setIsLoading(true)
    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "Accept": "application/json"
        },
        body: JSON.stringify({ userId: user.id, message: input.trim() }),
        credentials: "include",
      })
      if (!res.ok) throw new Error("Chat failed")
      const data = await res.json()
      const userMsg = {
        id: String(data.userMessage.id ?? crypto.randomUUID()),
        role: data.userMessage.role,
        content: data.userMessage.content,
      } as ChatMessage
      const assistantMsg = data.assistantMessage
        ? ({
            id: String(data.assistantMessage.id ?? crypto.randomUUID()),
            role: data.assistantMessage.role,
            content: data.assistantMessage.content,
          } as ChatMessage)
        : null
      setMessages((prev) => (assistantMsg ? [...prev, userMsg, assistantMsg] : [...prev, userMsg]))
      setInput("")
    } catch {
    } finally {
      setIsLoading(false)
    }
  }

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  const closeSidebar = () => {
    if (isMobile) {
      setIsSidebarCollapsed(true)
    }
  }

  return (
    <div className="flex h-screen bg-black relative">
      {/* Mobile Overlay */}
      {isMobile && !isSidebarCollapsed && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={closeSidebar} />
      )}

      {/* Sidebar */}
      <div
        className={`
          ${isMobile
            ? `fixed left-0 top-0 h-full z-50 transform transition-transform duration-300 ease-in-out ${isSidebarCollapsed ? "-translate-x-full" : "translate-x-0"
            }`
            : `transition-all duration-300 ease-in-out ${isSidebarCollapsed ? "w-0" : "w-80"} flex-shrink-0`
          }
          overflow-hidden
        `}
      >
        <ChatSidebar onClose={closeSidebar} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <ChatHeader onToggleSidebar={toggleSidebar} />
        <div className="flex-1 overflow-hidden">
          <ChatInterface
            messages={messages}
            input={input}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  )
}
