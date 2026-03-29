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
      interacted_concepts: [], // persisted
      show_support_modal: false, // not persisted (triggered in session)

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
          const newInteracted = [...state.interacted_concepts]
          if (!newInteracted.includes(slug)) {
            newInteracted.push(slug)
          }

          // Trigger support modal logic
          const hasCompletedSupport = localStorage.getItem('completed_support') === 'true'
          const shouldShowModal = !hasCompletedSupport && newInteracted.length >= 3

          return {
            interacted_concepts: newInteracted,
            show_support_modal: shouldShowModal,
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

      dismissSupportModal() {
        set({ show_support_modal: false })
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

      /**
       * Per-domain completion summary.
       * @param {Array<{slug:string, domain:string}>} concepts — full concept list from conceptStore
       * @returns Record<domain, { total, viewed, passed }>
       */
      getSummaryByDomain(concepts) {
        const { progress } = get()
        const summary = {}
        for (const { slug, domain } of concepts) {
          if (!summary[domain]) summary[domain] = { total: 0, viewed: 0, passed: 0 }
          summary[domain].total++
          const p = progress[slug] ?? {}
          if (p.viewed)           summary[domain].viewed++
          if (p.exercise_passed)  summary[domain].passed++
        }
        return summary
      },
    }),
    { name: 'learnblazinglyfast-progress' }
  )
)
