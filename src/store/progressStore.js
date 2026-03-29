import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Progress store — persisted to localStorage.
 * Shape per concept: { viewed, exercise_attempts, exercise_passed, last_seen, confidence }
 */
export const useProgressStore = create(
  persist(
    (set, get) => ({
      // Record<slug, ConceptProgress>
      progress: {},

      markViewed(slug) {
        set((state) => ({
          progress: {
            ...state.progress,
            [slug]: {
              ...state.progress[slug],
              viewed: true,
              last_seen: Date.now(),
            },
          },
        }))
      },

      recordAttempt(slug, passed) {
        set((state) => {
          const prev = state.progress[slug] ?? {}
          return {
            progress: {
              ...state.progress,
              [slug]: {
                ...prev,
                exercise_attempts: (prev.exercise_attempts ?? 0) + 1,
                exercise_passed: prev.exercise_passed || passed,
                last_seen: Date.now(),
              },
            },
          }
        })
      },

      setConfidence(slug, confidence) {
        set((state) => ({
          progress: {
            ...state.progress,
            [slug]: {
              ...state.progress[slug],
              confidence,
            },
          },
        }))
      },

      getProgress(slug) {
        return get().progress[slug] ?? {}
      },

      /** Concepts seen but never exercised */
      getUnexercised() {
        const { progress } = get()
        return Object.entries(progress)
          .filter(([, p]) => p.viewed && !p.exercise_attempts)
          .map(([slug]) => slug)
      },

      /** Concepts failed on first attempt */
      getFailedFirst() {
        const { progress } = get()
        return Object.entries(progress)
          .filter(([, p]) => p.exercise_attempts === 1 && !p.exercise_passed)
          .map(([slug]) => slug)
      },

      /** Concepts not visited in 7+ days */
      getStale() {
        const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000
        const { progress } = get()
        return Object.entries(progress)
          .filter(([, p]) => p.viewed && p.last_seen < cutoff)
          .map(([slug]) => slug)
      },
    }),
    { name: 'algolens-progress' }
  )
)
