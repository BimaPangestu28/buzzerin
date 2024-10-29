"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Clock, Users, DollarSign } from "lucide-react"
import { formatDistance } from "date-fns"

interface JobDetailModalProps {
  job: Job | null
  isOpen: boolean
  onClose: () => void
  onApply: (jobId: string) => void
}

export function JobDetailModal({
  job,
  isOpen,
  onClose,
  onApply
}: JobDetailModalProps) {
  if (!job) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{job.title}</DialogTitle>
          <DialogDescription>Posted by {job.client?.name}</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="space-y-1">
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="mr-2 h-4 w-4" />
                Deadline
              </div>
              <p className="font-medium">
                {formatDistance(new Date(job.deadline), new Date(), { addSuffix: true })}
              </p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center text-sm text-gray-500">
                <Users className="mr-2 h-4 w-4" />
                Available Spots
              </div>
              <p className="font-medium">
                {job.quota.total - job.quota.filled} of {job.quota.total}
              </p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center text-sm text-gray-500">
                <DollarSign className="mr-2 h-4 w-4" />
                Budget
              </div>
              <p className="font-medium">${job.budget.toLocaleString()}</p>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="font-semibold">Description</h3>
            <p className="text-sm text-gray-600">{job.description}</p>
          </div>

          <Separator />

          {/* Goals */}
          <div className="space-y-2">
            <h3 className="font-semibold">Project Goals</h3>
            <ul className="list-disc list-inside space-y-1">
              {job.goals.map((goal, index) => (
                <li key={index} className="text-sm text-gray-600">{goal}</li>
              ))}
            </ul>
          </div>

          <Separator />

          {/* Requirements */}
          <div className="space-y-2">
            <h3 className="font-semibold">Requirements</h3>
            <ul className="list-disc list-inside space-y-1">
              {job.requirements.map((req, index) => (
                <li key={index} className="text-sm text-gray-600">{req}</li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-4 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                onApply(job.id)
                onClose()
              }}
              disabled={job.quota.filled >= job.quota.total}
            >
              {job.quota.filled >= job.quota.total ? "Filled" : "Apply Now"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}