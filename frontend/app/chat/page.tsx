"use client"
import { useAuth } from "@/hooks/use-auth"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ChatPreview } from "@/components/chat/chat-preview"
import { AuthenticatedChat } from "@/components/chat/authenticated-chat"
import { AvailableSection } from "@/components/chat/available-section"
import { FeaturesSection } from "@/components/chat/features-section"
import { ProductivitySection } from "@/components/chat/productivity-section"
import { InterfaceSection } from "@/components/chat/interface-section"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function ChatPage() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-black text-white ${!user ? "pre-login-page" : ""}`}>
      <Navbar />
      {user ? (
        <div className="h-screen">
          <AuthenticatedChat />
        </div>
      ) : (
        <>
          {/* Main Chat Preview Section */}
          <div className="pt-16">
            <ChatPreview />
          </div>

          {/* Available Anywhere Section */}
          <AvailableSection />

          {/* Features Section */}
          <FeaturesSection />

          {/* Productivity Section */}
          <ProductivitySection />

          {/* Interface Section */}
          <InterfaceSection />

          {/* Footer */}
          <Footer />
        </>
      )}
    </div>
  )
}
