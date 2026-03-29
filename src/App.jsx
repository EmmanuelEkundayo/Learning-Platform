import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home       from './pages/Home.jsx'
import Concept    from './pages/Concept.jsx'
import Browse     from './pages/Browse.jsx'
import Review     from './pages/Review.jsx'
import Playground from './pages/Playground.jsx'
import Layout     from './components/ui/Layout.jsx'
import { useConceptStore } from './store/conceptStore.js'
import concepts from './data/concepts/index.js'

export default function App() {
  const setConcepts = useConceptStore(s => s.setConcepts)
  useEffect(() => { setConcepts(concepts) }, [setConcepts])

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/"                element={<Home />} />
        <Route path="/concept/:slug"   element={<Concept />} />
        <Route path="/browse"          element={<Browse />} />
        <Route path="/review"          element={<Review />} />
        <Route path="/playground"      element={<Playground />} />
      </Route>
    </Routes>
  )
}
