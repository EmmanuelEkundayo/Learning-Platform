// Concept catalog — seed data populated in Step 1 (content schema).
// Import all concept JSON files and re-export as a flat array.

const modules = import.meta.glob('./*.json', { eager: true })

const concepts = Object.values(modules).map((m) => m.default ?? m)

export default concepts
