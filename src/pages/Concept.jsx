import { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useConceptStore }  from '../store/conceptStore.js'
import { useProgressStore } from '../store/progressStore.js'
import GraphCanvas       from '../components/visualizations/GraphCanvas.jsx'
import ArrayBars         from '../components/visualizations/ArrayBars.jsx'
import MatrixGrid        from '../components/visualizations/MatrixGrid.jsx'
import ArrayPointers     from '../components/visualizations/ArrayPointers.jsx'
import TreeCanvas        from '../components/visualizations/TreeCanvas.jsx'
import LossLandscape     from '../components/visualizations/LossLandscape.jsx'
import ClusterPlot       from '../components/visualizations/ClusterPlot.jsx'
import HeatmapGrid       from '../components/visualizations/HeatmapGrid.jsx'
import TimelineStep      from '../components/visualizations/TimelineStep.jsx'
import DecisionBoundary  from '../components/visualizations/DecisionBoundary.jsx'
import NeuralNetDiagram  from '../components/visualizations/NeuralNetDiagram.jsx'
import VectorSpace       from '../components/visualizations/VectorSpace.jsx'
import FillInBlank       from '../components/exercises/FillInBlank.jsx'
import { complexityColor } from '../utils/complexity.js'

// ─── viz registry ──────────────────────────────────────────────────────────────
const VIZ_MAP = {
  'graph-traversal':   GraphCanvas,
  'array-bars':        ArrayBars,
  'matrix-grid':       MatrixGrid,
  'array-pointers':    ArrayPointers,
  'tree-canvas':       TreeCanvas,
  'loss-landscape':    LossLandscape,
  'cluster-plot':      ClusterPlot,
  'heatmap-grid':      HeatmapGrid,
  'timeline-step':     TimelineStep,
  'decision-boundary': DecisionBoundary,
  'neural-net-diagram': NeuralNetDiagram,
  'vector-space':      VectorSpace,
}

// ─── exercise registry ─────────────────────────────────────────────────────────
const EXERCISE_MAP = {
  'fill-in-the-blank': FillInBlank,
}

// ─── helpers ───────────────────────────────────────────────────────────────────
const DIFF_STYLE = {
  beginner:     'bg-green-900/30 text-green-400 border-green-800',
  intermediate: 'bg-yellow-900/30 text-yellow-400 border-yellow-800',
  advanced:     'bg-red-900/30 text-red-400 border-red-800',
}

function domainAccent(domain) {
  return domain === 'DSA'
    ? { text: 'text-dsa-400', border: 'border-dsa-500', ring: 'hover:border-dsa-500 hover:text-dsa-300' }
    : { text: 'text-ml-400',  border: 'border-ml-500',  ring: 'hover:border-ml-400  hover:text-ml-300'  }
}

// ─── page ──────────────────────────────────────────────────────────────────────

