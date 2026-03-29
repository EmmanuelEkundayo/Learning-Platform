// Project catalog — glob-imports all JSON files in this directory.
const modules = import.meta.glob('./*.json', { eager: true })

const projects = Object.values(modules).map((m) => m.default ?? m)

export default projects
