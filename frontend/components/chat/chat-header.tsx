"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Crown, LayoutDashboard, LogOut, PanelLeft, Settings, User } from "lucide-react"
import { LogoutModal } from "@/components/ui/logout-modal"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"

interface ChatHeaderProps {
  onToggleSidebar: () => void
}

export function ChatHeader({ onToggleSidebar }: ChatHeaderProps) {
  const [currentPlan] = useState("Free")
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const { user, logout } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const handleLogoutClick = () => {
    setShowLogoutModal(true)
  }

  const handleLogoutConfirm = async () => {
    setIsLoggingOut(true)

    setTimeout(() => {
      logout()
      setIsLoggingOut(false)
      setShowLogoutModal(false)
      toast({
        title: "Logged out successfully",
        description: "You have been safely logged out of your account.",
      })
      router.push("/")
    }, 1000)
  }

  const handleLogoutCancel = () => {
    setShowLogoutModal(false)
  }

  return (
    <>
      <header className="flex items-center justify-between h-14 px-4 bg-black">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="text-gray-400 hover:text-white hover:bg-gray-800"
          >
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-1 px-3 py-1.5 h-auto text-base font-semibold text-white hover:bg-gray-800 rounded-md"
              >
                CHATAI
                <ChevronDown className="h-4 w-4 opacity-70" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56 bg-gray-900 border-gray-800 text-gray-100">
              <div className="px-2 py-1.5 text-xs text-gray-400">CURRENT PLAN</div>
              <DropdownMenuItem className="flex items-center justify-between">
                <span>{currentPlan}</span>
                {currentPlan === "Free" && <span className="text-xs bg-gray-800 px-2 py-0.5 rounded">Limited</span>}
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-800" />
              <DropdownMenuItem
                className="flex items-center gap-2 text-gray-500"
                onClick={() => router.push("/pricing")}
              >
                <Crown className="h-4 w-4" />
                <span>Upgrade Plan</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2" onClick={() => router.push("/dashboard")}>
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full p-0">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-gray-600 text-white">
                    {user?.name.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-gray-900 border-gray-800" align="end" forceMount>
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium text-white">{user?.name || "User"}</p>
                  <p className="w-[200px] truncate text-sm text-gray-400">{user?.email || "user@example.com"}</p>
                </div>
              </div>
              <DropdownMenuSeparator className="bg-gray-700" />
              <DropdownMenuItem asChild>
                <div onClick={() => router.push("/dashboard")} className="text-white hover:bg-gray-800 cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  Dashboard
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <div
                  onClick={() => router.push("/dashboard?tab=preferences")}
                  className="text-white hover:bg-gray-800 cursor-pointer"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Preferences
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-700" />
              <DropdownMenuItem
                onClick={handleLogoutClick}
                className="text-red-400 hover:bg-gray-800 hover:text-red-300 cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <LogoutModal
        isOpen={showLogoutModal}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
        isLoading={isLoggingOut}
      />
    </>
  )
}
