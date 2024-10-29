"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/hooks/use-toast"

interface ApplyModalProps {
  job: Job | null
  isOpen: boolean
  onClose: () => void
}

export function ApplyModal({ job, isOpen, onClose }: ApplyModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [accepted, setAccepted] = useState(false)
  const { toast } = useToast()

  if (!job) return null

  const handleApply = async () => {
    if (!accepted) {
      toast({
        title: "Error",
        description: "Please accept the terms and conditions",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      // Add your apply logic here
      console.log("Applying for job:", job.id)
      toast({
        title: "Success",
        description: "Your application has been submitted successfully!",
      })
      onClose()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Apply for Job</DialogTitle>
          <DialogDescription>
            Please review and accept the terms before applying
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <ScrollArea className="h-[200px] rounded-md border p-4">
            <div className="space-y-4">
              <h4 className="font-medium">Terms and Conditions</h4>
              <p className="text-sm text-gray-500">
                1. By accepting this job, you agree to complete the work within the specified deadline.
              </p>
              <p className="text-sm text-gray-500">
                2. You must maintain regular communication with the client throughout the project.
              </p>
              <p className="text-sm text-gray-500">
                3. All work submitted must be original and free from plagiarism.
              </p>
              <p className="text-sm text-gray-500">
                4. Payment will be released upon successful completion and client approval.
              </p>
              <p className="text-sm text-gray-500">
                5. You agree to our platform's dispute resolution process if any issues arise.
              </p>
              {/* Add more terms as needed */}
            </div>
          </ScrollArea>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={accepted}
              onCheckedChange={(checked) => setAccepted(checked as boolean)}
            />
            <label
              htmlFor="terms"
              className="text-sm text-gray-500 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I have read and agree to the terms and conditions
            </label>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              onClick={handleApply}
              disabled={isSubmitting || !accepted}
            >
              {isSubmitting ? "Submitting..." : "Confirm Apply"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
