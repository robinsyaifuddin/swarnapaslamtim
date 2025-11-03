
import { supabase, isSupabaseReady } from '@/lib/supabase'
import bcrypt from 'bcryptjs'

export interface AdminUser {
  id: string
  username: string
  email: string
  role: 'central' | 'umkm'
}

export interface LoginCredentials {
  username: string
  password: string
}

export const authService = {
  // Login with existing credentials (backward compatible)
  async login(credentials: LoginCredentials): Promise<{ user: AdminUser; success: boolean; message: string }> {
    try {
      // Check for hardcoded credentials first (backward compatibility)
      if (credentials.username === 'adminpusat' && credentials.password === 'admin123') {
        const user: AdminUser = {
          id: '1',
          username: 'adminpusat',
          email: 'admin@lampungtimurkab.go.id',
          role: 'central'
        }
        
        // Store session
        sessionStorage.setItem('adminLoggedIn', 'true')
        sessionStorage.setItem('adminUsername', user.username)
        sessionStorage.setItem('adminType', user.role)
        sessionStorage.setItem('adminId', user.id)
        
        return { user, success: true, message: 'Login berhasil!' }
      }
      
      if (credentials.username === 'adminkecamatan' && credentials.password === 'kecamatan') {
        const user: AdminUser = {
          id: '2',
          username: 'adminkecamatan',
          email: 'kecamatan@lampungtimurkab.go.id',
          role: 'umkm'
        }
        
        // Store session
        sessionStorage.setItem('adminLoggedIn', 'true')
        sessionStorage.setItem('adminUsername', user.username)
        sessionStorage.setItem('adminType', user.role)
        sessionStorage.setItem('adminId', user.id)
        
        return { user, success: true, message: 'Login berhasil!' }
      }

      // Try database authentication only if Supabase is ready
      if (isSupabaseReady() && supabase) {
        const { data: users, error } = await supabase
          .from('admin_users')
          .select('*')
          .eq('username', credentials.username)
          .single()

        if (error || !users) {
          return { user: null as any, success: false, message: 'Username atau password salah!' }
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(credentials.password, users.password_hash)
        
        if (!isValidPassword) {
          return { user: null as any, success: false, message: 'Username atau password salah!' }
        }

        const user: AdminUser = {
          id: users.id,
          username: users.username,
          email: users.email,
          role: users.role
        }

        // Store session
        sessionStorage.setItem('adminLoggedIn', 'true')
        sessionStorage.setItem('adminUsername', user.username)
        sessionStorage.setItem('adminType', user.role)
        sessionStorage.setItem('adminId', user.id)

        return { user, success: true, message: 'Login berhasil!' }
      }

      // If no hardcoded credentials match and Supabase is not ready
      return { user: null as any, success: false, message: 'Username atau password salah!' }
    } catch (error) {
      console.error('Login error:', error)
      return { user: null as any, success: false, message: 'Terjadi kesalahan saat login' }
    }
  },

  // Logout
  logout() {
    sessionStorage.removeItem('adminLoggedIn')
    sessionStorage.removeItem('adminUsername')
    sessionStorage.removeItem('adminType')
    sessionStorage.removeItem('adminId')
  },

  // Get current user
  getCurrentUser(): AdminUser | null {
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true'
    if (!isLoggedIn) return null

    return {
      id: sessionStorage.getItem('adminId') || '',
      username: sessionStorage.getItem('adminUsername') || '',
      email: '', // Will be fetched from database when needed
      role: sessionStorage.getItem('adminType') as 'central' | 'umkm' || 'central'
    }
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return sessionStorage.getItem('adminLoggedIn') === 'true'
  },

  // Create default admin users in database (run this after Supabase setup)
  async createDefaultUsers() {
    if (!isSupabaseReady() || !supabase) {
      console.log('Supabase not ready, skipping user creation')
      return
    }

    try {
      const defaultUsers = [
        {
          username: 'adminlampungtimur',
          email: 'admin@lampungtimurkab.go.id',
          password_hash: await bcrypt.hash('lampungtimur2024', 10),
          role: 'central' as const
        },
        {
          username: 'umkmlampungtimur',
          email: 'umkm@lampungtimurkab.go.id',
          password_hash: await bcrypt.hash('umkmlamtim2024', 10),
          role: 'umkm' as const
        }
      ]

      for (const user of defaultUsers) {
        const { error } = await supabase
          .from('admin_users')
          .upsert(user, { onConflict: 'username' })
        
        if (error) {
          console.error('Error creating user:', error)
        }
      }
    } catch (error) {
      console.error('Error creating default users:', error)
    }
  }
}
