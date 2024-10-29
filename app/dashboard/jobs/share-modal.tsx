"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  CheckCircle
} from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface ShareModalProps {
  job: Job | null
  isOpen: boolean
  onClose: () => void
}

export function ShareModal({ job, isOpen, onClose }: ShareModalProps) {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)

  if (!job) return null

  const jobUrl = `${window.location.origin}/jobs/${job.id}`

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(jobUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(jobUrl)}&text=${encodeURIComponent(`Check out this job: ${job.title}`)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(jobUrl)}`
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(jobUrl)
    setCopied(true)
    toast({
      title: "Link copied",
      description: "Job link has been copied to clipboard",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Job</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-4 py-4">
          <Button
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-4"
            onClick={() => window.open(shareLinks.facebook, "_blank")}
          >
            <Facebook className="h-6 w-6 text-blue-600" />
            <span className="text-xs">Facebook</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-4"
            onClick={() => window.open(shareLinks.twitter, "_blank")}
          >
            <Twitter className="h-6 w-6 text-blue-400" />
            <span className="text-xs">Twitter</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-4"
            onClick={() => window.open(shareLinks.linkedin, "_blank")}
          >
            <Linkedin className="h-6 w-6 text-blue-700" />
            <span className="text-xs">LinkedIn</span>
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={handleCopyLink}
          >
            {copied ? (
              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
            ) : (
              <LinkIcon className="mr-2 h-4 w-4" />
            )}
            {copied ? "Copied!" : "Copy Link"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
