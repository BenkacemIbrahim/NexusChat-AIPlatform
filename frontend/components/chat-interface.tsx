"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Send,
  Square,
  Paperclip,
  Search,
  Lightbulb,
  ChevronUp,
  ChevronDown,
  ImageIcon,
  Edit3,
  Newspaper,
  Code,
  Briefcase,
  Zap,
} from "lucide-react"
import { ChatMessage } from "@/components/chat-message"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { ChatMessage as ChatMessageType } from "@/lib/chat"

interface ChatInterfaceProps {
  messages: ChatMessageType[]
  input: string
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  isLoading: boolean
}

export function ChatInterface({ messages, input, handleInputChange, handleSubmit, isLoading }: ChatInterfaceProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [selectedModel, setSelectedModel] = useState("CHATAI Pro")
  const [searchMode, setSearchMode] = useState("SmartSearch")
  const [isThinkSelected, setIsThinkSelected] = useState(false)
  const [isSearchSelected, setIsSearchSelected] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleFileUpload = () => {
    const fileInput = document.createElement("input")
    fileInput.type = "file"
    fileInput.accept = "image/*,.pdf,.doc,.docx,.txt"
    fileInput.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        console.log("File selected:", file.name)
      }
    }
    fileInput.click()
  }

  const handleFeatureClick = (text: string) => {
    const event = { target: { value: text } } as React.ChangeEvent<HTMLInputElement>
    handleInputChange(event)
  }

  const renderMobileInput = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 p-4 z-30">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="relative bg-gray-800/50 rounded-2xl border border-gray-700 p-3">
          <textarea
            value={input}
            onChange={(e) => handleInputChange(e as any)}
            placeholder="What do you want to know?"
            className="w-full bg-transparent border-none text-white text-base placeholder:text-gray-400 focus:ring-0 focus:outline-none focus:ring-offset-0 p-0 resize-none overflow-hidden min-h-[20px] max-h-[120px] shadow-none text-shadow-none"
            disabled={isLoading}
            rows={1}
            style={{
              height: "auto",
              minHeight: "20px",
              textShadow: "none",
              WebkitTextFillColor: "white",
            }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement
              target.style.height = "auto"
              target.style.height = Math.min(target.scrollHeight, 120) + "px"
            }}
          />

          {/* Mobile Input Controls */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-700">
            <div className="flex items-center space-x-3">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white p-1"
                onClick={handleFileUpload}
              >
                <Paperclip className="h-4 w-4" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white text-xs p-1">
                    <Search className="h-3 w-3 mr-1" />
                    {searchMode}
                    <ChevronDown className="h-3 w-3 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-800 border-gray-700">
                  <DropdownMenuItem onClick={() => setSearchMode("SmartSearch")}>SmartSearch</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSearchMode("DeepSearch")}>DeepSearch</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSearchMode("QuickSearch")}>QuickSearch</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                className={
                  isThinkSelected
                    ? "text-gray-400 bg-gray-500/20 hover:text-gray-300 text-xs p-1"
                    : "text-gray-400 hover:text-white text-xs p-1"
                }
                onClick={() => setIsThinkSelected(!isThinkSelected)}
              >
                <Lightbulb className="h-3 w-3 mr-1" />
                Think
              </Button>
            </div>

            <div className="flex items-center space-x-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white text-xs p-1">
                    {selectedModel.replace("CHATAI ", "")}
                    <ChevronDown className="h-3 w-3 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-800 border-gray-700">
                  <DropdownMenuItem onClick={() => setSelectedModel("CHATAI Pro")}>CHATAI Pro</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedModel("CHATAI Standard")}>
                    CHATAI Standard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedModel("CHATAI Lite")}>CHATAI Lite</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-xl"
              >
                {isLoading ? <Square className="h-3 w-3" /> : <Send className="h-3 w-3" />}
              </Button>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-2 text-center">CHATAI may make mistakes. Please use with discretion.</p>
      </form>
    </div>
  )

  const renderDesktopInput = () => (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
        <div className="relative bg-gray-800/50 rounded-2xl border border-gray-700 p-4">
          <textarea
            value={input}
            onChange={(e) => handleInputChange(e as any)}
            placeholder="What do you want to know?"
            className="w-full bg-transparent border-none text-white text-lg placeholder:text-gray-400 focus:ring-0 focus:outline-none focus:ring-offset-0 p-0 resize-none overflow-hidden min-h-[24px] max-h-[200px] shadow-none text-shadow-none"
            disabled={isLoading}
            rows={1}
            style={{
              height: "auto",
              minHeight: "24px",
              textShadow: "none",
              WebkitTextFillColor: "white",
            }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement
              target.style.height = "auto"
              target.style.height = Math.min(target.scrollHeight, 200) + "px"
            }}
          />

          {/* Desktop Input Controls */}
          <div className="flex items-center justify-between mt-4 pt-4">
            <div className="flex items-center space-x-4">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white"
                onClick={handleFileUpload}
              >
                <Paperclip className="h-4 w-4" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={
                      isSearchSelected
                        ? "text-gray-400 bg-gray-500/20 hover:text-gray-300"
                        : "text-gray-400 hover:text-white"
                    }
                    onClick={() => setIsSearchSelected(!isSearchSelected)}
                  >
                    <Search className="h-4 w-4 mr-2" />
                    {searchMode}
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-800 border-gray-700">
                  <DropdownMenuItem onClick={() => setSearchMode("SmartSearch")}>SmartSearch</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSearchMode("DeepSearch")}>DeepSearch</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSearchMode("QuickSearch")}>QuickSearch</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                className={
                  isThinkSelected
                    ? "text-gray-400 bg-gray-500/20 hover:text-gray-300"
                    : "text-gray-400 hover:text-white"
                }
                onClick={() => setIsThinkSelected(!isThinkSelected)}
              >
                <Lightbulb className="h-4 w-4 mr-2" />
                Think
              </Button>
            </div>

            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    {selectedModel}
                    <ChevronDown className="h-4 w-4 ml-2" />
                    <ChevronUp className="h-4 w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-800 border-gray-700">
                  <DropdownMenuItem onClick={() => setSelectedModel("CHATAI Pro")}>CHATAI Pro</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedModel("CHATAI Standard")}>
                    CHATAI Standard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedModel("CHATAI Lite")}>CHATAI Lite</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-xl"
              >
                {isLoading ? <Square className="h-4 w-4" /> : <Send className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Desktop Feature Buttons */}
        {!isMobile && (
          <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
            <Button
              variant="ghost"
              size="sm"
              className="bg-gray-800/50 border border-gray-700 text-white hover:bg-gray-700/50 rounded-xl px-4 py-2"
              onClick={() => handleFeatureClick("generate an image of")}
            >
              <ImageIcon className="h-4 w-4 mr-2" />
              Create Images
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="bg-gray-800/50 border border-gray-700 text-white hover:bg-gray-700/50 rounded-xl px-4 py-2"
              onClick={() => handleFeatureClick("edit and improve this content:")}
            >
              <Edit3 className="h-4 w-4 mr-2" />
              Edit Content
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="bg-gray-800/50 border border-gray-700 text-white hover:bg-gray-700/50 rounded-xl px-4 py-2"
              onClick={() => handleFeatureClick("what's the latest news about")}
            >
              <Newspaper className="h-4 w-4 mr-2" />
              Latest News
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-gray-800/50 border border-gray-700 text-white hover:bg-gray-700/50 rounded-xl px-4 py-2"
                >
                  <Code className="h-4 w-4 mr-2" />
                  Code
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-800 border-gray-700">
                <DropdownMenuItem onClick={() => handleFeatureClick("generate code: help me")}>
                  Generate Code
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFeatureClick("debug code: help me")}>
                  Debug Code
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFeatureClick("explain code: help me")}>
                  Explain Code
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFeatureClick("optimize code: help me")}>
                  Optimize Code
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFeatureClick("code review: help me")}>
                  Code Review
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="sm"
              className="bg-gray-800/50 border border-gray-700 text-white hover:bg-gray-700/50 rounded-xl px-4 py-2 relative"
              onClick={() => handleFeatureClick("create a workspace for")}
            >
              <Briefcase className="h-4 w-4 mr-2" />
              Workspaces
              <span className="ml-2 bg-gray-600 text-xs px-2 py-1 rounded-full">New</span>
            </Button>
          </div>
        )}

        <p className="text-xs text-gray-500 mt-3 text-center">
          CHATAI can make mistakes. Consider checking important information.
        </p>
      </form>
    </div>
  )

  if (messages.length === 0) {
    return (
      <div className="flex flex-col h-full bg-black">
        {/* Welcome Screen */}
        <div
          className={`flex-1 flex flex-col items-center ${isMobile ? "justify-start pt-8" : "justify-center"} p-8 ${isMobile ? "pb-32" : ""}`}
        >
          {/* Logo */}
          <div className="flex items-center justify-center mb-8">
            <div className="w-12 h-12 bg-gray-600 rounded-2xl flex items-center justify-center mr-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">CHATAI</h1>
          </div>

          {/* Mobile Feature Buttons - Only show when no messages and on mobile */}
          {isMobile && (
            <div className="flex flex-col items-center gap-3 mb-8 w-full max-w-sm">
              <Button
                variant="ghost"
                className="w-full bg-gray-800/50 border border-gray-700 text-white hover:bg-gray-700/50 rounded-xl px-6 py-3"
                onClick={() => handleFeatureClick("generate an image of")}
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                Create Images
              </Button>

              <Button
                variant="ghost"
                className="w-full bg-gray-800/50 border border-gray-700 text-white hover:bg-gray-700/50 rounded-xl px-6 py-3"
                onClick={() => handleFeatureClick("edit and improve this content:")}
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Edit Content
              </Button>

              <Button
                variant="ghost"
                className="w-full bg-gray-800/50 border border-gray-700 text-white hover:bg-gray-700/50 rounded-xl px-6 py-3"
                onClick={() => handleFeatureClick("what's the latest news about")}
              >
                <Newspaper className="h-4 w-4 mr-2" />
                Latest News
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full bg-gray-800/50 border border-gray-700 text-white hover:bg-gray-700/50 rounded-xl px-6 py-3"
                  >
                    <Code className="h-4 w-4 mr-2" />
                    Code
                    <ChevronDown className="h-4 w-4 ml-auto" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-800 border-gray-700 w-full">
                  <DropdownMenuItem onClick={() => handleFeatureClick("generate code: help me")}>
                    Generate Code
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleFeatureClick("debug code: help me")}>
                    Debug Code
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleFeatureClick("explain code: help me")}>
                    Explain Code
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleFeatureClick("optimize code: help me")}>
                    Optimize Code
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleFeatureClick("code review: help me")}>
                    Code Review
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant="ghost"
                className="w-full bg-gray-800/50 border border-gray-700 text-white hover:bg-gray-700/50 rounded-xl px-6 py-3 relative"
                onClick={() => handleFeatureClick("create a workspace for")}
              >
                <Briefcase className="h-4 w-4 mr-2" />
                Workspaces
                <span className="ml-2 bg-gray-600 text-xs px-2 py-1 rounded-full">New</span>
              </Button>
            </div>
          )}

          {/* Desktop Main Input */}
          {!isMobile && (
            <div className="w-full max-w-4xl mb-8">
              <form onSubmit={handleSubmit} className="relative">
                <div className="relative bg-gray-800/50 rounded-2xl border border-gray-700 p-4">
                  <textarea
                    value={input}
                    onChange={(e) => handleInputChange(e as any)}
                    placeholder="What do you want to know?"
                    className="w-full bg-transparent border-none text-white text-lg placeholder:text-gray-400 focus:ring-0 focus:outline-none focus:ring-offset-0 p-0 resize-none overflow-hidden min-h-[24px] max-h-[200px] shadow-none text-shadow-none"
                    disabled={isLoading}
                    rows={1}
                    style={{
                      height: "auto",
                      minHeight: "24px",
                      textShadow: "none",
                      WebkitTextFillColor: "white",
                    }}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement
                      target.style.height = "auto"
                      target.style.height = Math.min(target.scrollHeight, 200) + "px"
                    }}
                  />

                  {/* Input Controls */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
                    <div className="flex items-center space-x-4">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-white"
                        onClick={handleFileUpload}
                      >
                        <Paperclip className="h-4 w-4" />
                      </Button>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className={
                              isSearchSelected
                                ? "text-gray-400 bg-gray-500/20 hover:text-gray-300"
                                : "text-gray-400 hover:text-white"
                            }
                            onClick={() => setIsSearchSelected(!isSearchSelected)}
                          >
                            <Search className="h-4 w-4 mr-2" />
                            {searchMode}
                            <ChevronDown className="h-4 w-4 ml-2" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-gray-800 border-gray-700">
                          <DropdownMenuItem onClick={() => setSearchMode("SmartSearch")}>SmartSearch</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSearchMode("DeepSearch")}>DeepSearch</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSearchMode("QuickSearch")}>QuickSearch</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className={
                          isThinkSelected
                            ? "text-gray-400 bg-gray-500/20 hover:text-gray-300"
                            : "text-gray-400 hover:text-white"
                        }
                        onClick={() => setIsThinkSelected(!isThinkSelected)}
                      >
                        <Lightbulb className="h-4 w-4 mr-2" />
                        Think
                      </Button>
                    </div>

                    <div className="flex items-center space-x-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                            {selectedModel}
                            <ChevronDown className="h-4 w-4 ml-2" />
                            <ChevronUp className="h-4 w-4 ml-1" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-gray-800 border-gray-700">
                          <DropdownMenuItem onClick={() => setSelectedModel("CHATAI Pro")}>CHATAI Pro</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSelectedModel("CHATAI Standard")}>
                            CHATAI Standard
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSelectedModel("CHATAI Lite")}>
                            CHATAI Lite
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      <Button
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-xl"
                      >
                        {isLoading ? <Square className="h-4 w-4" /> : <Send className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* Desktop Feature Buttons */}
          {!isMobile && (
            <div className="flex flex-wrap items-center justify-center gap-4 max-w-4xl">
              <Button
                variant="ghost"
                className="bg-gray-800/50 border border-gray-700 text-white hover:bg-gray-700/50 rounded-xl px-6 py-3"
                onClick={() => handleFeatureClick("generate an image of")}
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                Create Images
              </Button>

              <Button
                variant="ghost"
                className="bg-gray-800/50 border border-gray-700 text-white hover:bg-gray-700/50 rounded-xl px-6 py-3"
                onClick={() => handleFeatureClick("edit and improve this content:")}
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Edit Content
              </Button>

              <Button
                variant="ghost"
                className="bg-gray-800/50 border border-gray-700 text-white hover:bg-gray-700/50 rounded-xl px-6 py-3"
                onClick={() => handleFeatureClick("what's the latest news about")}
              >
                <Newspaper className="h-4 w-4 mr-2" />
                Latest News
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="bg-gray-800/50 border border-gray-700 text-white hover:bg-gray-700/50 rounded-xl px-6 py-3"
                  >
                    <Code className="h-4 w-4 mr-2" />
                    Code
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-800 border-gray-700">
                  <DropdownMenuItem onClick={() => handleFeatureClick("generate code: help me")}>
                    Generate Code
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleFeatureClick("debug code: help me")}>
                    Debug Code
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleFeatureClick("explain code: help me")}>
                    Explain Code
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleFeatureClick("optimize code: help me")}>
                    Optimize Code
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleFeatureClick("code review: help me")}>
                    Code Review
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant="ghost"
                className="bg-gray-800/50 border border-gray-700 text-white hover:bg-gray-700/50 rounded-xl px-6 py-3 relative"
                onClick={() => handleFeatureClick("create a workspace for")}
              >
                <Briefcase className="h-4 w-4 mr-2" />
                Workspaces
                <span className="ml-2 bg-gray-600 text-xs px-2 py-1 rounded-full">New</span>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Fixed Input */}
        {isMobile && renderMobileInput()}
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-black">
      {/* Messages Area */}
      <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${isMobile ? "pb-32" : ""}`}>
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      {isMobile ? renderMobileInput() : renderDesktopInput()}
    </div>
  )
}
