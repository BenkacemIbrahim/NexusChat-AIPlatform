"use client"

import type React from "react"
import Link from "next/link"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Send, MessageCircle, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface FormData {
  firstName: string
  lastName: string
  email: string
  company: string
  subject: string
  message: string
}

interface FormErrors {
  firstName?: string
  lastName?: string
  email?: string
  company?: string
  subject?: string
  message?: string
}

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  })
  const { toast } = useToast()

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters"
    } else if (!/^[a-zA-Z\s]+$/.test(formData.firstName.trim())) {
      newErrors.firstName = "First name can only contain letters"
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters"
    } else if (!/^[a-zA-Z\s]+$/.test(formData.lastName.trim())) {
      newErrors.lastName = "Last name can only contain letters"
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address"
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = "Subject must be at least 5 characters"
    } else if (formData.subject.trim().length > 100) {
      newErrors.subject = "Subject must be less than 100 characters"
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = "Message must be less than 1000 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast({
        title: "Please fix the errors",
        description: "Check the form for validation errors and try again.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call with potential failure
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate random failure for demo
          if (Math.random() > 0.7) {
            reject(new Error("Server error"))
          } else {
            resolve(true)
          }
        }, 2000)
      })

      // Success
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      })

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        subject: "",
        message: "",
      })
      setErrors({})
    } catch {
      // Handle submission error
      toast({
        title: "Failed to send message",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Live Chat Widget for Pre-Login Users */}
      <Card className="bg-gray-900/20 border-gray-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MessageCircle className="w-5 h-5 text-gray-400" />
              <div>
                <h4 className="font-semibold text-gray-100">Need instant help?</h4>
                <p className="text-sm text-gray-300">Try our AI assistant with demo access</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-gray-900/20 text-gray-300 border-gray-600">
                Online
              </Badge>
              <Link href="/chat">
                <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800/50">
                  Chat Now
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-900/30 border-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white">Send us a message</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-white">
                  First Name *
                </Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className={`bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-gray-600 ${errors.firstName ? "border-red-500 bg-red-500/10" : ""
                    }`}
                />
                {errors.firstName && (
                  <div className="flex items-center space-x-1 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.firstName}</span>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-white">
                  Last Name *
                </Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className={`bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-gray-600 ${errors.lastName ? "border-red-500 bg-red-500/10" : ""
                    }`}
                />
                {errors.lastName && (
                  <div className="flex items-center space-x-1 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.lastName}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-gray-600 ${errors.email ? "border-red-500 bg-red-500/10" : ""
                  }`}
              />
              {errors.email && (
                <div className="flex items-center space-x-1 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="company" className="text-white">
                Company (Optional)
              </Label>
              <Input
                id="company"
                placeholder="Your company name"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-gray-600"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject" className="text-white">
                Subject *
              </Label>
              <Input
                id="subject"
                placeholder="How can we help you?"
                value={formData.subject}
                onChange={(e) => handleInputChange("subject", e.target.value)}
                className={`bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-gray-600 ${errors.subject ? "border-red-500 bg-red-500/10" : ""
                  }`}
              />
              {errors.subject && (
                <div className="flex items-center space-x-1 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.subject}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-white">
                Message *
              </Label>
              <Textarea
                id="message"
                placeholder="Tell us more about your inquiry..."
                rows={5}
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                className={`bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-gray-600 ${errors.message ? "border-red-500 bg-red-500/10" : ""
                  }`}
              />
              <div className="flex justify-between items-center">
                {errors.message ? (
                  <div className="flex items-center space-x-1 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.message}</span>
                  </div>
                ) : (
                  <div></div>
                )}
                <span className={`text-sm ${formData.message.length > 1000 ? "text-red-400" : "text-gray-400"}`}>
                  {formData.message.length}/1000
                </span>
              </div>
            </div>

            <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200" disabled={isLoading}>
              {isLoading ? (
                "Sending..."
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
