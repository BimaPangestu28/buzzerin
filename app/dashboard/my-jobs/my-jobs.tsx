"use client"

import { useState } from "react"
import { format } from "date-fns"
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { 
  Clock,
  Upload,
  DollarSign,
  ChevronDown,
  ChevronUp
} from "lucide-react"
import { UploadEvidenceModal } from "./upload-evidence-modal"
import { cn } from "@/lib/utils"

const SAMPLE_JOBS: Job[] = [
  {
    id: "1",
    title: "Website Redesign Project",
    client: {
      name: "John Doe",
      avatar: "/avatar.png"
    },
    deadline: "2024-12-31",
    budget: 5000,
    progress: 60,
    status: "in_progress",
    milestones: [
      {
        id: "m1",
        title: "Homepage Design",
        status: "completed",
        due_date: "2024-11-30",
        evidence: [
          {
            id: "e1",
            fileName: "homepage-design.pdf",
            fileSize: 2500000,
            fileType: "application/pdf",
            uploadedAt: "2024-10-25",
            url: "/files/homepage-design.pdf"
          }
        ]
      },
      {
        id: "m2",
        title: "Responsive Implementation",
        status: "pending",
        due_date: "2024-12-15"
      }
    ]
  }
  // Add more sample jobs as needed
]

export function MyJobs() {
  const [expandedJob, setExpandedJob] = useState<string | null>(null)
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

  const toggleJobExpand = (jobId: string) => {
    setExpandedJob(expandedJob === jobId ? null : jobId)
  }

  const handleUploadEvidence = (milestone: Milestone) => {
    setSelectedMilestone(milestone)
    setIsUploadModalOpen(true)
  }

  return (
    <div className="space-y-6">
      {SAMPLE_JOBS.map((job) => (
        <Card key={job.id}>
          <CardHeader className="cursor-pointer" onClick={() => toggleJobExpand(job.id)}>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle>{job.title}</CardTitle>
                <div className="text-sm text-gray-500">Client: {job.client.name}</div>
              </div>
              {expandedJob === job.id ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-500">Progress</span>
                <span className="text-sm font-medium">{job.progress}%</span>
              </div>
              <Progress value={job.progress} />
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="mr-2 h-4 w-4" />
                <span>Due: {format(new Date(job.deadline), 'MMM dd, yyyy')}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <DollarSign className="mr-2 h-4 w-4" />
                <span>${job.budget.toLocaleString()}</span>
              </div>
              <div className="flex items-center">
                <span className={cn(
                  "px-2.5 py-0.5 rounded-full text-xs font-medium",
                  {
                    "bg-blue-100 text-blue-800": job.status === "in_progress",
                    "bg-yellow-100 text-yellow-800": job.status === "review",
                    "bg-green-100 text-green-800": job.status === "completed",
                  }
                )}>
                  {job.status.replace("_", " ").toUpperCase()}
                </span>
              </div>
            </div>

            {expandedJob === job.id && (
              <div className="border-t pt-4 mt-4">
                <h3 className="font-medium mb-4">Milestones</h3>
                <div className="space-y-4">
                  {job.milestones.map((milestone) => (
                    <div key={milestone.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-medium">{milestone.title}</h4>
                          <p className="text-sm text-gray-500">
                            Due: {format(new Date(milestone.due_date), 'MMM dd, yyyy')}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUploadEvidence(milestone)}
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Evidence
                        </Button>
                      </div>
                      
                      {milestone.evidence && milestone.evidence.length > 0 && (
                        <div className="mt-3 space-y-2">
                          <p className="text-sm font-medium">Uploaded Evidence:</p>
                          {milestone.evidence.map((evidence) => (
                            <div 
                              key={evidence.id}
                              className="flex items-center justify-between text-sm bg-white p-2 rounded"
                            >
                              <span>{evidence.fileName}</span>
                              <span className="text-gray-500">
                                {format(new Date(evidence.uploadedAt), 'MMM dd, yyyy')}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      <UploadEvidenceModal
        isOpen={isUploadModalOpen}
        onClose={() => {
          setIsUploadModalOpen(false)
          setSelectedMilestone(null)
        }}
        milestone={selectedMilestone}
      />
    </div>
  )
}