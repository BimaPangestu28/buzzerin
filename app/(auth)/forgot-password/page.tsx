import Link from "next/link"
import { ForgotPasswordForm } from "./forgot-password-form"

export default function ForgotPasswordPage() {
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
            <h1 className="text-[22px] font-semibold mb-1">Forgot password</h1>
            <p className="text-gray-500 text-[13px] px-4">
              Enter your email address and we'll send you a reset link
            </p>
          </div>
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  )
}