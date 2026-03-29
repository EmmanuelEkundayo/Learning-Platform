import { useState, useMemo, useCallback } from 'react'
import * as d3 from 'd3'
import { motion } from 'framer-motion'
import StepControls from './StepControls.jsx'
import { useInterval } from '../../hooks/useInterval.js'

const SPEED_MS = { 0.5: 1800, 1: 900, 1.5: 600, 2: 450, 3: 300 }

// Seeded RNG
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

// Two linearly separable clusters
function generatePoints() {
  const rng = makeRng(17)
  const pts = []
  // Class 0: centered at (3, 4)
  for (let i = 0; i < 25; i++) pts.push({ id: i, x: 3 + rng.normal() * 1.2, y: 4 + rng.normal() * 1.2, cls: 0 })
  // Class 1: centered at (7, 6)
  for (let i = 0; i < 25; i++) pts.push({ id: 50 + i, x: 7 + rng.normal() * 1.2, y: 6 + rng.normal() * 1.2, cls: 1 })
  return pts
}

// Logistic regression boundary training steps
// Boundary: w1*x + w2*y + b = 0. We animate the boundary converging.
// y = (-w1*x - b) / w2
const BOUNDARY_STATES = [
  { w1: -0.5, w2: 0.5, b: 0.2, accuracy: null,   note: 'Iteration 0'  },
  { w1: -0.6, w2: 0.7, b: 0.5, accuracy: 72,      note: 'Iteration 5'  },
  { w1: -0.8, w2: 0.9, b: 1.2, accuracy: 84,      note: 'Iteration 15' },
  { w1: -1.0, w2: 1.1, b: 2.0, accuracy: 90,      note: 'Iteration 30' },
  { w1: -1.15, w2: 1.2, b: 2.6, accuracy: 94,     note: 'Iteration 50' },
  { w1: -1.2, w2: 1.25, b: 2.8, accuracy: 96,     note: 'Converged'    },
]

const POINTS = generatePoints()

function buildSteps() {
  return [
    {
      boundaryIdx: null,
      annotation: '50 data points, 2 classes. Logistic regression will find a linear decision boundary.',
    },
    ...BOUNDARY_STATES.map((bs, i) => ({
      boundaryIdx: i,
      annotation: `${bs.note}: gradient descent updates boundary.`
        + (bs.accuracy ? ` Training accuracy: ${bs.accuracy}%.` : ''),
    })),
  ]
}

export default function DecisionBoundary({ config = {} }) {
  const steps = useMemo(() => buildSteps(), [])

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
  const mg = { top: 16, right: 16, bottom: 36, left: 40 }
  const iW = W - mg.left - mg.right
  const iH = H - mg.top  - mg.bottom

  const xScale = useMemo(() => d3.scaleLinear().domain([0, 10]).range([0, iW]), [iW])
  const yScale = useMemo(() => d3.scaleLinear().domain([0, 10]).range([iH, 0]), [iH])

  // Boundary line endpoints
  const boundary = cur.boundaryIdx != null ? BOUNDARY_STATES[cur.boundaryIdx] : null
  const boundaryLine = useMemo(() => {
    if (!boundary) return null
    const { w1, w2, b } = boundary
    // y = (-w1*x - b) / w2
    const y0 = (-w1 * 0 - b) / w2
    const y10 = (-w1 * 10 - b) / w2
    return { x1: xScale(0), y1: yScale(y0), x2: xScale(10), y2: yScale(y10) }
  }, [boundary, xScale, yScale])

  const gridTicks = [0, 2, 4, 6, 8, 10]

  return (
    <div className="flex flex-col gap-3">
      {/* Accuracy pill */}
      <div className="flex items-center gap-3 px-3 py-2 rounded bg-surface-700 border border-surface-600 text-xs font-mono">
        <span className="text-gray-500">model:</span>
        <span className="text-gray-300">logistic regression</span>
        <span className="text-gray-600">|</span>
        <span className="text-gray-500">accuracy:</span>
        <span className={`font-bold ${cur.boundaryIdx != null && BOUNDARY_STATES[cur.boundaryIdx].accuracy
          ? 'text-green-400' : 'text-gray-600'}`}>
          {cur.boundaryIdx != null && BOUNDARY_STATES[cur.boundaryIdx].accuracy
            ? `${BOUNDARY_STATES[cur.boundaryIdx].accuracy}%` : '—'}
        </span>
      </div>

      {/* Plot */}
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
            {POINTS.map(p => (
              <motion.circle key={p.id}
                cx={xScale(p.x)} cy={yScale(p.y)}
                animate={{ fill: p.cls === 0 ? '#3b82f6' : '#f59e0b' }}
                r={5} fillOpacity={0.8} stroke={p.cls === 0 ? '#1d4ed8' : '#b45309'} strokeWidth={1}
              />
            ))}

            {/* Decision boundary */}
            {boundaryLine && (
              <motion.line
                animate={{ x1: boundaryLine.x1, y1: boundaryLine.y1, x2: boundaryLine.x2, y2: boundaryLine.y2 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                stroke="#22c55e" strokeWidth={2.5} strokeDasharray={step === steps.length - 1 ? 'none' : '5 3'}
                strokeOpacity={0.9}
              />
            )}

            {/* Axes */}
            <line x1={0} x2={iW} y1={iH} y2={iH} stroke="#374151" />
            <line x1={0} x2={0}  y1={0}  y2={iH} stroke="#374151" />
            {gridTicks.filter(t => t > 0).map(t => (
              <text key={t} x={xScale(t)} y={iH + 14} textAnchor="middle"
                fill="#4b5563" fontSize={9} fontFamily="monospace">{t}</text>
            ))}
            {gridTicks.filter(t => t > 0).map(t => (
              <text key={t} x={-6} y={yScale(t)} textAnchor="end" dominantBaseline="middle"
                fill="#4b5563" fontSize={9} fontFamily="monospace">{t}</text>
            ))}
          </g>
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400">
        {[['#3b82f6', 'Class 0'], ['#f59e0b', 'Class 1']].map(([color, label]) => (
          <span key={label} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: color }} />
            {label}
          </span>
        ))}
        <span className="flex items-center gap-1.5">
          <span className="w-6 h-0.5 inline-block bg-green-500" />
          decision boundary
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
