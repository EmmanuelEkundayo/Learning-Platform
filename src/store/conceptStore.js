import { create } from 'zustand'

/**
 * Concept store — holds the loaded concept catalog in memory.
 * Data comes from /src/data/concepts/*.json (imported at build time).
 */
export const useConceptStore = create((set, get) => ({
  concepts: [],
  loaded: false,

  setConcepts(concepts) {
    set({ concepts, loaded: true })
  },

  getBySlug(slug) {
    return get().concepts.find((c) => c.slug === slug) ?? null
  },

  getByDomain(domain) {
    return get().concepts.filter((c) => c.domain === domain)
  },

  getByCategory(category) {
    return get().concepts.filter((c) => c.category === category)
  },

  search(query) {
    const q = query.toLowerCase()
    return get().concepts.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q)) ||
        c.category.toLowerCase().includes(q)
    )
  },
}))