export default function Concept() {
  const { slug }        = useParams()
  const navigate        = useNavigate()
  const getConcept      = useConceptStore(s => s.getBySlug)
  const concept         = getConcept(slug)
  const markViewed      = useProgressStore(s => s.markViewed)
  const recordAttempt   = useProgressStore(s => s.recordAttempt)
  const setConfidence   = useProgressStore(s => s.setConfidence)

  useEffect(() => {
    if (slug) markViewed(slug)
  }, [slug, markViewed])

  // ── not found ──
  if (!concept) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500 font-mono text-sm mb-3">/{slug}</p>
        <h1 className="text-2xl font-bold mb-4">Concept not found</h1>
        <Link to="/browse" className="text-dsa-400 hover:underline text-sm">
          ← Browse all concepts
        </Link>
      </div>
    )
  }

  const { id, title, domain, category, difficulty, card, visualization, exercise, related, tags } = concept
  const accent       = domainAccent(domain)
  const VizComp      = VIZ_MAP[visualization?.type]
  const ExComp       = EXERCISE_MAP[exercise?.type]

  function handlePass() {
    recordAttempt(slug, true)
  }

  function handleFail() {
    recordAttempt(slug, false)
  }

  function handleConfidence(level) {
    setConfidence(slug, level)
  }

  return (
    <motion.div
      key={slug}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="max-w-7xl mx-auto px-4 py-6 space-y-0"
    >

      {/* ══════════════════════════════════════════
          HEADER
      ══════════════════════════════════════════ */}
      <header className="flex flex-wrap items-center gap-2 mb-5">
        <Link
          to="/browse"
          className="text-gray-500 hover:text-gray-300 text-sm transition-colors flex items-center gap-1"
        >
          ← Back
        </Link>
        <span className="text-gray-700 select-none">|</span>
        <span className={`text-sm font-semibold ${accent.text}`}>{domain}</span>
        <span className="text-gray-700 select-none text-xs">›</span>
        <span className="text-sm text-gray-400">{category}</span>
        <span className={`ml-auto text-xs px-2 py-0.5 rounded border font-medium ${DIFF_STYLE[difficulty]}`}>
          {difficulty}
        </span>
      </header>

      <h1 className="text-2xl font-bold mb-7">{title}</h1>

      {/* ══════════════════════════════════════════
          ROW 1 — CARD  +  VISUALIZATION
      ══════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

        {/* ── CARD ─────────────────────────────── */}
        <section className="space-y-6">

          {/* Intuition */}
          <div>
            <SectionLabel>Intuition</SectionLabel>
            <p className="text-gray-100 leading-relaxed">{card.intuition}</p>
          </div>

          {/* Analogy */}
          <blockquote className={`px-4 py-3 rounded-r bg-surface-700 border-l-[3px] ${accent.border} text-gray-300 text-sm leading-relaxed`}>
            {card.analogy}
          </blockquote>

          {/* Complexity grid */}
          <div className="grid grid-cols-2 gap-3">
            <ComplexityBadge label="Time"  value={card.time_complexity}  />
            <ComplexityBadge label="Space" value={card.space_complexity} />
          </div>

          {/* When to use */}
          <div>
            <SectionLabel>When to use</SectionLabel>
            <ul className="space-y-2 mt-2">
              {card.when_to_use.map((item, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-300 leading-snug">
                  <span className={`shrink-0 mt-[3px] ${accent.text}`}>›</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Gotchas */}
          <div>
            <SectionLabel>Gotchas</SectionLabel>
            <ul className="space-y-3 mt-2">
              {card.gotchas.map((g, i) => (
                <li key={i} className="flex gap-2 text-sm text-amber-200/80 leading-snug">
                  <span className="shrink-0 mt-[2px] text-amber-500">⚠</span>
                  {g}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── VISUALIZATION ────────────────────── */}
        <section>
          <SectionLabel className="mb-3">
            Visualization
            <span className="ml-2 text-gray-600 font-normal normal-case tracking-normal font-mono text-xs">
              {visualization?.type}
            </span>
          </SectionLabel>

          {VizComp ? (
            <VizComp config={visualization?.config ?? {}} />
          ) : (
            <VizPlaceholder type={visualization?.type} />
          )}
        </section>
      </div>

      {/* ══════════════════════════════════════════
          ROW 2 — EXERCISE
      ══════════════════════════════════════════ */}
      <section className="rounded-xl border border-surface-600 bg-surface-800 overflow-hidden mb-8">
        {/* Exercise header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-surface-600 bg-surface-700/50">
          <SectionLabel className="mb-0">Exercise</SectionLabel>
          <ExerciseTypeBadge type={exercise?.type} />
        </div>

        <div className="px-5 py-5">
          {ExComp ? (
            <ExComp
              exercise={exercise}
              concept={concept}
              domain={domain}
              onPass={handlePass}
              onFail={handleFail}
              onConfidence={handleConfidence}
            />
          ) : (
            <p className="text-gray-500 text-sm font-mono">
              Exercise type <code className="text-gray-400">{exercise?.type}</code> — coming soon.
            </p>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ROW 3 — RELATED + TAGS
      ══════════════════════════════════════════ */}
      {(related?.length > 0 || tags?.length > 0) && (
        <section className="border-t border-surface-700 pt-6 space-y-4 pb-8">
          {related?.length > 0 && (
            <div>
              <SectionLabel className="mb-2">Related</SectionLabel>
              <div className="flex flex-wrap gap-2">
                {related.map((relSlug) => (
                  <RelatedChip key={relSlug} slug={relSlug} currentDomain={domain} />
                ))}
              </div>
            </div>
          )}

          {tags?.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-full bg-surface-700 text-gray-500 font-mono border border-surface-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </section>
      )}

    </motion.div>
  )
}

// ─── sub-components ────────────────────────────────────────────────────────────

function SectionLabel({ children, className = '' }) {
  return (
    <p className={`text-xs font-semibold text-gray-500 uppercase tracking-wider ${className}`}>
      {children}
    </p>
  )
}

function ComplexityBadge({ label, value }) {
  return (
    <div className="px-3 py-2.5 rounded-lg bg-surface-700 border border-surface-600">
      <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">{label}</p>
      <p className={`font-mono font-semibold text-sm leading-none ${complexityColor(value)}`}>
        {value}
      </p>
    </div>
  )
}

function ExerciseTypeBadge({ type }) {
  const labels = {
    'fill-in-the-blank': 'Fill in the blank',
    'spot-the-bug':      'Spot the bug',
    'trace-output':      'Trace the output',
    'order-steps':       'Order the steps',
    'complexity-quiz':   'Complexity quiz',
  }
  return (
    <span className="text-xs px-2 py-0.5 rounded bg-surface-600 text-gray-400 font-medium border border-surface-500">
      {labels[type] ?? type}
    </span>
  )
}

function VizPlaceholder({ type }) {
  return (
    <div className="rounded-lg border border-surface-600 bg-surface-800 min-h-[400px] flex flex-col items-center justify-center gap-2">
      <span className="text-2xl opacity-30">⬡</span>
      <span className="text-gray-500 text-sm font-mono">{type}</span>
      <span className="text-gray-600 text-xs">visualization — coming in Step 3 expansion</span>
    </div>
  )
}

/**
 * Chip that resolves a related slug → title from the store.
 * Falls back to a prettified slug if the concept isn't loaded yet.
 */
function RelatedChip({ slug, currentDomain }) {
  const concept = useConceptStore(s => s.getBySlug(slug))
  const domain  = concept?.domain
  const title   = concept?.title ?? prettifySlug(slug)
  const accent  = domainAccent(domain ?? currentDomain)

  return (
    <Link
      to={`/concept/${slug}`}
      className={`
        flex items-center gap-1.5 px-3 py-1 rounded-full border border-surface-500 text-sm
        text-gray-300 transition-colors ${accent.ring}
        ${!concept ? 'opacity-50 pointer-events-none' : ''}
      `}
      title={concept ? undefined : 'Concept not loaded yet'}
    >
      {domain && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
            domain === 'DSA' ? 'bg-dsa-400' : 'bg-ml-400'
          }`}
        />
      )}
      {title}
    </Link>
  )
}

function prettifySlug(slug) {
  return slug
    .replace(/-\d+$/, '')          // strip trailing -01 etc.
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}
