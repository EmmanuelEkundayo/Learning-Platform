import { useState, useMemo, useCallback } from 'react'
import * as d3 from 'd3'
import { motion } from 'framer-motion'
import StepControls from './StepControls.jsx'
import { useInterval } from '../../hooks/useInterval.js'

const SPEED_MS = { 0.5: 1800, 1: 900, 1.5: 600, 2: 450, 3: 300 }

// Hardcoded iris CART decision tree
const TREE_DATA = {
  id: 'root',
  feature: 'petal_length', threshold: 2.45,
  gini: 0.667, samples: 150,
  children: [
    { id: 'leaf-L', isLeaf: true, label: 'Setosa', classIdx: 0, gini: 0.000, samples: 50 },
    {
      id: 'node-R',
      feature: 'petal_width', threshold: 1.75,
      gini: 0.500, samples: 100,
      children: [
        { id: 'leaf-RL', isLeaf: true, label: 'Versicolor', classIdx: 1, gini: 0.168, samples: 54 },
        { id: 'leaf-RR', isLeaf: true, label: 'Virginica',  classIdx: 2, gini: 0.043, samples: 46 },
      ],
    },
  ],
}

// Traversal of sample: petal_length=5.1, petal_width=1.8 → Virginica
const STEPS = [
  {
    active: new Set(),
    annotation: 'Sample: petal_length=5.1, petal_width=1.8. Start at the root node.',
  },
  {
    active: new Set(['root']),
    annotation: 'Root: petal_length=5.1 ≤ 2.45? NO → follow right branch.',
  },
  {
    active: new Set(['root', 'node-R']),
    annotation: 'Node: petal_width=1.8 ≤ 1.75? NO → follow right branch.',
  },
  {
    active: new Set(['root', 'node-R', 'leaf-RR']),
    annotation: 'Leaf: Virginica (Gini=0.043, 46/46 samples). Prediction: Virginica.',
  },
]

const CLASS_COLORS   = ['#3b82f6', '#22c55e', '#f59e0b']
const CLASS_NAMES    = ['Setosa', 'Versicolor', 'Virginica']
const NODE_W = 116, NODE_H = 60

export default function TreeCanvas({ config = {} }) {
  const [step,    setStep]    = useState(0)
  const [playing, setPlaying] = useState(false)
  const [speed,   setSpeed]   = useState(1)

  const cur = STEPS[step]

  useInterval(
    () => { if (step < STEPS.length - 1) setStep(s => s + 1); else setPlaying(false) },
    playing ? SPEED_MS[speed] : null,
  )

  const handleReset = useCallback(() => { setStep(0); setPlaying(false) }, [])

  // D3 tree layout — computation only, no DOM manipulation
  const { nodes, links, W, H } = useMemo(() => {
    const W = 540, H = 300
    const root   = d3.hierarchy(TREE_DATA)
    const layout = d3.tree().size([W - 120, H - 100])
    layout(root)
    root.each(n => { n.x += 60; n.y += 50 })
    return { nodes: root.descendants(), links: root.links(), W, H }
  }, [])

  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-lg border border-surface-600 bg-surface-800 overflow-hidden">
        <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ maxHeight: 320 }}>
          {/* Links */}
          {links.map((link, i) => {
            const active = cur.active.has(link.source.data.id) && cur.active.has(link.target.data.id)
            return (
              <motion.line key={i}
                x1={link.source.x} y1={link.source.y}
                x2={link.target.x} y2={link.target.y}
                animate={{ stroke: active ? '#60a5fa' : '#374151', strokeWidth: active ? 2.5 : 1.5 }}
                transition={{ duration: 0.25 }}
              />
            )
          })}

          {/* Nodes */}
          {nodes.map(node => {
            const d       = node.data
            const active  = cur.active.has(d.id)
            const color   = d.isLeaf ? CLASS_COLORS[d.classIdx] : '#60a5fa'
            const hw = NODE_W / 2, hh = NODE_H / 2

            return (
              <g key={d.id} transform={`translate(${node.x},${node.y})`}>
                <motion.rect
                  x={-hw} y={-hh} width={NODE_W} height={NODE_H} rx={6}
                  animate={{
                    fill:        active ? (d.isLeaf ? `${color}20` : '#1d3557') : '#1c1c22',
                    stroke:      active ? color : '#374151',
                    strokeWidth: active ? 2.5 : 1.5,
                  }}
                  transition={{ duration: 0.25 }}
                />
                {d.isLeaf ? (
                  <>
                    <text textAnchor="middle" y={-10} fontSize={11} fontWeight="700"
                      fontFamily="Inter,sans-serif"
                      fill={active ? color : '#9ca3af'}>
                      {d.label}
                    </text>
                    <text textAnchor="middle" y={5} fontSize={9} fontFamily="Inter,sans-serif" fill="#6b7280">
                      gini={d.gini.toFixed(3)}
                    </text>
                    <text textAnchor="middle" y={18} fontSize={9} fontFamily="Inter,sans-serif" fill="#6b7280">
                      n={d.samples}
                    </text>
                  </>
                ) : (
                  <>
                    <text textAnchor="middle" y={-10} fontSize={10} fontWeight="600"
                      fontFamily="'JetBrains Mono',monospace"
                      fill={active ? '#93c5fd' : '#9ca3af'}>
                      {d.feature} ≤ {d.threshold}
                    </text>
                    <text textAnchor="middle" y={5} fontSize={9} fontFamily="Inter,sans-serif" fill="#6b7280">
                      gini={d.gini.toFixed(3)}
                    </text>
                    <text textAnchor="middle" y={18} fontSize={9} fontFamily="Inter,sans-serif" fill="#6b7280">
                      n={d.samples}
                    </text>
                  </>
                )}
              </g>
            )
          })}
        </svg>
      </div>

      {/* Class legend */}
      <div className="flex gap-4 text-xs text-gray-400 flex-wrap">
        {CLASS_NAMES.map((name, i) => (
          <span key={name} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm inline-block shrink-0"
              style={{ backgroundColor: CLASS_COLORS[i] }} />
            {name}
          </span>
        ))}
        <span className="flex items-center gap-1.5 ml-auto text-gray-600 italic">
          sample: petal_length=5.1, petal_width=1.8
        </span>
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
