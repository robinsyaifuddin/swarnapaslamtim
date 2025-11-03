
import { useState, useEffect, createContext, useContext } from 'react'
import { authService, type AdminUser } from '@/services/authService'

interface AuthContextType {
  user: AdminUser | null
  isLoading: boolean
  login: (credentials: { username: string; password: string }) => Promise<{ success: boolean; message: string }>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = authService.getCurrentUser()
    setUser(currentUser)
    setIsLoading(false)
  }, [])

  const login = async (credentials: { username: string; password: string }) => {
    setIsLoading(true)
    try {
      const result = await authService.login(credentials)
      if (result.success) {
        setUser(result.user)
      }
      setIsLoading(false)
      return { success: result.success, message: result.message }
    } catch (error) {
      setIsLoading(false)
      return { success: false, message: 'Terjadi kesalahan saat login' }
    }
  }

  const logout = () => {
    authService.logout()
    setUser(null)
  }

  const value = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
