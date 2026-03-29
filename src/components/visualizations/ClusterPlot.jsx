import { useState, useMemo, useCallback } from 'react'
import * as d3 from 'd3'
import { motion, AnimatePresence } from 'framer-motion'
import StepControls from './StepControls.jsx'
import { useInterval } from '../../hooks/useInterval.js'

const SPEED_MS = { 0.5: 2000, 1: 1000, 1.5: 667, 2: 500, 3: 333 }

// Seeded xorshift RNG for reproducible data
function makeRng(seed) {
  let s = seed >>> 0
  return {
    next() { s ^= s << 13; s ^= s >> 17; s ^= s << 5; return (s >>> 0) / 0xffffffff },
    normal() {
      const u = this.next() || 1e-9, v = this.next()
      return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
    },
  }
}

const CLUSTER_COLORS = ['#3b82f6', '#22c55e', '#f59e0b']   // blue, green, amber
const UNASSIGNED     = '#4b5563'

// Pre-generate k-means simulation steps
function generateKMeansSteps() {
  const rng = makeRng(42)
  const centers = [[2.5, 2.5], [8.0, 2.5], [5.5, 8.5]]
  const N_PER   = 20

  // Generate 60 points in 3 natural clusters
  const rawPoints = centers.flatMap((c, ci) =>
    Array.from({ length: N_PER }, (_, i) => ({
      id: ci * N_PER + i,
      x: c[0] + rng.normal() * 1.1,
      y: c[1] + rng.normal() * 1.1,
      trueCluster: ci,
    }))
  )

  // Bad initial centroids to create interesting movement
  let centroids = [[1.5, 6.5], [8.5, 7.0], [3.5, 1.5]]

  function assign(pts, ctrs) {
    return pts.map(p => {
      const dists = ctrs.map(c => (p.x - c[0]) ** 2 + (p.y - c[1]) ** 2)
      return { ...p, cluster: dists.indexOf(Math.min(...dists)) }
    })
  }

  function moveCentroids(pts, ctrs) {
    return ctrs.map((c, k) => {
      const clPts = pts.filter(p => p.cluster === k)
      if (clPts.length === 0) return c
      return [
        clPts.reduce((s, p) => s + p.x, 0) / clPts.length,
        clPts.reduce((s, p) => s + p.y, 0) / clPts.length,
      ]
    })
  }

  const steps = []

  // Step 0: raw data, no assignments
  steps.push({
    points:    rawPoints.map(p => ({ ...p, cluster: -1 })),
    centroids: null,
    annotation: `${rawPoints.length} data points plotted. K-Means will partition into k=3 clusters.`,
  })

  // Step 1: place initial centroids
  steps.push({
    points:    rawPoints.map(p => ({ ...p, cluster: -1 })),
    centroids: centroids.map(c => [...c]),
    annotation: 'Step 1: randomly initialize 3 centroids (✕). They start in poor positions.',
  })

  // 4 iterations of assign + move
  for (let iter = 0; iter < 4; iter++) {
    const assigned = assign(rawPoints, centroids)
    steps.push({
      points:    assigned,
      centroids: centroids.map(c => [...c]),
      annotation: `Iteration ${iter + 1}: assign each point to nearest centroid (Euclidean distance).`,
    })

    centroids = moveCentroids(assigned, centroids)
    steps.push({
      points:    assigned,
      centroids: centroids.map(c => [...c]),
      annotation: `Iteration ${iter + 1}: move each centroid to the mean of its assigned points.`,
    })

    // After iter 3, check convergence
    if (iter === 3) {
      const finalAssigned = assign(rawPoints, centroids)
      const changed = finalAssigned.some((p, i) => p.cluster !== assigned[i].cluster)
      if (!changed) {
        steps.push({
          points:    finalAssigned,
          centroids: centroids.map(c => [...c]),
          annotation: `Converged: no point changed cluster. Final 3 clusters found after ${iter + 1} iterations.`,
        })
      }
    }
  }

  return steps
}

