import { MyJobs } from "./my-jobs"

export default function MyJobsPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">My Current Jobs</h1>
      <MyJobs />
    </div>
  )
}