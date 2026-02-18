"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Copy, ThumbsUp, ThumbsDown, User, Zap } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { ChatMessage as ChatMessageType } from "@/lib/chat"

interface ChatMessageProps {
  message: ChatMessageType
}

export function ChatMessage({ message }: ChatMessageProps) {
  const { toast } = useToast()
  const isUser = message.role === "user"

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(message.content)
      toast({
        title: "Copied to clipboard",
        description: "Message content has been copied to your clipboard.",
      })
    } catch {
      toast({
        title: "Failed to copy",
        description: "Could not copy message to clipboard.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      <Avatar className="w-8 h-8 mt-1">
        <AvatarFallback className={isUser ? "bg-gray-700 text-gray-300" : "bg-gray-600 text-white"}>
          {isUser ? <User className="w-4 h-4 text-gray-300" /> : <Zap className="w-4 h-4 text-white" />}
        </AvatarFallback>
      </Avatar>

      <div className={`flex-1 max-w-[80%] ${isUser ? "text-right" : "text-left"}`}>
        <div
          className={`inline-block p-4 rounded-2xl ${
            isUser ? "bg-gray-700 text-white" : "bg-gray-900 border border-gray-800"
          }`}
        >
          <div className="prose prose-sm max-w-none dark:prose-invert">
            {message.content.split("\n").map((line: string, index: number) => (
              <p key={index} className={`${index === 0 ? "mt-0" : ""} ${isUser ? "text-white" : "text-gray-300"}`}>
                {line}
              </p>
            ))}
          </div>
        </div>

        {!isUser && (
          <div className="flex items-center gap-1 mt-2">
            <Button variant="ghost" size="sm" onClick={copyToClipboard} className="text-gray-500 hover:text-white">
              <Copy className="w-3 h-3" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-white">
              <ThumbsUp className="w-3 h-3" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-white">
              <ThumbsDown className="w-3 h-3" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
