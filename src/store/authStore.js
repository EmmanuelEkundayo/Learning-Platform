import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set) => ({
      userEmail: null,
      userName: '',
      
      setUserEmail(email) {
        set({ userEmail: email })
      },

      setUserName(name) {
        set({ userName: name })
      },
      
      logout() {
        set({ userEmail: null, userName: '' })
      }
    }),
    { name: 'learnblazinglyfast-auth' }
  )
)
