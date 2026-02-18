"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import type { User as AuthUser } from "@/lib/auth"
import { Globe, User, Volume2, Eye, Type, Save, MessageCircle } from "lucide-react"

const languages = [
  { code: "en", name: "English", label: "EN" },
  { code: "es", name: "Spanish", label: "ES" },
  { code: "fr", name: "French", label: "FR" },
  { code: "de", name: "German", label: "DE" },
  { code: "zh", name: "Chinese", label: "ZH" },
  { code: "ja", name: "Japanese", label: "JA" },
]

const aiPersonas = [
  { id: "professional", name: "Professional Assistant", icon: "PRO" },
  { id: "creative", name: "Creative Writer", icon: "CRT" },
  { id: "teacher", name: "Patient Teacher", icon: "TCH" },
  { id: "casual", name: "Casual Friend", icon: "CAS" },
]

type UserPreferencesState = AuthUser["preferences"]

const defaultPreferences: UserPreferencesState = {
  theme: "dark",
  language: "en",
  aiPersona: "professional",
  voiceEnabled: true,
  highContrast: false,
  fontSize: "medium",
}

export function UserPreferences() {
  const { user, updatePreferences } = useAuth()
  const { toast } = useToast()
  const [preferences, setPreferences] = useState<UserPreferencesState>(user?.preferences ?? defaultPreferences)

  const handleSave = () => {
    updatePreferences(preferences)
    toast({
      title: "Preferences saved",
      description: "Your settings have been updated successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-gray-900/20 to-gray-800/20 border-gray-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MessageCircle className="w-6 h-6 text-gray-400" />
              <div>
                <h3 className="font-semibold text-white">Test Your Settings</h3>
                <p className="text-sm text-gray-400">Try your customized AI experience in a real conversation</p>
              </div>
            </div>
            <Link href="/chat">
              <Button className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800">
                Start Conversation
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-900/30 border-gray-800 hover:border-gray-700 transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Globe className="w-5 h-5 mr-2 text-gray-400" />
            Language
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => setPreferences((prev) => ({ ...prev, language: language.code }))}
                className={`p-3 rounded-xl border-2 transition-all ${
                  preferences.language === language.code
                    ? "border-gray-500 bg-gray-900/20"
                    : "border-gray-700 hover:border-gray-600"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-xs rounded border border-gray-600 px-2 py-1 text-gray-300">{language.label}</span>
                  <span className="text-sm font-medium text-white">{language.name}</span>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-900/30 border-gray-800 hover:border-gray-700 transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <User className="w-5 h-5 mr-2 text-gray-400" />
            AI Personality
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {aiPersonas.map((persona) => (
              <button
                key={persona.id}
                onClick={() => setPreferences((prev) => ({ ...prev, aiPersona: persona.id }))}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  preferences.aiPersona === persona.id
                    ? "border-gray-500 bg-gray-900/20"
                    : "border-gray-700 hover:border-gray-600"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xs rounded border border-gray-600 px-2 py-1 text-gray-300">{persona.icon}</span>
                  <span className="font-medium text-white">{persona.name}</span>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-900/30 border-gray-800 hover:border-gray-700 transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Eye className="w-5 h-5 mr-2 text-gray-400" />
            Accessibility
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Volume2 className="w-5 h-5 text-gray-400" />
              <div>
                <Label className="font-medium text-white">Voice Interaction</Label>
                <p className="text-sm text-gray-400">Enable voice input and output</p>
              </div>
            </div>
            <Switch
              checked={preferences.voiceEnabled}
              onCheckedChange={(checked) => setPreferences((prev) => ({ ...prev, voiceEnabled: checked }))}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Eye className="w-5 h-5 text-gray-400" />
              <div>
                <Label className="font-medium text-white">High Contrast Mode</Label>
                <p className="text-sm text-gray-400">Improve visibility and readability</p>
              </div>
            </div>
            <Switch
              checked={preferences.highContrast}
              onCheckedChange={(checked) => setPreferences((prev) => ({ ...prev, highContrast: checked }))}
            />
          </div>

          <div>
            <div className="flex items-center space-x-3 mb-3">
              <Type className="w-5 h-5 text-gray-400" />
              <Label className="font-medium text-white">Font Size</Label>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(["small", "medium", "large"] as const).map((size) => (
                <button
                  key={size}
                  onClick={() =>
                    setPreferences((prev) => ({
                      ...prev,
                      fontSize: size,
                    }))
                  }
                  className={`p-2 rounded-lg border transition-all capitalize ${
                    preferences.fontSize === size
                      ? "border-gray-500 bg-gray-900/20 text-gray-400"
                      : "border-gray-700 hover:border-gray-600 text-white"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex space-x-3">
        <Button
          onClick={handleSave}
          className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Preferences
        </Button>
        <Link href="/chat">
          <Button variant="outline" className="px-6 border-gray-700 text-white hover:bg-gray-800">
            <MessageCircle className="w-4 h-4 mr-2" />
            Test Now
          </Button>
        </Link>
      </div>
    </div>
  )
}
