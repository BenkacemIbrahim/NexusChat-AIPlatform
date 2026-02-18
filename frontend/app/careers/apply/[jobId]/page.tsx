import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { ArrowLeft, Upload } from "lucide-react"

const jobData = {
  "sr-ai-research-engineer": {
    title: "Senior AI Research Engineer",
    department: "Engineering",
    location: "Remote",
  },
  "frontend-engineer": {
    title: "Frontend Engineer",
    department: "Engineering",
    location: "Remote",
  },
  "product-manager": {
    title: "Product Manager",
    department: "Product",
    location: "Remote",
  },
  "devops-engineer": {
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Remote",
  },
  "ai-safety-researcher": {
    title: "AI Safety Researcher",
    department: "Research",
    location: "Remote",
  },
  "marketing-manager": {
    title: "Marketing Manager",
    department: "Marketing",
    location: "Remote",
  },
}

export default async function JobApplicationPage({ params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = await params
  const job = jobData[jobId as keyof typeof jobData] || {
    title: "Unknown Position",
    department: "General",
    location: "Remote",
  }

  return (
    <div className="min-h-screen bg-black text-white pre-login-page">
      <Navbar />
      <div className="pt-20 pb-20">
        <div className="container mx-auto max-w-3xl px-4">
          <Link href="/careers" className="inline-flex items-center text-gray-400 hover:text-white mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to all positions
          </Link>

          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">{job.title}</h1>
            <div className="flex items-center text-gray-400 space-x-4">
              <span>{job.department}</span>
              <span>|</span>
              <span>{job.location}</span>
            </div>
          </div>

          <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Application Form</h2>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                    First Name *
                  </label>
                  <Input
                    id="firstName"
                    placeholder="Enter your first name"
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                    Last Name *
                  </label>
                  <Input
                    id="lastName"
                    placeholder="Enter your last name"
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address *
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              <div>
                <label htmlFor="linkedin" className="block text-sm font-medium text-gray-300 mb-2">
                  LinkedIn Profile
                </label>
                <Input
                  id="linkedin"
                  type="url"
                  placeholder="https://linkedin.com/in/yourprofile"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              <div>
                <label htmlFor="resume" className="block text-sm font-medium text-gray-300 mb-2">
                  Resume/CV *
                </label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="resume-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-3 text-gray-300" />
                      <p className="mb-2 text-sm text-gray-300">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-400">PDF, DOCX or RTF (MAX. 5MB)</p>
                    </div>
                    <input id="resume-upload" type="file" className="hidden" accept=".pdf,.docx,.rtf" required />
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Please upload your most recent resume or CV. Accepted formats: PDF, DOCX, RTF
                </p>
              </div>

              <div>
                <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-300 mb-2">
                  Cover Letter
                </label>
                <Textarea
                  id="coverLetter"
                  placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                  className="bg-gray-800 border-gray-700 text-white min-h-[150px]"
                />
              </div>

              <div>
                <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200">
                  Submit Application
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
