"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import type { UserData } from "@/types/auth.types"
import { authService } from "@/services/auth/AuthService"

export function useAuth() {
  const router = useRouter()
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await authService.login({ email, password })
      
      if (parseInt(response.status) === 200) {
        if (response.data.user) {
          setUser(response.data.user)
        }
        return response
      } else {
        throw new Error(response.message || 'Login failed')
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during login')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    setLoading(true)
    try {
      await authService.logout()
      setUser(null)
      router.push('/login')
    } catch (err: any) {
      setError(err.message || 'Logout failed')
    } finally {
      setLoading(false)
    }
  }, [router])

  const checkAuth = useCallback(async () => {
    if (authService.isAuthenticated()) {
      // Optional: Fetch user data here if needed
      // const userData = await authService.getProfile()
      // setUser(userData)
      return true
    }
    return false
  }, [])

  return {
    user,
    loading,
    error,
    login,
    logout,
    checkAuth,
    isAuthenticated: authService.isAuthenticated()
  }
}