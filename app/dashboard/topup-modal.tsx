"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { 
  CreditCard, 
  Wallet, 
  Building2,
  ChevronRight,
  Check,
  AlertCircle
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface TopupModalProps {
  isOpen: boolean
  onClose: () => void
}

type PaymentMethod = 'credit_card' | 'e_wallet' | 'bank_transfer'

interface PaymentOption {
  id: string
  name: string
  logo?: string
  type: PaymentMethod
}

const PAYMENT_METHODS: Record<PaymentMethod, PaymentOption[]> = {
  credit_card: [
    { id: 'visa', name: 'Visa', type: 'credit_card' },
    { id: 'mastercard', name: 'Mastercard', type: 'credit_card' },
  ],
  e_wallet: [
    { id: 'gopay', name: 'GoPay', type: 'e_wallet' },
    { id: 'ovo', name: 'OVO', type: 'e_wallet' },
    { id: 'dana', name: 'DANA', type: 'e_wallet' },
  ],
  bank_transfer: [
    { id: 'bca', name: 'BCA', type: 'bank_transfer' },
    { id: 'mandiri', name: 'Mandiri', type: 'bank_transfer' },
    { id: 'bni', name: 'BNI', type: 'bank_transfer' },
  ],
}

const QUICK_AMOUNTS = [50, 100, 200, 500]

export function TopupModal({ isOpen, onClose }: TopupModalProps) {
  const [step, setStep] = useState(1)
  const [amount, setAmount] = useState("")
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>()
  const [selectedOption, setSelectedOption] = useState<PaymentOption>()
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const { toast } = useToast()

  const handleQuickAmount = (value: number) => {
    setAmount(value.toString())
  }

  const handleMethodSelect = (method: PaymentMethod) => {
    setSelectedMethod(method)
    setSelectedOption(undefined)
    setStep(2)
  }

  const handleOptionSelect = (option: PaymentOption) => {
    setSelectedOption(option)
  }

  const handleBack = () => {
    if (step === 2) {
      setStep(1)
      setSelectedMethod(undefined)
      setSelectedOption(undefined)
    }
  }

  const validateAmount = () => {
    const numAmount = Number(amount)
    if (!amount || isNaN(numAmount)) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount",
        variant: "destructive",
      })
      return false
    }
    if (numAmount < 10) {
      toast({
        title: "Invalid Amount",
        description: "Minimum top up amount is $10",
        variant: "destructive",
      })
      return false
    }
    return true
  }

  const handleConfirm = async () => {
    if (!validateAmount()) return
    if (!selectedOption) {
      toast({
        title: "Payment Method Required",
        description: "Please select a payment method",
        variant: "destructive",
      })
      return
    }
    setIsConfirmOpen(true)
  }

  const handleTopup = async () => {
    setIsConfirmOpen(false)
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast({
        title: "Top Up Successful",
        description: `Successfully topped up $${amount}`,
      })
      
      // Reset form
      setAmount("")
      setSelectedMethod(undefined)
      setSelectedOption(undefined)
      setStep(1)
      onClose()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process top up. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Top Up Balance</DialogTitle>
            <DialogDescription>
              Add funds to your account balance
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Amount Input */}
            <div className="space-y-4">
              <Label>Amount (USD)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-7"
                  placeholder="0.00"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {QUICK_AMOUNTS.map((value) => (
                  <Button
                    key={value}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickAmount(value)}
                  >
                    ${value}
                  </Button>
                ))}
              </div>
            </div>

            {/* Payment Method Selection */}
            {step === 1 ? (
              <div className="space-y-4">
                <Label>Select Payment Method</Label>
                <RadioGroup className="grid gap-4">
                  <Card
                    className={`cursor-pointer transition-colors ${
                      selectedMethod === 'credit_card' ? 'border-primary' : ''
                    }`}
                    onClick={() => handleMethodSelect('credit_card')}
                  >
                    <CardHeader className="flex flex-row items-center space-y-0">
                      <div className="flex items-center space-x-3 flex-1">
                        <CreditCard className="h-5 w-5" />
                        <div>
                          <CardTitle className="text-base">Credit Card</CardTitle>
                          <CardDescription>Pay with Visa or Mastercard</CardDescription>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                  </Card>

                  <Card
                    className={`cursor-pointer transition-colors ${
                      selectedMethod === 'e_wallet' ? 'border-primary' : ''
                    }`}
                    onClick={() => handleMethodSelect('e_wallet')}
                  >
                    <CardHeader className="flex flex-row items-center space-y-0">
                      <div className="flex items-center space-x-3 flex-1">
                        <Wallet className="h-5 w-5" />
                        <div>
                          <CardTitle className="text-base">E-Wallet</CardTitle>
                          <CardDescription>GoPay, OVO, DANA</CardDescription>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                  </Card>

                  <Card
                    className={`cursor-pointer transition-colors ${
                      selectedMethod === 'bank_transfer' ? 'border-primary' : ''
                    }`}
                    onClick={() => handleMethodSelect('bank_transfer')}
                  >
                    <CardHeader className="flex flex-row items-center space-y-0">
                      <div className="flex items-center space-x-3 flex-1">
                        <Building2 className="h-5 w-5" />
                        <div>
                          <CardTitle className="text-base">Bank Transfer</CardTitle>
                          <CardDescription>Direct bank transfer</CardDescription>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                  </Card>
                </RadioGroup>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                  <Label className="ml-2">Select {selectedMethod?.replace('_', ' ')}</Label>
                </div>
                <RadioGroup
                  value={selectedOption?.id}
                  onValueChange={(value) => {
                    const option = PAYMENT_METHODS[selectedMethod!].find(opt => opt.id === value)
                    if (option) handleOptionSelect(option)
                  }}
                >
                  {PAYMENT_METHODS[selectedMethod!]?.map((option) => (
                    <div key={option.id} className="flex items-center space-x-3">
                      <RadioGroupItem value={option.id} id={option.id} />
                      <Label htmlFor={option.id}>{option.name}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                onClick={handleConfirm}
                disabled={isLoading || !amount || !selectedOption}
              >
                {isLoading ? "Processing..." : "Continue"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Top Up</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to top up ${amount} using {selectedOption?.name}.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="my-4 p-4 bg-muted rounded-lg">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-medium">${amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Method</span>
                <span className="font-medium">{selectedOption?.name}</span>
              </div>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleTopup}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}