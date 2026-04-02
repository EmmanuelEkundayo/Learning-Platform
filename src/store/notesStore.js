import { create } from 'zustand'

export const useNotesStore = create((set, get) => {
  // Initial load from localStorage
  const loadInitialNotes = () => {
    const notes = {}
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith('lbf_notes_')) {
        const slug = key.replace('lbf_notes_', '')
        notes[slug] = localStorage.getItem(key)
      }
    }
    return notes
  }

  const initialNotes = loadInitialNotes()

  return {
    notes: initialNotes,
    notesCount: Object.keys(initialNotes).length,
    
    getNote: (slug) => {
      return get().notes[slug] || ''
    },

    saveNote: (slug, text) => {
      if (text.length > 5000) return
      
      // If text is empty, delete it instead
      if (!text.trim()) {
        get().deleteNote(slug)
        return
      }

      localStorage.setItem(`lbf_notes_${slug}`, text)
      set(s => {
        const newNotes = { ...s.notes, [slug]: text }
        return { 
          notes: newNotes,
          notesCount: Object.keys(newNotes).length
        }
      })
    },

    deleteNote: (slug) => {
      localStorage.removeItem(`lbf_notes_${slug}`)
      set(s => {
        const newNotes = { ...s.notes }
        delete newNotes[slug]
        return { 
          notes: newNotes,
          notesCount: Object.keys(newNotes).length
        }
      })
    },

    getAllNotes: () => {
      return get().notes
    }
  }
})
