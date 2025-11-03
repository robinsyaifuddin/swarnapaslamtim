
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

// Only create client if we have real credentials
const hasRealCredentials = import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = hasRealCredentials 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Helper function to check if Supabase is ready
export const isSupabaseReady = () => {
  return hasRealCredentials && supabase !== null
}

// Database types (will be generated automatically after Supabase integration)
export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: {
          id: string
          username: string
          email: string
          password_hash: string
          role: 'central' | 'umkm'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          username: string
          email: string
          password_hash: string
          role: 'central' | 'umkm'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          email?: string
          password_hash?: string
          role?: 'central' | 'umkm'
          created_at?: string
          updated_at?: string
        }
      }
      destinations: {
        Row: {
          id: string
          name: string
          description: string
          location: string
          category: string
          image_url: string
          rating: number
          price_range: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          location: string
          category: string
          image_url: string
          rating?: number
          price_range: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          location?: string
          category?: string
          image_url?: string
          rating?: number
          price_range?: string
          created_at?: string
          updated_at?: string
        }
      }
      umkm: {
        Row: {
          id: string
          name: string
          description: string
          category: string
          image_url: string
          contact: string
          location: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          category: string
          image_url: string
          contact: string
          location: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          category?: string
          image_url?: string
          contact?: string
          location?: string
          created_at?: string
          updated_at?: string
        }
      }
      agenda: {
        Row: {
          id: string
          title: string
          description: string
          date: string
          location: string
          image_url: string
          price: number
          max_participants: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          date: string
          location: string
          image_url: string
          price: number
          max_participants: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          date?: string
          location?: string
          image_url?: string
          price?: number
          max_participants?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
