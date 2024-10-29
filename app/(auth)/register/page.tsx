import Link from "next/link"
import { CardContent } from "@/components/ui/card"
import { RegisterForm } from "./register-form"

export default function RegisterPage() {
  return (
    <div className="h-screen w-screen bg-white">
      <div className="fixed top-4 left-4">
        <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
          Home
        </Link>
      </div>
      
      <div className="flex h-full items-center justify-center">
        <div className="w-[460px] rounded-lg border border-gray-200 bg-white p-8">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold mb-1">Create an account</h1>
            <p className="text-gray-500 text-sm">Enter your details to register</p>
          </div>
          <RegisterForm />
        </div>
      </div>
    </div>
  )
}