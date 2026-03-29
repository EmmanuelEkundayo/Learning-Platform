import { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import StepControls from './StepControls.jsx'
import { useInterval } from '../../hooks/useInterval.js'

const SPEED_MS = { 0.5: 2000, 1: 1000, 1.5: 667, 2: 500, 3: 333 }

// Network architecture: 3 → 4 → 2
const ARCH = [3, 4, 2]
const LAYER_LABELS = ['Input', 'Hidden', 'Output']
const LAYER_COLORS = {
  idle:    { fill: '#1c1c22', stroke: '#374151', text: '#6b7280' },
  active:  { fill: '#1d3557', stroke: '#3b82f6', text: '#93c5fd' },
  done:    { fill: '#14532d', stroke: '#22c55e', text: '#86efac' },
}

// Build pre-computed node positions for a clean layout
function buildLayout() {
  const W = 480, H = 320
  const layerX = [80, 240, 400]   // x center per layer

  const nodes = []
  const edges = []

  ARCH.forEach((n, li) => {
    const spacing = H / (n + 1)
    for (let ni = 0; ni < n; ni++) {
      nodes.push({
        id:    `L${li}N${ni}`,
        layer: li,
        idx:   ni,
        x:     layerX[li],
        y:     spacing * (ni + 1),
      })
    }
  })

  // Edges between adjacent layers
  ARCH.forEach((n, li) => {
    if (li === ARCH.length - 1) return
    const fromNodes = nodes.filter(nd => nd.layer === li)
    const toNodes   = nodes.filter(nd => nd.layer === li + 1)
    fromNodes.forEach(f => toNodes.forEach(t => {
      edges.push({ from: f.id, to: t.id, fromLayer: li, toLayer: li + 1 })
    }))
  })

  return { nodes, edges, W, H }
}

// Forward pass animation steps
const SAMPLE = { input: ['0.8', '0.3', '0.5'] }

const STEPS = [
  {
    activeLayer: -1,
    doneLayer:   -1,
    values: {},
    annotation: 'Network: 3 inputs → 4 hidden (ReLU) → 2 outputs (softmax). Ready for forward pass.',
  },
  {
    activeLayer: 0,
    doneLayer:   -1,
    values: { 0: ['0.80', '0.30', '0.50'] },
    annotation: 'Layer 0 (Input): features x = [0.80, 0.30, 0.50] fed into the network.',
  },
  {
    activeLayer: 1,
    doneLayer:   0,
    values: { 0: ['0.80', '0.30', '0.50'], 1: ['0.72', '0.00', '0.45', '0.61'] },
    annotation: 'Layer 1 (Hidden): z = W₁x + b₁, then h = ReLU(z) = [0.72, 0.00, 0.45, 0.61]. Note: one neuron gated off by ReLU.',
  },
  {
    activeLayer: 2,
    doneLayer:   1,
    values: { 0: ['0.80', '0.30', '0.50'], 1: ['0.72', '0.00', '0.45', '0.61'], 2: ['0.73', '0.27'] },
    annotation: 'Layer 2 (Output): softmax gives class probabilities [0.73, 0.27]. Predicted class: 0.',
  },
]

const { nodes, edges, W, H } = buildLayout()

export default function NeuralNetDiagram({ config = {} }) {
  const [step,    setStep]    = useState(0)
  const [playing, setPlaying] = useState(false)
  const [speed,   setSpeed]   = useState(1)

  const cur = STEPS[step]

  useInterval(
    () => { if (step < STEPS.length - 1) setStep(s => s + 1); else setPlaying(false) },
    playing ? SPEED_MS[speed] : null,
  )

  const handleReset = useCallback(() => { setStep(0); setPlaying(false) }, [])

  function nodeState(node) {
    if (node.layer === cur.activeLayer) return 'active'
    if (node.layer <= cur.doneLayer)   return 'done'
    return 'idle'
  }

  function edgeOpacity(edge) {
    if (edge.fromLayer === cur.doneLayer && edge.toLayer === cur.activeLayer) return 0.8
    if (edge.toLayer <= cur.doneLayer) return 0.5
    return 0.12
  }

  function edgeColor(edge) {
    if (edge.fromLayer === cur.doneLayer && edge.toLayer === cur.activeLayer) return '#3b82f6'
    return '#374151'
  }

  return (
    <div className="flex flex-col gap-3">
      {/* SVG diagram */}
      <div className="rounded-lg border border-surface-600 bg-surface-800 overflow-hidden">
        <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ maxHeight: 340 }}>
          {/* Layer labels */}
          {ARCH.map((_, li) => {
            const x = [80, 240, 400][li]
            return (
              <text key={li} x={x} y={18} textAnchor="middle"
                fill="#4b5563" fontSize={11} fontFamily="Inter,sans-serif" fontWeight="600">
                {LAYER_LABELS[li]}
              </text>
            )
          })}

          {/* Edges */}
          {edges.map((e, i) => (
            <motion.line key={i}
              x1={nodes.find(n => n.id === e.from).x}
              y1={nodes.find(n => n.id === e.from).y}
              x2={nodes.find(n => n.id === e.to).x}
              y2={nodes.find(n => n.id === e.to).y}
              animate={{ stroke: edgeColor(e), strokeOpacity: edgeOpacity(e), strokeWidth: edgeOpacity(e) > 0.5 ? 1.5 : 0.8 }}
              transition={{ duration: 0.3 }}
            />
          ))}

          {/* Nodes */}
          {nodes.map(node => {
            const state  = nodeState(node)
            const colors = LAYER_COLORS[state]
            const valArr = cur.values[node.layer]
            const val    = valArr ? valArr[node.idx] : null
            const isZero = val === '0.00'

            return (
              <g key={node.id} transform={`translate(${node.x},${node.y})`}>
                <motion.circle r={20}
                  animate={{ fill: isZero ? '#1f1f28' : colors.fill, stroke: isZero ? '#374151' : colors.stroke }}
                  transition={{ duration: 0.3 }}
                  strokeWidth={2}
                />
                {val ? (
                  <text textAnchor="middle" dominantBaseline="central"
                    fill={isZero ? '#4b5563' : colors.text}
                    fontSize={9} fontFamily="'JetBrains Mono',monospace" fontWeight="700">
                    {val}
                  </text>
                ) : (
                  <text textAnchor="middle" dominantBaseline="central"
                    fill={colors.text} fontSize={11} fontFamily="Inter,sans-serif">
                    {node.idx + 1}
                  </text>
                )}
              </g>
            )
          })}

          {/* Output predictions */}
          <AnimatePresence>
            {cur.activeLayer === 2 && (
              <>
                {[0, 1].map(i => {
                  const node = nodes.find(n => n.layer === 2 && n.idx === i)
                  const pct  = cur.values[2][i]
                  const isWinner = parseFloat(pct) > 0.5
                  return (
                    <motion.text key={i}
                      initial={{ opacity: 0, x: node.x + 28 }} animate={{ opacity: 1, x: node.x + 32 }}
                      y={node.y + 4} textAnchor="start" dominantBaseline="middle"
                      fill={isWinner ? '#22c55e' : '#6b7280'}
                      fontSize={10} fontFamily="'JetBrains Mono',monospace" fontWeight="600">
                      C{i} {isWinner ? '✓' : ''}
                    </motion.text>
                  )
                })}
              </>
            )}
          </AnimatePresence>
        </svg>
      </div>

      {/* Layer info */}
      <div className="grid grid-cols-3 gap-2 text-xs font-mono">
        {ARCH.map((n, li) => {
          const state = li === cur.activeLayer ? 'active' : li <= cur.doneLayer ? 'done' : 'idle'
          return (
            <div key={li} className={`px-2 py-1.5 rounded border text-center transition-all ${
              state === 'active' ? 'bg-dsa-600/10 border-dsa-500/60 text-dsa-400'
              : state === 'done' ? 'bg-green-900/10 border-green-900/40 text-green-500'
              : 'border-surface-600 text-gray-600'
            }`}>
              {LAYER_LABELS[li]} ({n})
            </div>
          )
        })}
      </div>

      <StepControls
        step={step} totalSteps={STEPS.length} playing={playing} speed={speed}
        annotation={cur?.annotation}
        onPrev={()  => { setPlaying(false); setStep(s => Math.max(0, s - 1)) }}
        onNext={()  => { setPlaying(false); setStep(s => Math.min(STEPS.length - 1, s + 1)) }}
        onPlay={()  => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onReset={handleReset}
        onSpeedChange={setSpeed}
      />
    </div>
  )
}
