/**
 * Pyodide worker manager — module-level singleton.
 *
 * One worker is shared across the entire app.  The worker auto-initialises
 * Pyodide when it is first created.  Subsequent calls to runPython() reuse
 * the already-warm runtime (~0 ms overhead after first load).
 *
 * On timeout the worker is terminated and the singleton is reset so the next
 * call to runPython() transparently spawns a fresh worker.
 */

const TIMEOUT_MS = 5000

// ─── module-level state ────────────────────────────────────────────────────

let worker       = null          // Worker instance
let initPromise  = null          // Promise<void> — resolves when 'ready' fires
let runIdCounter = 0
const pending    = new Map()     // runId → (result) => void

// Status: 'idle' | 'loading' | 'ready'
let _status = 'idle'
const _statusListeners = new Set()

function setStatus(s) {
  _status = s
  _statusListeners.forEach((fn) => fn(s))
}

export function getPyodideStatus() { return _status }

export function subscribePyodideStatus(fn) {
  _statusListeners.add(fn)
  return () => _statusListeners.delete(fn)
}

// ─── worker setup ──────────────────────────────────────────────────────────

function spawnWorker() {
  const w = new Worker('/pyodide.worker.js')

  w.onmessage = (e) => {
    const msg = e.data
    switch (msg.type) {
      case 'ready': {
        setStatus('ready')
        // Resolve the init promise stored in the closure below
        break
      }
      case 'result': {
        const cb = pending.get(msg.id)
        if (cb) {
          cb({ stdout: msg.stdout, stderr: msg.stderr, error: msg.error })
          pending.delete(msg.id)
        }
        break
      }
    }
  }

  w.onerror = (e) => {
    setStatus('idle')
    initPromise = null
    worker = null
  }

  return w
}

// ─── public API ────────────────────────────────────────────────────────────

/**
 * Lazily load Pyodide.  Safe to call multiple times — returns the same promise.
 */
export function initPyodide() {
  if (initPromise) return initPromise

  setStatus('loading')
  worker = spawnWorker()

  initPromise = new Promise((resolve, reject) => {
    // We patch onmessage temporarily to catch 'ready' / 'init_error'.
    // After that, the permanent handler above takes over for run results.
    const origHandler = worker.onmessage

    worker.onmessage = (e) => {
      if (e.data.type === 'ready') {
        setStatus('ready')
        worker.onmessage = origHandler  // restore
        resolve()
      } else if (e.data.type === 'init_error') {
        setStatus('idle')
        initPromise = null
        worker = null
        reject(new Error(e.data.message))
      } else {
        // result messages while still initialising — shouldn't happen
        origHandler(e)
      }
    }
  })

  return initPromise
}

/**
 * Execute `code` in the Pyodide sandbox.
 * Returns Promise<{ stdout: string, stderr: string, error: string|null }>.
 * Rejects only on catastrophic failure; execution errors come through `error`.
 */
export async function runPython(code) {
  await initPyodide()

  const id = ++runIdCounter

  return new Promise((resolve) => {
    let settled = false

    const timer = setTimeout(() => {
      if (settled) return
      settled = true
      pending.delete(id)

      // Kill the worker — it may be stuck in an infinite loop
      if (worker) { worker.terminate(); worker = null }
      initPromise = null
      setStatus('idle')

      resolve({
        stdout: '',
        stderr: '',
        error: 'Execution timed out (5 second limit exceeded).',
      })
    }, TIMEOUT_MS)

    pending.set(id, (result) => {
      if (settled) return
      settled = true
      clearTimeout(timer)
      resolve(result)
    })

    worker.postMessage({ type: 'run', code, id })
  })
}
