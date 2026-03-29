import { useState, useMemo, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useConceptStore }  from '../store/conceptStore.js'
import { useProgressStore } from '../store/progressStore.js'

// ─── domain chip styles (shared across search dropdown + concept rows) ───────
const DOMAIN_CHIP = {
  DSA:                  'bg-dsa-600/20 text-dsa-400',
  ML:                   'bg-ml-500/20 text-ml-400',
  Frontend:             'bg-frontend-500/20 text-frontend-400',
  Backend:              'bg-backend-500/20 text-backend-400',
  'Software Engineering': 'bg-se-500/20 text-se-400',
}

// ─── Home ───────────────────────────────────────────────────────────────────

export default function Home() {
  const concepts = useConceptStore(s => s.concepts)
  const progress = useProgressStore(s => s.progress)

  // Progress totals
  const total     = concepts.length
  const completed = concepts.filter(c => progress[c.slug]?.exercise_passed).length
  const viewed    = concepts.filter(c => progress[c.slug]?.viewed && !progress[c.slug]?.exercise_passed).length

  // "Continue" — viewed but not passed (up to 4)
  const continueConcepts = useMemo(
    () => concepts.filter(c => progress[c.slug]?.viewed && !progress[c.slug]?.exercise_passed).slice(0, 4),
    [concepts, progress]
  )

  // "Start Here" — one beginner per domain (priority order), fill to 4
  const startHereConcepts = useMemo(() => {
    const DOMAINS = ['DSA', 'ML', 'Frontend', 'Backend', 'Software Engineering']
    const picked  = new Set()
    const result  = []
    // Prefer one representative per domain
    for (const d of DOMAINS) {
      const c = concepts.find(c => c.domain === d && c.difficulty === 'beginner' && !progress[c.slug]?.viewed)
      if (c && !picked.has(c.slug)) { picked.add(c.slug); result.push(c) }
    }
    // Fill remainder up to 4 from any remaining beginner concepts
    for (const c of concepts) {
      if (result.length >= 4) break
      if (c.difficulty === 'beginner' && !progress[c.slug]?.viewed && !picked.has(c.slug)) {
        result.push(c)
      }
    }
    return result.slice(0, 4)
  }, [concepts, progress])

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 space-y-14">

      {/* ── Logo + Search ── */}
      <div className="flex flex-col items-center gap-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="text-dsa-500">Algo</span>
            <span className="text-ml-500">Lens</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">200+ CS and ML concepts. Under 5 min each.</p>
        </div>

        <ConceptSearch />
      </div>

      {/* ── Progress ── */}
      {total > 0 && (
        <ProgressSection total={total} completed={completed} viewed={viewed} />
      )}

      {/* ── Continue ── */}
      {continueConcepts.length > 0 && (
        <ConceptSection
          title="Continue"
          subtitle="Visited but not yet exercised"
          concepts={continueConcepts}
          progress={progress}
        />
      )}

      {/* ── Start Here ── */}
      {startHereConcepts.length > 0 && (
        <ConceptSection
          title="Start Here"
          subtitle="One beginner pick per domain — concepts you haven't opened yet"
          concepts={startHereConcepts}
          progress={progress}
        />
      )}

      {/* ── All clear state ── */}
      {completed === total && total > 0 && (
        <div className="text-center py-8 text-gray-500 text-sm">
          All {total} concepts completed. Check out the{' '}
          <Link to="/browse" className="text-gray-300 hover:underline">full catalog</Link>{' '}
          or{' '}
          <Link to="/review" className="text-gray-300 hover:underline">review weak spots</Link>.
        </div>
      )}

    </div>
  )
}

// ─── Search ─────────────────────────────────────────────────────────────────