export default function ClusterPlot({ config = {} }) {
  const steps = useMemo(() => generateKMeansSteps(), [])

  const [step,    setStep]    = useState(0)
  const [playing, setPlaying] = useState(false)
  const [speed,   setSpeed]   = useState(1)

  const cur = steps[step]

  useInterval(
    () => { if (step < steps.length - 1) setStep(s => s + 1); else setPlaying(false) },
    playing ? SPEED_MS[speed] : null,
  )

  const handleReset = useCallback(() => { setStep(0); setPlaying(false) }, [])

  // Chart geometry
  const W = 480, H = 340
  const mg = { top: 16, right: 16, bottom: 40, left: 44 }
  const iW = W - mg.left - mg.right
  const iH = H - mg.top  - mg.bottom

  const xScale = useMemo(() =>
    d3.scaleLinear().domain([-0.5, 11.5]).range([0, iW]), [iW])
  const yScale = useMemo(() =>
    d3.scaleLinear().domain([-0.5, 11.5]).range([iH, 0]), [iH])

  const gridTicks = [0, 2, 4, 6, 8, 10]

  // Iteration counter
  const iterNum = step <= 1 ? 0 : Math.ceil((step - 1) / 2)

  return (
    <div className="flex flex-col gap-3">
      {/* Stats */}
      <div className="flex items-center gap-3 text-xs font-mono px-3 py-2 rounded bg-surface-700 border border-surface-600">
        <span className="text-gray-500">k = 3</span>
        <span className="text-gray-600">|</span>
        <span className="text-gray-500">iteration:</span>
        <span className="text-dsa-400 font-bold">{iterNum}</span>
        <span className="text-gray-600">|</span>
        <span className="text-gray-500">points:</span>
        <span className="text-gray-300 font-bold">{cur.points.length}</span>
      </div>

      {/* Scatter plot */}
      <div className="rounded-lg border border-surface-600 bg-surface-800 overflow-hidden">
        <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ maxHeight: 360 }}>
          <g transform={`translate(${mg.left},${mg.top})`}>
            {/* Grid */}
            {gridTicks.map(t => (
              <g key={t}>
                <line x1={xScale(t)} x2={xScale(t)} y1={0} y2={iH} stroke="#1e1e26" strokeWidth={1} />
                <line x1={0} x2={iW} y1={yScale(t)} y2={yScale(t)} stroke="#1e1e26" strokeWidth={1} />
              </g>
            ))}

            {/* Points */}
            {cur.points.map(p => {
              const color = p.cluster >= 0 ? CLUSTER_COLORS[p.cluster] : UNASSIGNED
              return (
                <motion.circle key={p.id}
                  animate={{ cx: xScale(p.x), cy: yScale(p.y), fill: color }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  r={4} fillOpacity={0.85}
                  stroke={color} strokeWidth={0.5} strokeOpacity={0.4}
                />
              )
            })}

            {/* Centroids */}
            <AnimatePresence>
              {cur.centroids && cur.centroids.map((c, k) => {
                const cx = xScale(c[0])
                const cy = yScale(c[1])
                const color = CLUSTER_COLORS[k]
                return (
                  <motion.g key={k}
                    animate={{ x: cx, y: cy }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                  >
                    {/* ✕ crosshair */}
                    <line x1={-8} y1={-8} x2={8} y2={8} stroke={color} strokeWidth={2.5} strokeLinecap="round" />
                    <line x1={8}  y1={-8} x2={-8} y2={8} stroke={color} strokeWidth={2.5} strokeLinecap="round" />
                    <circle r={10} fill="none" stroke={color} strokeWidth={1.5} strokeOpacity={0.5} />
                  </motion.g>
                )
              })}
            </AnimatePresence>

            {/* Axes */}
            <line x1={0} x2={iW} y1={iH} y2={iH} stroke="#374151" />
            <line x1={0} x2={0}  y1={0}  y2={iH} stroke="#374151" />
          </g>
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400">
        {['Cluster 0', 'Cluster 1', 'Cluster 2'].map((label, i) => (
          <span key={label} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full inline-block shrink-0"
              style={{ backgroundColor: CLUSTER_COLORS[i] }} />
            {label}
          </span>
        ))}
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-4 text-center font-bold leading-none text-gray-400" style={{ fontSize: 12 }}>✕</span>
          centroid
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full inline-block shrink-0" style={{ backgroundColor: UNASSIGNED }} />
          unassigned
        </span>
      </div>

      <StepControls
        step={step} totalSteps={steps.length} playing={playing} speed={speed}
        annotation={cur?.annotation}
        onPrev={()  => { setPlaying(false); setStep(s => Math.max(0, s - 1)) }}
        onNext={()  => { setPlaying(false); setStep(s => Math.min(steps.length - 1, s + 1)) }}
        onPlay={()  => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onReset={handleReset}
        onSpeedChange={setSpeed}
      />
    </div>
  )
}
