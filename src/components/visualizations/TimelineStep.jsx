import { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import StepControls from './StepControls.jsx'
import { useInterval } from '../../hooks/useInterval.js'

const SPEED_MS = { 0.5: 2000, 1: 1000, 1.5: 667, 2: 500, 3: 333 }

// Network layers for backprop visualization
const LAYERS = [
  { id: 'input',  label: 'Input',  sub: 'x = [0.8, 0.3]' },
  { id: 'hidden', label: 'Hidden', sub: 'ReLU(Wx + b)'    },
  { id: 'output', label: 'Output', sub: 'σ(Wx + b)'       },
  { id: 'loss',   label: 'Loss',   sub: 'MSE(ŷ, y)'       },
]

// Step definitions: forward then backward pass
const STEPS = [
  {
    forward:  new Set(),
    backward: new Set(),
    values:   {},
    phase:    'idle',
    annotation: 'Network ready. Forward pass: activations flow left → right. Backward pass: gradients flow right → left.',
  },
  {
    forward:  new Set(['input']),
    backward: new Set(),
    values:   { input: 'x=[0.8, 0.3]' },
    phase:    'forward',
    annotation: 'Forward pass ①: input features x=[0.8, 0.3] fed into the network.',
  },
  {
    forward:  new Set(['input', 'hidden']),
    backward: new Set(),
    values:   { input: 'x=[0.8, 0.3]', hidden: 'h=[0.62, 0.0, 0.44]' },
    phase:    'forward',
    annotation: 'Forward pass ②: hidden activations h = ReLU(W₁x + b₁) = [0.62, 0, 0.44].',
  },
  {
    forward:  new Set(['input', 'hidden', 'output']),
    backward: new Set(),
    values:   { input: 'x=[0.8, 0.3]', hidden: 'h=[0.62, 0, 0.44]', output: 'ŷ=0.71' },
    phase:    'forward',
    annotation: 'Forward pass ③: output ŷ = σ(W₂h + b₂) = 0.71. Target y=1.0.',
  },
  {
    forward:  new Set(['input', 'hidden', 'output', 'loss']),
    backward: new Set(),
    values:   { input: 'x=[0.8, 0.3]', hidden: 'h=[0.62, 0, 0.44]', output: 'ŷ=0.71', loss: 'L=0.084' },
    phase:    'forward',
    annotation: 'Forward pass ④: loss L = MSE(0.71, 1.0) = (0.71−1)² = 0.084. Begin backward pass.',
  },
  {
    forward:  new Set(['input', 'hidden', 'output', 'loss']),
    backward: new Set(['loss']),
    values:   { loss: 'L=0.084', grad_loss: 'dL=1' },
    phase:    'backward',
    annotation: 'Backward pass ①: dL/dL = 1.0 — gradient of loss with respect to itself.',
  },
  {
    forward:  new Set(['input', 'hidden', 'output', 'loss']),
    backward: new Set(['loss', 'output']),
    values:   { grad_output: 'dL/dŷ = −0.58' },
    phase:    'backward',
    annotation: 'Backward pass ②: chain rule gives dL/dŷ = 2(ŷ−y)/n = −0.58. Flows to output weights.',
  },
  {
    forward:  new Set(['input', 'hidden', 'output', 'loss']),
    backward: new Set(['loss', 'output', 'hidden']),
    values:   { grad_hidden: 'δh = W₂ᵀδ' },
    phase:    'backward',
    annotation: 'Backward pass ③: gradient through hidden layer — δh = W₂ᵀ · δ (only ReLU>0 neurons pass gradient).',
  },
  {
    forward:  new Set(['input', 'hidden', 'output', 'loss']),
    backward: new Set(['loss', 'output', 'hidden', 'input']),
    values:   { grad_input: 'dL/dW₁ = δh·xᵀ' },
    phase:    'backward',
    annotation: 'Backward pass ④: dL/dW₁ = δh · xᵀ. All gradients computed — ready for weight update.',
  },
]

// Edge arrows between layers
const EDGES = [
  { from: 'input', to: 'hidden' },
  { from: 'hidden', to: 'output' },
  { from: 'output', to: 'loss' },
]

export default function TimelineStep({ config = {} }) {
  const [step,    setStep]    = useState(0)
  const [playing, setPlaying] = useState(false)
  const [speed,   setSpeed]   = useState(1)

  const cur = STEPS[step]

  useInterval(
    () => { if (step < STEPS.length - 1) setStep(s => s + 1); else setPlaying(false) },
    playing ? SPEED_MS[speed] : null,
  )

  const handleReset = useCallback(() => { setStep(0); setPlaying(false) }, [])

  const isForward  = cur.phase === 'forward'
  const isBackward = cur.phase === 'backward'

  return (
    <div className="flex flex-col gap-4">
      {/* Phase indicator */}
      <div className="flex gap-3 items-center text-xs font-mono">
        <div className={`px-3 py-1 rounded border font-semibold transition-all ${
          isForward ? 'bg-dsa-600/20 border-dsa-500 text-dsa-400' : 'border-surface-600 text-gray-600'
        }`}>
          → Forward pass
        </div>
        <div className={`px-3 py-1 rounded border font-semibold transition-all ${
          isBackward ? 'bg-ml-500/20 border-ml-500 text-ml-400' : 'border-surface-600 text-gray-600'
        }`}>
          ← Backward pass
        </div>
      </div>

      {/* Network diagram */}
      <div className="rounded-lg border border-surface-600 bg-surface-800 p-5 overflow-x-auto">
        <div className="flex items-center justify-between gap-3 min-w-[480px]">
          {LAYERS.map((layer, li) => {
            const inForward  = cur.forward.has(layer.id)
            const inBackward = cur.backward.has(layer.id)

            const borderColor = inBackward ? '#f59e0b'
              : inForward ? '#3b82f6'
              : '#374151'
            const bgColor = inBackward ? 'rgba(245,158,11,0.10)'
              : inForward ? 'rgba(59,130,246,0.12)'
              : '#1c1c22'
            const labelColor = inBackward ? '#fcd34d'
              : inForward ? '#93c5fd'
              : '#6b7280'

            return (
              <div key={layer.id} className="flex items-center gap-3 flex-1">
                {/* Node */}
                <motion.div
                  animate={{ borderColor, backgroundColor: bgColor }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 rounded-xl border-2 p-3 flex flex-col items-center gap-1"
                  style={{ minWidth: 90 }}
                >
                  <span className="text-sm font-bold transition-colors" style={{ color: labelColor }}>
                    {layer.label}
                  </span>
                  <span className="text-[9px] text-gray-600 font-mono text-center leading-snug">
                    {layer.sub}
                  </span>

                  {/* Value annotation */}
                  <AnimatePresence>
                    {cur.values[layer.id] && (
                      <motion.div key={cur.values[layer.id]}
                        initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="mt-1 px-1.5 py-0.5 rounded bg-surface-600 text-[9px] font-mono text-green-300 text-center leading-snug"
                      >
                        {cur.values[layer.id]}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Arrow to next node */}
                {li < LAYERS.length - 1 && (
                  <div className="flex flex-col items-center gap-1 shrink-0" style={{ width: 40 }}>
                    {/* Forward arrow */}
                    <motion.div
                      animate={{ opacity: isForward || cur.phase === 'idle' ? 0.9 : 0.2 }}
                      className="flex items-center gap-0.5 text-dsa-500"
                    >
                      <div className="flex-1 h-px bg-current" style={{ width: 28 }} />
                      <span className="text-xs leading-none">›</span>
                    </motion.div>
                    {/* Backward arrow */}
                    <motion.div
                      animate={{ opacity: isBackward ? 0.9 : 0.15 }}
                      className="flex items-center gap-0.5 text-amber-500"
                    >
                      <span className="text-xs leading-none">‹</span>
                      <div className="flex-1 h-px bg-current" style={{ width: 28 }} />
                    </motion.div>

                    {/* Gradient value on edge */}
                    <AnimatePresence>
                      {isBackward && (() => {
                        const edgeKey = `grad_${LAYERS[li + 1]?.id}`
                        return cur.values[edgeKey] ? (
                          <motion.span key={edgeKey}
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="text-[8px] font-mono text-amber-400/80 text-center leading-tight"
                            style={{ maxWidth: 38 }}>
                            {cur.values[edgeKey]}
                          </motion.span>
                        ) : null
                      })()}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 inline-block bg-dsa-500" />
          forward (activations)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 inline-block bg-amber-500" />
          backward (gradients)
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
