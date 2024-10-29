"use client"

import { useState } from "react"
import { format } from "date-fns"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Clock,
  FileText,
  AlertCircle,
  CheckCircle,
  XCircle,
  Download
} from "lucide-react"

// Sample data
const TRANSACTION: Transaction = {
  id: "tr-123",
  jobId: "job-123",
  employerId: "emp-123",
  amount: 1500,
  status: "waiting_for_approval",
  createdAt: "2024-02-20T10:00:00Z",
  updatedAt: "2024-02-20T10:00:00Z",
  paymentMethod: "Bank Transfer",
  invoice: {
    number: "INV/2024/02/001",
    date: "2024-02-20",
    dueDate: "2024-02-27",
    items: [
      {
        description: "Basic Post Package x 5",
        quantity: 5,
        price: 200,
        total: 1000
      },
      {
        description: "Premium Content Package x 1",
        quantity: 1,
        price: 500,
        total: 500
      }
    ]
  }
}

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("transaction")

  const getStatusColor = (status: TransactionStatus) => {
    switch (status) {
      case 'waiting_for_approval':
        return 'bg-yellow-100 text-yellow-800'
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      case 'in_progress':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: TransactionStatus) => {
    switch (status) {
      case 'waiting_for_approval':
        return <Clock className="h-5 w-5" />
      case 'approved':
        return <CheckCircle className="h-5 w-5" />
      case 'rejected':
        return <XCircle className="h-5 w-5" />
      case 'in_progress':
        return <Clock className="h-5 w-5" />
      case 'completed':
        return <CheckCircle className="h-5 w-5" />
      case 'cancelled':
        return <XCircle className="h-5 w-5" />
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Job Transaction Details</h1>
        <div className="flex items-center space-x-4">
          <Badge 
            variant="outline" 
            className={getStatusColor(TRANSACTION.status)}
          >
            {TRANSACTION.status.replace('_', ' ').toUpperCase()}
          </Badge>
          <span className="text-gray-500">
            Transaction ID: {TRANSACTION.id}
          </span>
        </div>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="transaction">Transaction</TabsTrigger>
          <TabsTrigger value="job">Job Details</TabsTrigger>
          <TabsTrigger value="invoice">Invoice</TabsTrigger>
        </TabsList>

        {/* Transaction Details */}
        <TabsContent value="transaction">
          <Card>
            <CardHeader>
              <CardTitle>Transaction Details</CardTitle>
              <CardDescription>
                Overview of your transaction
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(TRANSACTION.status)}
                    <span className="font-medium">
                      {TRANSACTION.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Amount</p>
                  <p className="font-medium">${TRANSACTION.amount}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Created Date</p>
                  <p className="font-medium">
                    {format(new Date(TRANSACTION.createdAt), 'PPP')}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Payment Method</p>
                  <p className="font-medium">{TRANSACTION.paymentMethod}</p>
                </div>
              </div>

              {TRANSACTION.status === 'waiting_for_approval' && (
                <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 flex items-center space-x-3">
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="font-medium text-yellow-800">
                      Waiting for Admin Approval
                    </p>
                    <p className="text-sm text-yellow-700">
                      Your job post is being reviewed by our admin team. This usually
                      takes 1-2 business days.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Job Details */}
        <TabsContent value="job">
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Selected Packages</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Package</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {TRANSACTION.invoice.items.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.description}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>${item.price}</TableCell>
                          <TableCell className="text-right">
                            ${item.total}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Target Audience</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {/* Add your target audience details here */}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Invoice */}
        <TabsContent value="invoice">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Invoice</CardTitle>
                  <CardDescription>
                    Invoice #{TRANSACTION.invoice.number}
                  </CardDescription>
                </div>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Invoice Date
                    </p>
                    <p className="font-medium">
                      {format(new Date(TRANSACTION.invoice.date), 'PPP')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Due Date
                    </p>
                    <p className="font-medium">
                      {format(new Date(TRANSACTION.invoice.dueDate), 'PPP')}
                    </p>
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[400px]">Description</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Unit Price</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {TRANSACTION.invoice.items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.description}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>${item.price}</TableCell>
                        <TableCell className="text-right">
                          ${item.total}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={3} className="text-right font-medium">
                        Total
                      </TableCell>
                      <TableCell className="text-right font-bold">
                        ${TRANSACTION.amount}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}