"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Bell,
  Briefcase,
  CheckCircle,
  Clock,
  DollarSign,
  Star,
  AlertCircle,
  ChevronRight
} from "lucide-react"
import Link from "next/link"
import { formatDistance, format } from "date-fns"
import { TopupModal } from "./topup-modal"
import { WithdrawModal } from "./withdraw-modal"

// Sample data
const SAMPLE_USER: UserProfile = {
  type: 'freelancer',
  name: 'John Doe',
  avatar: '/avatar.png',
  points: 1500,
  balance: 2500
}

const SAMPLE_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'success',
    message: 'Your milestone for "Website Redesign" has been approved!',
    timestamp: '2024-10-28T10:00:00Z',
    isRead: false
  },
  {
    id: '2',
    type: 'info',
    message: 'New job matching your skills is available',
    timestamp: '2024-10-28T09:00:00Z',
    isRead: false
  }
]

const SAMPLE_RELATED_JOBS: RelatedJob[] = [
  {
    id: '1',
    title: 'E-commerce Website Development',
    budget: 3000,
    deadline: '2024-12-31',
    skillMatch: 95,
    description: 'Looking for a skilled developer to build an e-commerce website...'
  },
  // Add more related jobs...
]

export default function DashboardPage() {
  const [isTopupOpen, setIsTopupOpen] = useState(false)
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false)
  const isFreelancer = SAMPLE_USER.type === 'freelancer'

  return (
    <div className="space-y-6">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Projects
            </CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Projects
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +3 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {isFreelancer ? 'Available Points' : 'Available Balance'}
            </CardTitle>
            {isFreelancer ? (
              <Star className="h-4 w-4 text-muted-foreground" />
            ) : (
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            )}
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold">
                  {isFreelancer 
                    ? `${SAMPLE_USER.points?.toLocaleString()} pts` 
                    : `$${SAMPLE_USER.balance?.toLocaleString()}`
                  }
                </div>
                <p className="text-xs text-muted-foreground">
                  Available to {isFreelancer ? 'withdraw' : 'spend'}
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => isFreelancer 
                  ? setIsWithdrawOpen(true)
                  : setIsTopupOpen(true)
                }
              >
                {isFreelancer ? 'Withdraw' : 'Top Up'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Current Projects */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[1, 2].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Website Redesign Project</h3>
                        <p className="text-sm text-muted-foreground">Client: Tech Corp</p>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href="/dashboard/my-jobs">
                          View Details
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                    <div className="flex items-center text-sm space-x-4">
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>Due in 5 days</span>
                      </div>
                      <div>Progress: 60%</div>
                    </div>
                    <Progress value={60} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Related Jobs (Only for Freelancer) */}
          {isFreelancer && (
            <Card>
              <CardHeader>
                <CardTitle>Recommended Jobs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {SAMPLE_RELATED_JOBS.map((job) => (
                    <div
                      key={job.id}
                      className="flex items-center justify-between p-4 rounded-lg border"
                    >
                      <div className="space-y-1">
                        <h3 className="font-medium">{job.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>${job.budget}</span>
                          <span>Due {format(new Date(job.deadline), 'MMM dd')}</span>
                          <span className="text-green-600">{job.skillMatch}% match</span>
                        </div>
                      </div>
                      <Button>Apply Now</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Notifications</CardTitle>
              <Button variant="ghost" size="sm" className="text-primary">
                Mark all as read
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {SAMPLE_NOTIFICATIONS.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg border ${
                      notification.isRead ? 'bg-background' : 'bg-primary/5'
                    }`}
                  >
                    <div className="flex space-x-2">
                      {notification.type === 'success' ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : notification.type === 'warning' ? (
                        <AlertCircle className="h-5 w-5 text-yellow-500" />
                      ) : (
                        <Bell className="h-5 w-5 text-blue-500" />
                      )}
                      <div className="space-y-1">
                        <p className="text-sm">{notification.message}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDistance(new Date(notification.timestamp), new Date(), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <TopupModal 
        isOpen={isTopupOpen}
        onClose={() => setIsTopupOpen(false)}
      />
      <WithdrawModal
        isOpen={isWithdrawOpen}
        onClose={() => setIsWithdrawOpen(false)}
        points={SAMPLE_USER.points || 0}
      />
    </div>
  )
}