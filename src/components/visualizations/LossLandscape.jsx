import { useState, useMemo, useCallback } from 'react'
import * as d3 from 'd3'
import { motion } from 'framer-motion'
import StepControls from './StepControls.jsx'
import { useInterval } from '../../hooks/useInterval.js'

const SPEED_MS = { 0.5: 1600, 1: 700, 1.5: 467, 2: 350, 3: 233 }

// Gradient descent on f(w) = (w−3)² + 1, start w=9, lr=0.25
function generateSteps() {
  const lr = 0.25
  let w = 9
  const steps = []
  for (let i = 0; i < 18; i++) {
    const loss = (w - 3) ** 2 + 1
    const grad = 2 * (w - 3)
    steps.push({
      iter: i, w: +w.toFixed(4),
      loss: +loss.toFixed(4),
      grad: +grad.toFixed(3),
      annotation: i === 0
        ? `Start: w=${w.toFixed(2)}, loss=${loss.toFixed(3)}. Gradient = ${grad.toFixed(2)}. Stepping downhill…`
        : `Step ${i}: w=${w.toFixed(3)}, loss=${loss.toFixed(4)}, ∇=${grad.toFixed(3)}`,
    })
    w = w - lr * grad
  }
  return steps
}

export default function LossLandscape({ config = {} }) {
  const steps = useMemo(() => generateSteps(), [])

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
  const W = 480, H = 260
  const mg = { top: 20, right: 24, bottom: 40, left: 50 }
  const iW = W - mg.left - mg.right
  const iH = H - mg.top  - mg.bottom

  // Scales — D3 for math only
  const xScale = useMemo(() =>
    d3.scaleLinear().domain([0, steps.length - 1]).range([0, iW]), [steps.length, iW])
  const yScale = useMemo(() =>
    d3.scaleLinear().domain([0.8, steps[0].loss * 1.04]).range([iH, 0]).nice(), [steps, iH])

  // Full faded guide path
  const fullPath = useMemo(() => {
    return d3.line().x((_, i) => xScale(i)).y(d => yScale(d.loss))
      .curve(d3.curveCatmullRom)(steps)
  }, [steps, xScale, yScale])

  // Traversed path up to current step
  const activePath = useMemo(() => {
    const pts = steps.slice(0, step + 1)
    if (pts.length < 2) return null
    return d3.line().x((_, i) => xScale(i)).y(d => yScale(d.loss))
      .curve(d3.curveCatmullRom)(pts)
  }, [steps, step, xScale, yScale])

  const dotX = xScale(cur.iter)
  const dotY = yScale(cur.loss)
  const yTicks = yScale.ticks(5)

  return (
    <div className="flex flex-col gap-3">
      {/* Stats row */}
      <div className="flex gap-2 flex-wrap text-xs font-mono">
        {[
          { label: 'iter',  val: cur.iter,               color: 'text-gray-300' },
          { label: 'w',     val: cur.w.toFixed(4),       color: 'text-dsa-400'  },
          { label: 'loss',  val: cur.loss.toFixed(4),    color: 'text-red-400'  },
          { label: '∇loss', val: cur.grad.toFixed(3),    color: 'text-yellow-400' },
        ].map(({ label, val, color }) => (
          <div key={label} className="flex items-center gap-1.5 px-2 py-1 rounded bg-surface-700 border border-surface-600">
            <span className="text-gray-500">{label}:</span>
            <motion.span key={val} animate={{ opacity: [0.4, 1] }} transition={{ duration: 0.2 }}
              className={`font-bold ${color}`}>{val}</motion.span>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="rounded-lg border border-surface-600 bg-surface-800 overflow-hidden">
        <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ maxHeight: 270 }}>
          <g transform={`translate(${mg.left},${mg.top})`}>

            {/* Grid */}
            {yTicks.map(t => (
              <line key={t} x1={0} x2={iW} y1={yScale(t)} y2={yScale(t)}
                stroke="#26262e" strokeWidth={1} />
            ))}

            {/* Y axis */}
            <line x1={0} x2={0} y1={0} y2={iH} stroke="#374151" />
            {yTicks.map(t => (
              <g key={t} transform={`translate(-4,${yScale(t)})`}>
                <line x1={0} x2={4} stroke="#4b5563" />
                <text x={-6} textAnchor="end" dominantBaseline="middle"
                  fill="#6b7280" fontSize={9} fontFamily="monospace">
                  {t.toFixed(0)}
                </text>
              </g>
            ))}
            <text transform={`translate(-36,${iH / 2}) rotate(-90)`}
              textAnchor="middle" fill="#6b7280" fontSize={10} fontFamily="Inter,sans-serif">
              Loss
            </text>

            {/* X axis */}
            <line x1={0} x2={iW} y1={iH} y2={iH} stroke="#374151" />
            {[0, 4, 8, 12, 17].map(t => (
              <text key={t} x={xScale(t)} y={iH + 14} textAnchor="middle"
                fill="#6b7280" fontSize={9} fontFamily="monospace">
                {t}
              </text>
            ))}
            <text x={iW / 2} y={iH + 32} textAnchor="middle"
              fill="#6b7280" fontSize={10} fontFamily="Inter,sans-serif">
              Iteration
            </text>

            {/* Optimal line */}
            <line x1={0} x2={iW} y1={yScale(1)} y2={yScale(1)}
              stroke="#374151" strokeWidth={1} strokeDasharray="3 3" />
            <text x={iW + 3} y={yScale(1)} dominantBaseline="middle"
              fill="#4b5563" fontSize={8} fontFamily="monospace">
              min
            </text>

            {/* Full guide curve (faded) */}
            <path d={fullPath} fill="none" stroke="#374151" strokeWidth={1.5} strokeDasharray="4 3" />

            {/* Active traversed curve */}
            {activePath && (
              <path d={activePath} fill="none" stroke="#ef4444" strokeWidth={2} />
            )}

            {/* Moving dot */}
            <motion.circle
              animate={{ cx: dotX, cy: dotY }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              r={6} fill="#ef4444" stroke="#fca5a5" strokeWidth={2}
            />
          </g>
        </svg>
      </div>

      {/* Convergence note */}
      <div className="text-xs text-gray-600 font-mono">
        Optimum: w=3.0, loss=1.000 &nbsp;·&nbsp; lr=0.25 &nbsp;·&nbsp; f(w) = (w − 3)² + 1
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
