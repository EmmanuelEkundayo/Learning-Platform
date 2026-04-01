const fs = require('fs'), path = require('path');
const dir = 'src/data/concepts';

const configs = {
  'circuit-breaker': {
    states: [
      { id: 'closed',    label: 'CLOSED',    sub: 'requests pass' },
      { id: 'open',      label: 'OPEN',      sub: 'fail fast'     },
      { id: 'half_open', label: 'HALF-OPEN', sub: 'probe'         },
    ],
    transitions: [
      { from: 'closed',    to: 'open',      label: 'threshold hit' },
      { from: 'open',      to: 'half_open', label: 'timeout'       },
      { from: 'half_open', to: 'closed',    label: 'probe OK'      },
      { from: 'half_open', to: 'open',      label: 'probe fail'    },
    ],
    steps: [
      { active_state: 'closed',    annotation: 'CLOSED: all requests pass through. Failure counter increments on errors.' },
      { active_state: 'closed',    annotation: 'Failures accumulate. Once threshold (e.g. 5 failures / 60s) is hit, circuit trips.' },
      { active_state: 'open',      annotation: 'OPEN: all requests fail immediately with a fallback. Service gets time to recover.' },
      { active_state: 'half_open', annotation: 'After timeout, one probe request is allowed through to test recovery.' },
      { active_state: 'closed',    annotation: 'Probe succeeded → circuit resets to CLOSED. Normal traffic resumes.' },
    ],
  },
  'component-lifecycle': {
    states: [
      { id: 'mount',   label: 'Mount',   sub: 'constructor' },
      { id: 'render',  label: 'Render',  sub: 'virtual DOM' },
      { id: 'commit',  label: 'Commit',  sub: 'real DOM'    },
      { id: 'update',  label: 'Update',  sub: 'props/state' },
      { id: 'unmount', label: 'Unmount', sub: 'cleanup'     },
    ],
    transitions: [
      { from: 'mount',   to: 'render',  label: 'initial' },
      { from: 'render',  to: 'commit',  label: 'diff'    },
      { from: 'commit',  to: 'update',  label: 'effect'  },
      { from: 'update',  to: 'render',  label: 're-render' },
      { from: 'commit',  to: 'unmount', label: 'removed' },
    ],
    steps: [
      { active_state: 'mount',   annotation: 'Mount: component created. State initialised, constructor runs.' },
      { active_state: 'render',  annotation: 'Render: React calls the function, producing a virtual DOM tree.' },
      { active_state: 'commit',  annotation: 'Commit: React diffs virtual DOM and patches the real DOM. useLayoutEffect fires.' },
      { active_state: 'update',  annotation: 'useEffect runs after paint. On state/prop change, re-render begins.' },
      { active_state: 'unmount', annotation: 'Unmount: component removed. useEffect cleanup runs to cancel subscriptions/timers.' },
    ],
  },
  'error-boundaries': {
    states: [
      { id: 'normal',   label: 'Normal',   sub: 'rendering'  },
      { id: 'throwing', label: 'Error',    sub: 'thrown'     },
      { id: 'caught',   label: 'Caught',   sub: 'boundary'   },
      { id: 'fallback', label: 'Fallback', sub: 'UI shown'   },
      { id: 'reset',    label: 'Reset',    sub: 'retry'      },
    ],
    transitions: [
      { from: 'normal',   to: 'throwing', label: 'throws'    },
      { from: 'throwing', to: 'caught',   label: 'bubble up' },
      { from: 'caught',   to: 'fallback', label: 'getDerived' },
      { from: 'fallback', to: 'reset',    label: 'onReset'   },
      { from: 'reset',    to: 'normal',   label: 'retry'     },
    ],
    steps: [
      { active_state: 'normal',   annotation: 'Normal render: component tree renders without errors.' },
      { active_state: 'throwing', annotation: 'A child component throws during render or lifecycle.' },
      { active_state: 'caught',   annotation: 'Error bubbles up to the nearest error boundary (class component).' },
      { active_state: 'fallback', annotation: 'getDerivedStateFromError sets hasError=true. Fallback UI renders instead of crashed subtree.' },
      { active_state: 'reset',    annotation: 'User clicks retry → boundary resets state → subtree re-mounts cleanly.' },
    ],
  },
  'event-loop-browser': {
    states: [
      { id: 'call_stack',     label: 'Call Stack',   sub: 'sync JS'    },
      { id: 'web_apis',       label: 'Web APIs',     sub: 'async ops'  },
      { id: 'microtasks',     label: 'Microtasks',   sub: 'Promises'   },
      { id: 'task_queue',     label: 'Task Queue',   sub: 'setTimeout' },
      { id: 'render',         label: 'Render',       sub: 'rAF + paint'},
    ],
    transitions: [
      { from: 'call_stack', to: 'web_apis',   label: 'async call'    },
      { from: 'web_apis',   to: 'microtasks', label: 'Promise resolves'},
      { from: 'web_apis',   to: 'task_queue', label: 'cb ready'      },
      { from: 'microtasks', to: 'call_stack', label: 'drain queue'   },
      { from: 'task_queue', to: 'call_stack', label: 'event loop'    },
      { from: 'call_stack', to: 'render',     label: 'stack empty'   },
    ],
    steps: [
      { active_state: 'call_stack', annotation: 'Synchronous JS executes on the call stack. Each function call is a frame.' },
      { active_state: 'web_apis',   annotation: 'Async ops (fetch, setTimeout) are offloaded to browser Web APIs. Stack is freed.' },
      { active_state: 'microtasks', annotation: 'When stack empties, microtask queue drains completely — all Promise .then()/.catch() callbacks.' },
      { active_state: 'task_queue', annotation: 'One macrotask (setTimeout cb, click handler) is dequeued and run per event loop iteration.' },
      { active_state: 'render',     annotation: 'Between tasks, browser may run rAF callbacks and repaint. Stack must be empty.' },
    ],
  },
  'event-loop-nodejs': {
    states: [
      { id: 'timers',   label: 'Timers',   sub: 'setTimeout'  },
      { id: 'io',       label: 'I/O',      sub: 'callbacks'   },
      { id: 'poll',     label: 'Poll',     sub: 'fetch I/O'   },
      { id: 'check',    label: 'Check',    sub: 'setImmediate' },
      { id: 'close',    label: 'Close',    sub: 'close cbs'   },
    ],
    transitions: [
      { from: 'timers', to: 'io',    label: '' },
      { from: 'io',     to: 'poll',  label: '' },
      { from: 'poll',   to: 'check', label: '' },
      { from: 'check',  to: 'close', label: '' },
      { from: 'close',  to: 'timers',label: 'next tick' },
    ],
    steps: [
      { active_state: 'timers', annotation: 'Timers phase: runs callbacks scheduled by setTimeout/setInterval whose delay has elapsed.' },
      { active_state: 'io',     annotation: 'I/O callbacks: executes deferred I/O callbacks (e.g. errors from previous cycle).' },
      { active_state: 'poll',   annotation: 'Poll phase: retrieves new I/O events. Blocks here if queue is empty, waiting for I/O.' },
      { active_state: 'check',  annotation: 'Check phase: setImmediate() callbacks run — always after poll, before close events.' },
      { active_state: 'close',  annotation: 'Close callbacks: socket.on("close") and similar cleanup handlers execute.' },
    ],
  },
  'feature-flags': {
    states: [
      { id: 'off',     label: 'Off',     sub: '0% traffic'   },
      { id: 'canary',  label: 'Canary',  sub: '1-5%'         },
      { id: 'rollout', label: 'Rollout', sub: '10-90%'       },
      { id: 'full',    label: 'Full On', sub: '100%'         },
    ],
    transitions: [
      { from: 'off',     to: 'canary',  label: 'enable'   },
      { from: 'canary',  to: 'rollout', label: 'expand'   },
      { from: 'rollout', to: 'full',    label: '100%'     },
      { from: 'full',    to: 'off',     label: 'rollback' },
      { from: 'canary',  to: 'off',     label: 'rollback' },
      { from: 'rollout', to: 'off',     label: 'rollback' },
    ],
    steps: [
      { active_state: 'off',     annotation: 'Flag OFF: feature disabled for all users. Safe default state.' },
      { active_state: 'canary',  annotation: 'Canary: 1-5% of users see the new feature. Errors monitored closely.' },
      { active_state: 'rollout', annotation: 'Gradual rollout: percentage increases as confidence grows. Can pause at any point.' },
      { active_state: 'full',    annotation: 'Full on: 100% of users have the feature. Flag can be cleaned up from code.' },
    ],
  },
  'promises-internals': {
    states: [
      { id: 'pending',   label: 'Pending',   sub: 'async op running' },
      { id: 'fulfilled', label: 'Fulfilled', sub: 'resolve(value)'   },
      { id: 'rejected',  label: 'Rejected',  sub: 'reject(error)'    },
    ],
    transitions: [
      { from: 'pending',   to: 'fulfilled', label: 'resolve()' },
      { from: 'pending',   to: 'rejected',  label: 'reject()'  },
      { from: 'fulfilled', to: 'fulfilled', label: '.then()'   },
      { from: 'rejected',  to: 'fulfilled', label: '.catch()'  },
    ],
    steps: [
      { active_state: 'pending',   annotation: 'Pending: initial state. The async operation is in flight.' },
      { active_state: 'fulfilled', annotation: 'Fulfilled: resolve(value) called. .then() handlers enqueued as microtasks.' },
      { active_state: 'rejected',  annotation: 'Rejected: reject(error) called. .catch() or second .then() arg handles it.' },
      { active_state: 'fulfilled', annotation: 'Settled state is permanent — a promise can never change state again.' },
    ],
  },
  'pwa-basics': {
    states: [
      { id: 'install',  label: 'Install',  sub: 'SW registered'  },
      { id: 'activate', label: 'Activate', sub: 'old SW cleared' },
      { id: 'fetch',    label: 'Intercept',sub: 'fetch events'   },
      { id: 'cache',    label: 'Cache',    sub: 'CacheStorage'   },
      { id: 'offline',  label: 'Offline',  sub: 'serve cache'    },
    ],
    transitions: [
      { from: 'install',  to: 'activate', label: 'skipWaiting'  },
      { from: 'activate', to: 'fetch',    label: 'clients.claim'},
      { from: 'fetch',    to: 'cache',    label: 'cache.put'    },
      { from: 'fetch',    to: 'offline',  label: 'network fail' },
      { from: 'cache',    to: 'offline',  label: 'cache.match'  },
    ],
    steps: [
      { active_state: 'install',  annotation: 'Install: SW registered, precaches app shell files. New SW waits if old one active.' },
      { active_state: 'activate', annotation: 'Activate: old caches pruned, clients.claim() takes control of open pages.' },
      { active_state: 'fetch',    annotation: 'Fetch: SW intercepts every network request — decides cache vs. network strategy.' },
      { active_state: 'cache',    annotation: 'Cache-first: serve from CacheStorage, update in background (stale-while-revalidate).' },
      { active_state: 'offline',  annotation: 'Offline: network unavailable — SW serves cached assets. App still works.' },
    ],
  },
  'service-workers': {
    states: [
      { id: 'parsed',     label: 'Parsed',     sub: 'script loaded' },
      { id: 'installing', label: 'Installing', sub: 'install event' },
      { id: 'installed',  label: 'Installed',  sub: 'waiting'       },
      { id: 'activating', label: 'Activating', sub: 'activate event'},
      { id: 'activated',  label: 'Activated',  sub: 'controlling'   },
      { id: 'redundant',  label: 'Redundant',  sub: 'replaced'      },
    ],
    transitions: [
      { from: 'parsed',     to: 'installing', label: 'register()' },
      { from: 'installing', to: 'installed',  label: 'install OK' },
      { from: 'installing', to: 'redundant',  label: 'install fail'},
      { from: 'installed',  to: 'activating', label: 'no old SW'  },
      { from: 'activating', to: 'activated',  label: 'activate OK'},
      { from: 'activated',  to: 'redundant',  label: 'new SW'     },
    ],
    steps: [
      { active_state: 'parsed',     annotation: 'Script parsed: navigator.serviceWorker.register() called. Browser downloads the SW file.' },
      { active_state: 'installing', annotation: 'Installing: install event fires. precache assets in event.waitUntil(cache.addAll(...)).' },
      { active_state: 'installed',  annotation: 'Installed/Waiting: SW ready but old SW still controls the page. Waits for all tabs to close.' },
      { active_state: 'activating', annotation: 'Activating: activate event fires. Clean up old caches here.' },
      { active_state: 'activated',  annotation: 'Activated: SW controls all clients. fetch, push, sync events now intercepted.' },
      { active_state: 'redundant',  annotation: 'Redundant: replaced by a newer SW or failed to install. Inert — will be garbage collected.' },
    ],
  },
  'session-authentication': {
    states: [
      { id: 'anon',    label: 'Anonymous', sub: 'no session'     },
      { id: 'login',   label: 'Login',     sub: 'POST /login'    },
      { id: 'created', label: 'Session',   sub: 'ID stored'      },
      { id: 'authed',  label: 'Authed',    sub: 'cookie sent'    },
      { id: 'expired', label: 'Expired',   sub: 'TTL elapsed'    },
    ],
    transitions: [
      { from: 'anon',    to: 'login',   label: 'submit creds'  },
      { from: 'login',   to: 'created', label: 'creds valid'   },
      { from: 'login',   to: 'anon',    label: 'invalid'       },
      { from: 'created', to: 'authed',  label: 'Set-Cookie'    },
      { from: 'authed',  to: 'expired', label: 'TTL / logout'  },
      { from: 'expired', to: 'anon',    label: 'session cleared'},
    ],
    steps: [
      { active_state: 'anon',    annotation: 'Anonymous: user has no session. All protected routes return 401.' },
      { active_state: 'login',   annotation: 'Login: credentials POSTed. Server checks password hash against DB.' },
      { active_state: 'created', annotation: 'Session created: server generates session ID, stores {userId, expiry} in session store.' },
      { active_state: 'authed',  annotation: 'Authenticated: session ID sent as httpOnly cookie. Browser auto-attaches on every request.' },
      { active_state: 'expired', annotation: 'Expired: TTL elapsed or user logs out. Session deleted from store. Cookie cleared.' },
    ],
  },
  'tdd-cycle': {
    states: [
      { id: 'red',      label: 'Red',      sub: 'test fails'  },
      { id: 'green',    label: 'Green',    sub: 'test passes' },
      { id: 'refactor', label: 'Refactor', sub: 'clean up'    },
    ],
    transitions: [
      { from: 'red',      to: 'green',    label: 'write code'  },
      { from: 'green',    to: 'refactor', label: 'passes'      },
      { from: 'refactor', to: 'red',      label: 'new test'    },
    ],
    steps: [
      { active_state: 'red',      annotation: 'Red: write a failing test first. It defines the desired behaviour before any implementation.' },
      { active_state: 'green',    annotation: 'Green: write the minimum code to make the test pass. No extras — just enough.' },
      { active_state: 'refactor', annotation: 'Refactor: clean up duplication and improve design. Tests stay green throughout.' },
      { active_state: 'red',      annotation: 'Repeat: write the next failing test. The cycle drives the entire implementation.' },
    ],
  },
  'web-workers': {
    states: [
      { id: 'main',      label: 'Main Thread', sub: 'UI + JS'        },
      { id: 'spawn',     label: 'Spawn',       sub: 'new Worker()'   },
      { id: 'worker',    label: 'Worker',      sub: 'background JS'  },
      { id: 'msg_out',   label: 'postMessage', sub: 'main → worker'  },
      { id: 'msg_in',    label: 'onmessage',   sub: 'worker → main'  },
    ],
    transitions: [
      { from: 'main',    to: 'spawn',   label: 'create'         },
      { from: 'spawn',   to: 'worker',  label: 'initialise'     },
      { from: 'main',    to: 'msg_out', label: 'postMessage()'  },
      { from: 'msg_out', to: 'worker',  label: 'MessageEvent'   },
      { from: 'worker',  to: 'msg_in',  label: 'postMessage()'  },
      { from: 'msg_in',  to: 'main',    label: 'onmessage cb'   },
    ],
    steps: [
      { active_state: 'main',    annotation: 'Main thread: runs all UI code. Blocking work here freezes the page.' },
      { active_state: 'spawn',   annotation: 'new Worker("worker.js") creates a background thread with its own JS runtime.' },
      { active_state: 'worker',  annotation: 'Worker has no DOM access. Ideal for CPU-intensive work: parsing, image processing, crypto.' },
      { active_state: 'msg_out', annotation: 'main.postMessage(data) — data is structured-cloned (deep copy) to the worker.' },
      { active_state: 'msg_in',  annotation: 'worker.postMessage(result) — result flows back. Main thread updates UI with the result.' },
    ],
  },
  'zustand-redux-patterns': {
    states: [
      { id: 'view',     label: 'View',     sub: 'React component' },
      { id: 'action',   label: 'Action',   sub: 'event / intent'  },
      { id: 'store',    label: 'Store',    sub: 'Zustand state'   },
      { id: 'selector', label: 'Selector', sub: 'derived value'   },
    ],
    transitions: [
      { from: 'view',     to: 'action',   label: 'user event'     },
      { from: 'action',   to: 'store',    label: 'set() / dispatch'},
      { from: 'store',    to: 'selector', label: 'state change'   },
      { from: 'selector', to: 'view',     label: 're-render'      },
    ],
    steps: [
      { active_state: 'view',     annotation: 'View: React component reads state via useStore(s => s.value) selector.' },
      { active_state: 'action',   annotation: 'Action: user interaction triggers a store method — e.g. store.increment().' },
      { active_state: 'store',    annotation: 'Store: Zustand calls set() internally, producing new state immutably.' },
      { active_state: 'selector', annotation: 'Selector: only components subscribed to changed slices re-render. Others skip.' },
      { active_state: 'view',     annotation: 'View updates with new value. Cycle complete — unidirectional data flow.' },
    ],
  },
};

let updated = 0;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
files.forEach(f => {
  const fp = path.join(dir, f);
  const c  = JSON.parse(fs.readFileSync(fp, 'utf8'));
  if (configs[c.slug]) {
    c.visualization.config = configs[c.slug];
    fs.writeFileSync(fp, JSON.stringify(c, null, 2));
    updated++;
  }
});
console.log('State-diagram configs applied to', updated, 'files.');
