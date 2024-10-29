"use client";

import { useState } from "react";
import { formatDistance } from "date-fns";
import {
  MoreVertical,
  Share2,
  Flag,
  Clock,
  Users,
  DollarSign,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { JobDetailModal } from "./job-detail-modal";
import { Job } from "@/types";
import { ApplyModal } from "./apply-modal";
import { ReportModal } from "./report-modal";
import { ShareModal } from "./share-modal";

const SAMPLE_JOBS: Job[] = [
  {
    id: "1",
    title: "Website Redesign Project",
    deadline: "2024-12-31",
    description: "Complete website redesign for a corporate client...",
    goals: [
      "Modern and responsive design",
      "Improved user experience",
      "Better performance metrics",
    ],
    requirements: [
      "5+ years of web design experience",
      "Strong portfolio",
      "Experience with React",
    ],
    quota: {
      total: 3,
      filled: 1,
    },
    budget: 5000,
    status: "open",
    client: {
      name: "Tech Corp",
      avatar: "/tech-corp.png",
    },
  },
  // Add more sample jobs...
];

export function JobList() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isApplyOpen, setIsApplyOpen] = useState(false);

  const handleShare = (job: Job) => {
    setSelectedJob(job);
    setIsShareOpen(true);
  };

  const handleReport = (job: Job) => {
    setSelectedJob(job);
    setIsReportOpen(true);
  };

  const handleApply = (job: Job) => {
    setSelectedJob(job);
    setIsApplyOpen(true);
  };

  const openJobDetail = (job: Job) => {
    setSelectedJob(job);
    setIsDetailOpen(true);
  };

  return (
    <div className="grid gap-6">
      {SAMPLE_JOBS.map((job) => (
        <Card key={job.id} className="relative">
          <CardHeader className="grid grid-cols-[1fr,auto] items-start gap-4 space-y-0">
            <div>
              <div className="flex items-center space-x-4">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={job.client.avatar} />
                  <AvatarFallback>{job.client.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-xl">{job.title}</CardTitle>
                  <CardDescription>{job.client.name}</CardDescription>
                </div>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleShare(job)}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleReport(job)}
                  className="text-red-600"
                >
                  <Flag className="mr-2 h-4 w-4" />
                  Report
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-500 line-clamp-2">
                {job.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="mr-2 h-4 w-4" />
                  {formatDistance(new Date(job.deadline), new Date(), {
                    addSuffix: true,
                  })}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="mr-2 h-4 w-4" />
                  {job.quota.filled}/{job.quota.total} spots filled
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <DollarSign className="mr-2 h-4 w-4" />$
                  {job.budget.toLocaleString()}
                </div>
              </div>

              <Progress
                value={(job.quota.filled / job.quota.total) * 100}
                className="h-2"
              />

              <div className="flex flex-wrap gap-2">
                {job.goals.slice(0, 3).map((goal, index) => (
                  <Badge key={index} variant="secondary">
                    {goal}
                  </Badge>
                ))}
                {job.goals.length > 3 && (
                  <Badge variant="secondary">
                    +{job.goals.length - 3} more
                  </Badge>
                )}
              </div>

              <div className="flex justify-between items-center pt-4">
                <Button variant="outline" onClick={() => openJobDetail(job)}>
                  View Details
                </Button>
                <Button
                  onClick={() => handleApply(job)}
                  disabled={job.quota.filled >= job.quota.total}
                >
                  {job.quota.filled >= job.quota.total ? "Filled" : "Apply Now"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <ShareModal
        job={selectedJob}
        isOpen={isShareOpen}
        onClose={() => {
          setIsShareOpen(false);
          setSelectedJob(null);
        }}
      />

      <ReportModal
        job={selectedJob}
        isOpen={isReportOpen}
        onClose={() => {
          setIsReportOpen(false);
          setSelectedJob(null);
        }}
      />

      <ApplyModal
        job={selectedJob}
        isOpen={isApplyOpen}
        onClose={() => {
          setIsApplyOpen(false);
          setSelectedJob(null);
        }}
      />

      <JobDetailModal
        job={selectedJob}
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setSelectedJob(null);
        }}
        onApply={handleApply}
      />
    </div>
  );
}
