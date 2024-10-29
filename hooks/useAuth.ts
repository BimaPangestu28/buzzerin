// hooks/useAuth.ts
"use client"

import { useState, useCallback, useEffect } from "react"
import type { UserData } from "@/types/auth.types"
import { authService } from "@/services/auth/AuthService"

export const useAuth = () => {
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  // Initialize auth state
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('auth_token')
      setIsAuthenticated(!!token)
      setLoading(false)
    }

    checkAuthStatus()
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await authService.login({ email, password })
      
      if (response.status === 'success' && response.data.token) {
        localStorage.setItem('auth_token', response.data.token)
        setIsAuthenticated(true)
        // Set user if API returns user data
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
      localStorage.removeItem('auth_token')
      setUser(null)
      setIsAuthenticated(false)
      // Use window.location for full page reload after logout
      window.location.href = '/login'
    } catch (err: any) {
      setError(err.message || 'Logout failed')
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    logout
  }
}