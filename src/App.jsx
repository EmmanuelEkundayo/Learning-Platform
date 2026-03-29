import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home       from './pages/Home.jsx'
import Concept    from './pages/Concept.jsx'
import Browse     from './pages/Browse.jsx'
import Review     from './pages/Review.jsx'
import Playground from './pages/Playground.jsx'
import Layout     from './components/ui/Layout.jsx'
import { useConceptStore } from './store/conceptStore.js'
import { useProjectStore } from './store/projectStore.js'
import concepts from './data/concepts/index.js'
import projects from './data/projects/index.js'
import Projects from './pages/Projects.jsx'
import Project  from './pages/Project.jsx'
import { Toaster } from 'react-hot-toast'

export default function App() {
  const setConcepts = useConceptStore(s => s.setConcepts)
  const setProjects = useProjectStore(s => s.setProjects)
  useEffect(() => { 
    async function loadData() {
      // 1. Load concepts
      const conceptPromises = Object.values(concepts).map(load => load())
      const conceptModules = await Promise.all(conceptPromises)
      const conceptData = conceptModules.map(m => m.default ?? m)
      setConcepts(conceptData)

      // 2. Load projects
      const projectPromises = Object.values(projects).map(load => load())
      const projectModules = await Promise.all(projectPromises)
      const projectData = projectModules.map(m => m.default ?? m)
      setProjects(projectData)
    }
    
    loadData()
  }, [setConcepts, setProjects])

  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/"                element={<Home />} />
          <Route path="/concept/:slug"   element={<Concept />} />
          <Route path="/browse"          element={<Browse />} />
          <Route path="/projects"        element={<Projects />} />
          <Route path="/project/:slug"   element={<Project />} />
          <Route path="/review"          element={<Review />} />
          <Route path="/playground"      element={<Playground />} />
        </Route>
      </Routes>
    </>
  )
}
