
import { supabase } from '@/lib/supabase'

export const dataService = {
  // Destinations
  async getDestinations() {
    try {
      const { data, error } = await supabase
        .from('destinations')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching destinations:', error)
      // Return mock data as fallback
      return [
        {
          id: '1',
          name: 'Pantai Tanjung Putus',
          description: 'Pantai eksotis dengan pemandangan matahari terbenam yang memukau',
          location: 'Kalianda, Lampung Selatan',
          category: 'Pantai',
          image_url: '/lovable-uploads/52981017-1492-4aa2-8101-27cb3682b072.png',
          rating: 4.8,
          price_range: 'Gratis',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ]
    }
  },

  async createDestination(destination: any) {
    try {
      const { data, error } = await supabase
        .from('destinations')
        .insert(destination)
        .select()
        .single()
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error creating destination:', error)
      throw error
    }
  },

  async updateDestination(id: string, destination: any) {
    try {
      const { data, error } = await supabase
        .from('destinations')
        .update(destination)
        .eq('id', id)
        .select()
        .single()
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating destination:', error)
      throw error
    }
  },

  async deleteDestination(id: string) {
    try {
      const { error } = await supabase
        .from('destinations')
        .delete()
        .eq('id', id)
      
      if (error) throw error
    } catch (error) {
      console.error('Error deleting destination:', error)
      throw error
    }
  },

  // UMKM
  async getUMKM() {
    try {
      const { data, error } = await supabase
        .from('umkm')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching UMKM:', error)
      // Return mock data as fallback
      return [
        {
          id: '1',
          name: 'Kopi Lamsel',
          description: 'Kopi premium dari petani lokal Lampung Selatan',
          category: 'Makanan & Minuman',
          image_url: '/placeholder.svg',
          contact: '081234567890',
          location: 'Kalianda',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ]
    }
  },

  async createUMKM(umkm: any) {
    try {
      const { data, error } = await supabase
        .from('umkm')
        .insert(umkm)
        .select()
        .single()
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error creating UMKM:', error)
      throw error
    }
  },

  async updateUMKM(id: string, umkm: any) {
    try {
      const { data, error } = await supabase
        .from('umkm')
        .update(umkm)
        .eq('id', id)
        .select()
        .single()
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating UMKM:', error)
      throw error
    }
  },

  async deleteUMKM(id: string) {
    try {
      const { error } = await supabase
        .from('umkm')
        .delete()
        .eq('id', id)
      
      if (error) throw error
    } catch (error) {
      console.error('Error deleting UMKM:', error)
      throw error
    }
  },

  // Agenda
  async getAgenda() {
    try {
      const { data, error } = await supabase
        .from('agenda')
        .select('*')
        .order('date', { ascending: true })
      
      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching agenda:', error)
      // Return mock data as fallback
      return [
        {
          id: '1',
          title: 'Festival Krakatau',
          description: 'Festival budaya tahunan Lampung Selatan',
          date: '2024-07-15',
          location: 'Kalianda',
          image_url: '/placeholder.svg',
          price: 50000,
          max_participants: 500,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ]
    }
  },

  async createAgenda(agenda: any) {
    try {
      const { data, error } = await supabase
        .from('agenda')
        .insert(agenda)
        .select()
        .single()
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error creating agenda:', error)
      throw error
    }
  },

  async updateAgenda(id: string, agenda: any) {
    try {
      const { data, error } = await supabase
        .from('agenda')
        .update(agenda)
        .eq('id', id)
        .select()
        .single()
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating agenda:', error)
      throw error
    }
  },

  async deleteAgenda(id: string) {
    try {
      const { error } = await supabase
        .from('agenda')
        .delete()
        .eq('id', id)
      
      if (error) throw error
    } catch (error) {
      console.error('Error deleting agenda:', error)
      throw error
    }
  }
}