function ConceptSearch() {
  const [query,    setQuery]    = useState('')
  const [open,     setOpen]     = useState(false)
  const [selected, setSelected] = useState(-1)
  const concepts  = useConceptStore(s => s.concepts)
  const navigate  = useNavigate()
  const wrapRef   = useRef(null)
  const inputRef  = useRef(null)

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return concepts
      .filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.tags?.some(t => t.toLowerCase().includes(q)) ||
        c.category.toLowerCase().includes(q)
      )
      .slice(0, 8)
  }, [query, concepts])

  // Close on outside click
  useEffect(() => {
    function handler(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  function handleKeyDown(e) {
    if (!open || results.length === 0) {
      if (e.key === 'Enter' && query.trim()) {
        navigate(`/browse?q=${encodeURIComponent(query.trim())}`)
        setOpen(false)
      }
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelected(s => (s + 1) % results.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelected(s => (s <= 0 ? results.length - 1 : s - 1))
    } else if (e.key === 'Enter') {
      if (selected >= 0 && results[selected]) {
        navigate(`/concept/${results[selected].slug}`)
        setQuery(''); setOpen(false)
      } else {
        navigate(`/browse?q=${encodeURIComponent(query.trim())}`)
        setOpen(false)
      }
    } else if (e.key === 'Escape') {
      setOpen(false); setSelected(-1)
    }
  }

  function pick(slug) {
    navigate(`/concept/${slug}`)
    setQuery(''); setOpen(false); setSelected(-1)
  }

  return (
    <div ref={wrapRef} className="relative w-full max-w-lg">
      {/* Input */}
      <div className="relative">
        <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true); setSelected(-1) }}
          onFocus={() => { if (query) setOpen(true) }}
          onKeyDown={handleKeyDown}
          placeholder="Search concepts, tags, categories…"
          className="w-full bg-surface-800 border border-surface-600 rounded-xl px-4 py-3 pl-10 text-sm text-white placeholder-gray-500
                     focus:outline-none focus:border-dsa-500/60 focus:ring-1 focus:ring-dsa-500/20 transition-colors"
          autoComplete="off"
          spellCheck={false}
        />
        {query && (
          <button
            onClick={() => { setQuery(''); setOpen(false); inputRef.current?.focus() }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 px-1 transition-colors"
            tabIndex={-1}
          >
            ×
          </button>
        )}
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {open && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.1 }}
            className="absolute top-full mt-1.5 w-full bg-surface-800 border border-surface-600 rounded-xl overflow-hidden shadow-2xl z-50"
          >
            {results.map((c, i) => (
              <button
                key={c.slug}
                onMouseDown={() => pick(c.slug)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors
                  ${i === selected ? 'bg-surface-700' : 'hover:bg-surface-700'}`}
              >
                <span className={`shrink-0 text-xs px-1.5 py-0.5 rounded font-semibold ${DOMAIN_CHIP[c.domain] ?? 'bg-gray-500/25 text-gray-400'}`}>
                  {c.domain === 'Software Engineering' ? 'SE' : c.domain}
                </span>
                <span className="text-gray-100 flex-1 truncate">{c.title}</span>
                <span className="text-gray-500 text-xs shrink-0">{c.category}</span>
              </button>
            ))}
            <button
              onMouseDown={() => { navigate(`/browse?q=${encodeURIComponent(query.trim())}`); setOpen(false) }}
              className="w-full px-4 py-2 text-xs text-gray-500 hover:text-gray-300 border-t border-surface-700 text-left transition-colors"
            >
              Browse all results for "{query}" →
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyboard hint */}
      {!open && !query && (
        <p className="text-center text-xs text-gray-600 mt-2">
          Press Enter to browse all  ·  ↑↓ to navigate results
        </p>
      )}
    </div>
  )
}

// ─── Progress section ────────────────────────────────────────────────────────

function ProgressSection({ total, completed, viewed }) {
  const pct = total > 0 ? completed / total : 0

  return (
    <div className="flex items-center gap-6 p-5 rounded-xl bg-surface-800 border border-surface-600">
      <ProgressRing completed={completed} total={total} pct={pct} />

      <div className="space-y-2">
        <p className="text-sm font-semibold text-gray-200">
          {completed} of {total} concepts completed
        </p>
        <div className="space-y-1">
          <LegendRow color="bg-green-500" label={`${completed} passed`} />
          <LegendRow color="bg-blue-500"  label={`${viewed} in progress`} />
          <LegendRow color="bg-surface-500" label={`${total - completed - viewed} untouched`} />
        </div>
      </div>

      <div className="ml-auto hidden sm:block">
        <Link
          to="/browse"
          className="text-xs text-gray-400 hover:text-gray-200 transition-colors flex items-center gap-1"
        >
          View all →
        </Link>
      </div>
    </div>
  )
}

function ProgressRing({ completed, total, pct }) {
  const r    = 36
  const circ = 2 * Math.PI * r
  const dash = circ * pct

  return (
    <svg width="88" height="88" viewBox="0 0 88 88" className="shrink-0">
      {/* Track */}
      <circle cx="44" cy="44" r={r} fill="none" stroke="#26262e" strokeWidth="7" />
      {/* Fill */}
      <circle
        cx="44" cy="44" r={r}
        fill="none"
        stroke="#16a34a"
        strokeWidth="7"
        strokeDasharray={`${dash} ${circ}`}
        strokeDashoffset={0}
        transform="rotate(-90 44 44)"
        strokeLinecap="round"
        style={{ transition: 'stroke-dasharray 0.5s ease' }}
      />
      {/* Center: count */}
      <text x="44" y="40" textAnchor="middle" fill="white" fontSize="18" fontWeight="700" fontFamily="Inter,sans-serif">
        {completed}
      </text>
      <text x="44" y="54" textAnchor="middle" fill="#6b7280" fontSize="10" fontFamily="Inter,sans-serif">
        / {total}
      </text>
    </svg>
  )
}

function LegendRow({ color, label }) {
  return (
    <div className="flex items-center gap-2 text-xs text-gray-400">
      <span className={`w-2 h-2 rounded-full ${color}`} />
      {label}
    </div>
  )
}

// ─── Concept section ─────────────────────────────────────────────────────────

function ConceptSection({ title, subtitle, concepts, progress }) {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-sm font-semibold text-gray-200">{title}</h2>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {concepts.map(c => {
          const prog = progress[c.slug] ?? {}
          return (
            <Link
              key={c.slug}
              to={`/concept/${c.slug}`}
              className="flex items-center gap-3 px-4 py-3 rounded-lg border border-surface-600 bg-surface-800
                         hover:border-surface-400 hover:bg-surface-700 transition-all duration-100 group"
            >
              <span className={`text-xs font-semibold px-1.5 py-0.5 rounded shrink-0 ${DOMAIN_CHIP[c.domain] ?? 'bg-gray-500/20 text-gray-400'}`}>
                {c.domain === 'Software Engineering' ? 'SE' : c.domain}
              </span>
              <span className="flex-1 text-sm text-gray-200 truncate group-hover:text-white transition-colors">
                {c.title}
              </span>
              {prog.exercise_passed ? (
                <span className="text-green-400 text-sm shrink-0">✓</span>
              ) : prog.viewed ? (
                <span className="text-gray-500 text-base shrink-0 leading-none">•</span>
              ) : null}
            </Link>
          )
        })}
      </div>
    </section>
  )
}

// ─── icon ────────────────────────────────────────────────────────────────────

function SearchIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="6.5" cy="6.5" r="4.5" />
      <path d="M10 10l3 3" strokeLinecap="round" />
    </svg>
  )
}
