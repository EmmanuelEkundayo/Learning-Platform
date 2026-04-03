const react = {
  id: 'react',
  title: 'React',
  color: 'cyan',
  category: 'Frontend',
  description: 'Component patterns, hooks, routing, and modern React best practices',
  sections: [
    {
      title: 'Component Syntax',
      items: [
        {
          label: 'Function component',
          language: 'jsx',
          code: `function Greeting({ name, age }) {
  return (
    <div>
      <h1>Hello, {name}</h1>
      <p>Age: {age}</p>
    </div>
  )
}`,
        },
        {
          label: 'Arrow function component',
          language: 'jsx',
          code: `const Button = ({ onClick, children, disabled = false }) => (
  <button onClick={onClick} disabled={disabled}>
    {children}
  </button>
)`,
          note: 'Arrow components are identical in behavior to function components - choose one style and be consistent'
        },
        {
          label: 'React.memo - skip re-renders when props are unchanged',
          language: 'jsx',
          code: `const ExpensiveList = React.memo(function ExpensiveList({ items }) {
  return (
    <ul>
      {items.map(item => <li key={item.id}>{item.name}</li>)}
    </ul>
  )
})

// With custom comparison
const Item = React.memo(({ id, name }) => <div>{name}</div>, (prev, next) => {
  return prev.id === next.id && prev.name === next.name
})`,
          note: 'React.memo does a shallow comparison by default. Only use it when a component re-renders too often with the same props'
        },
        {
          label: 'displayName for debugging',
          language: 'jsx',
          code: `const Input = ({ value, onChange }) => (
  <input value={value} onChange={onChange} />
)
Input.displayName = 'Input'

// HOCs should set displayName for DevTools
function withAuth(Component) {
  const WrappedComponent = (props) => {
    const user = useAuth()
    return user ? <Component {...props} /> : <Redirect to="/login" />
  }
  WrappedComponent.displayName = \`withAuth(\${Component.displayName || Component.name})\`
  return WrappedComponent
}`,
          note: 'displayName shows in React DevTools and error messages - set it on HOCs and forwardRef components'
        },
        {
          label: 'Fragments',
          language: 'jsx',
          code: `// Full syntax - supports key prop
function List({ items }) {
  return (
    <React.Fragment>
      <h2>Items</h2>
      <ul>{items.map(i => <li key={i.id}>{i.name}</li>)}</ul>
    </React.Fragment>
  )
}

// Short syntax - no key prop support
function Card() {
  return (
    <>
      <h3>Title</h3>
      <p>Body</p>
    </>
  )
}`,
          note: 'Use the full <React.Fragment key={...}> syntax when rendering a list of fragments'
        },
        {
          label: 'Default props and prop types',
          language: 'jsx',
          code: `function Avatar({ src, alt, size = 40, shape = 'circle' }) {
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      style={{ borderRadius: shape === 'circle' ? '50%' : 4 }}
    />
  )
}`,
          note: 'Use default parameter values instead of the deprecated defaultProps static property'
        }
      ]
    },
    {
      title: 'useState',
      items: [
        {
          label: 'Basic state',
          language: 'jsx',
          code: `import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  )
}`,
        },
        {
          label: 'Object state',
          language: 'jsx',
          code: `const [form, setForm] = useState({ name: '', email: '', age: 0 })

// Always spread to avoid losing other fields
function handleChange(e) {
  setForm(prev => ({
    ...prev,
    [e.target.name]: e.target.value
  }))
}`,
          note: 'React does not merge object state automatically - you must spread the previous state yourself'
        },
        {
          label: 'Array state',
          language: 'jsx',
          code: `const [items, setItems] = useState([])

// Add
setItems(prev => [...prev, newItem])

// Remove by id
setItems(prev => prev.filter(item => item.id !== id))

// Update an item
setItems(prev => prev.map(item =>
  item.id === id ? { ...item, ...changes } : item
))`,
          note: 'Never mutate state directly (push, splice, sort in place) - always return a new array'
        },
        {
          label: 'Functional updater form',
          language: 'jsx',
          code: `// Use the functional form when new state depends on old state
setCount(prev => prev + 1)

// This is important in async contexts and event batching
function handleMultiClick() {
  // Without functional updater, all three read the same count
  setCount(prev => prev + 1)
  setCount(prev => prev + 1)
  setCount(prev => prev + 1)
  // count will correctly be +3
}`,
          note: 'The functional updater form guarantees you always have the latest state, avoiding stale closure bugs'
        },
        {
          label: 'Lazy initializer',
          language: 'jsx',
          code: `// Pass a function to avoid re-running expensive setup on every render
const [data, setData] = useState(() => {
  const saved = localStorage.getItem('data')
  return saved ? JSON.parse(saved) : []
})

// Without lazy init, JSON.parse runs on every render:
// const [data, setData] = useState(JSON.parse(localStorage.getItem('data') || '[]'))`,
          note: 'The lazy initializer function is called only once on mount - use it for expensive computations or localStorage reads'
        }
      ]
    },
    {
      title: 'useEffect',
      items: [
        {
          label: 'Basic effect',
          language: 'jsx',
          code: `import { useEffect } from 'react'

useEffect(() => {
  document.title = \`Count: \${count}\`
})
// Runs after every render

useEffect(() => {
  document.title = 'App loaded'
}, [])
// Runs only on mount`,
        },
        {
          label: 'Effect with cleanup',
          language: 'jsx',
          code: `useEffect(() => {
  const timer = setInterval(() => {
    setCount(c => c + 1)
  }, 1000)

  // Return cleanup function
  return () => {
    clearInterval(timer)
  }
}, [])  // mount only`,
          note: 'The cleanup function runs before the next effect and on unmount - use it to cancel timers, subscriptions, and abort controllers'
        },
        {
          label: 'Dependency array',
          language: 'jsx',
          code: `useEffect(() => {
  // Runs whenever userId changes
  fetchUserProfile(userId).then(setProfile)
}, [userId])

// Common mistake: missing deps cause stale closures
// React's ESLint plugin (eslint-plugin-react-hooks) catches this`,
          note: 'Every value from the component scope used inside the effect should be in the deps array - use the ESLint plugin to enforce this'
        },
        {
          label: 'Data fetching pattern',
          language: 'jsx',
          code: `useEffect(() => {
  let cancelled = false
  const controller = new AbortController()

  async function load() {
    setLoading(true)
    try {
      const res = await fetch(\`/api/users/\${id}\`, { signal: controller.signal })
      const data = await res.json()
      if (!cancelled) setUser(data)
    } catch (err) {
      if (!cancelled) setError(err.message)
    } finally {
      if (!cancelled) setLoading(false)
    }
  }

  load()

  return () => {
    cancelled = true
    controller.abort()
  }
}, [id])`,
          note: 'The cancelled flag and AbortController prevent state updates after unmount and cancel in-flight requests'
        },
        {
          label: 'Event listener pattern',
          language: 'jsx',
          code: `useEffect(() => {
  function handleKeyDown(e) {
    if (e.key === 'Escape') onClose()
  }

  window.addEventListener('keydown', handleKeyDown)
  return () => window.removeEventListener('keydown', handleKeyDown)
}, [onClose])`,
          note: 'Always remove event listeners in the cleanup to prevent memory leaks and duplicate handlers'
        }
      ]
    },
    {
      title: 'useRef and useContext',
      items: [
        {
          label: 'useRef for DOM access',
          language: 'jsx',
          code: `import { useRef } from 'react'

function TextInput() {
  const inputRef = useRef(null)

  function focusInput() {
    inputRef.current?.focus()
  }

  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus</button>
    </>
  )
}`,
          note: 'inputRef.current is null until after the first render - always use optional chaining (?.) when accessing it'
        },
        {
          label: 'useRef as mutable container',
          language: 'jsx',
          code: `// Refs do NOT trigger re-renders when changed
const renderCount = useRef(0)
const previousValue = useRef(null)

useEffect(() => {
  renderCount.current += 1
})

useEffect(() => {
  previousValue.current = value
}, [value])

// Store timeout id without state
const timerRef = useRef(null)
function start() { timerRef.current = setTimeout(callback, 1000) }
function stop()  { clearTimeout(timerRef.current) }`,
          note: 'useRef is perfect for values you need to read in effects or handlers without them causing re-renders'
        },
        {
          label: 'createContext and Provider',
          language: 'jsx',
          code: `import { createContext, useState } from 'react'

const ThemeContext = createContext('light')  // default value

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}`,
          note: 'The default value passed to createContext is only used when a component has no Provider above it in the tree'
        },
        {
          label: 'useContext',
          language: 'jsx',
          code: `import { useContext } from 'react'

function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext)

  return (
    <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
      Current: {theme}
    </button>
  )
}`,
          note: 'Any component that calls useContext will re-render when the context value changes'
        },
        {
          label: 'Custom context hook pattern',
          language: 'jsx',
          code: `// Wrap useContext to validate usage and improve DX
function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

// Usage
const { theme } = useTheme()`,
          note: 'The custom hook pattern gives a better error message when context is used outside its provider'
        }
      ]
    },
    {
      title: 'useMemo and useCallback',
      items: [
        {
          label: 'useMemo - memoize a computed value',
          language: 'jsx',
          code: `import { useMemo } from 'react'

const sortedItems = useMemo(() => {
  return [...items].sort((a, b) => a.name.localeCompare(b.name))
}, [items])
// sortedItems is recalculated only when items changes`,
          note: 'useMemo caches the RESULT of a function. It re-runs only when dependencies change'
        },
        {
          label: 'useCallback - memoize a function reference',
          language: 'jsx',
          code: `import { useCallback } from 'react'

const handleSubmit = useCallback((e) => {
  e.preventDefault()
  onSave(formData)
}, [onSave, formData])

// Without useCallback, a new function is created every render
// causing React.memo children to re-render unnecessarily`,
          note: 'useCallback caches the FUNCTION itself. Use it when passing callbacks to memoized children or effect deps'
        },
        {
          label: 'When NOT to use useMemo or useCallback',
          language: 'jsx',
          code: `// Do NOT memoize cheap operations - the overhead outweighs the benefit
const label = useMemo(() => user.name.toUpperCase(), [user.name])  // unnecessary

// Do NOT memoize when the component is not wrapped in React.memo
// The memoized callback still triggers a re-render if the parent re-renders

// DO memoize when:
// 1. Computation is genuinely expensive (large array transforms, heavy math)
// 2. The value is a dep in another hook (useEffect, useMemo)
// 3. The callback is passed to a React.memo child`,
          note: 'Premature memoization adds complexity without benefit - measure first, then memoize'
        },
        {
          label: 'Dependency arrays',
          language: 'jsx',
          code: `const [count, setCount] = useState(0)
const [multiplier, setMultiplier] = useState(2)

// Recalculate only when count or multiplier changes
const result = useMemo(() => count * multiplier, [count, multiplier])

// Function stable across renders unless userId changes
const loadUser = useCallback(() => {
  fetchUser(userId)
}, [userId])`,
        },
        {
          label: 'useMemo for referential stability of objects/arrays',
          language: 'jsx',
          code: `// Without useMemo: a new object is created every render
// causing useEffect to run on every render
const options = useMemo(() => ({
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }
}), [])

useEffect(() => {
  fetchData(options)
}, [options])  // stable reference - effect runs once`,
          note: 'Objects and arrays created inline always have a new reference on every render, which can cause infinite loops in effects'
        }
      ]
    },
    {
      title: 'Custom Hooks',
      items: [
        {
          label: 'Basic custom hook structure',
          language: 'jsx',
          code: `// Custom hooks must start with "use"
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  useEffect(() => {
    const handler = () => setSize({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return size
}

// Usage
const { width, height } = useWindowSize()`,
        },
        {
          label: 'useLocalStorage hook',
          language: 'jsx',
          code: `function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  function setStoredValue(newValue) {
    const valueToStore = newValue instanceof Function ? newValue(value) : newValue
    setValue(valueToStore)
    localStorage.setItem(key, JSON.stringify(valueToStore))
  }

  return [value, setStoredValue]
}`,
        },
        {
          label: 'useFetch hook',
          language: 'jsx',
          code: `function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)

    fetch(url, { signal: controller.signal })
      .then(res => res.json())
      .then(setData)
      .catch(err => { if (err.name !== 'AbortError') setError(err) })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [url])

  return { data, loading, error }
}`,
        },
        {
          label: 'useDebounce hook',
          language: 'jsx',
          code: `function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

// Usage: debounce search input before API call
const debouncedSearch = useDebounce(searchQuery, 400)
useEffect(() => { fetchResults(debouncedSearch) }, [debouncedSearch])`,
          note: 'Debouncing delays an action until after a user stops typing - prevents an API call on every keystroke'
        },
        {
          label: 'useToggle hook',
          language: 'jsx',
          code: `function useToggle(initial = false) {
  const [state, setState] = useState(initial)
  const toggle = useCallback(() => setState(s => !s), [])
  const setTrue = useCallback(() => setState(true), [])
  const setFalse = useCallback(() => setState(false), [])
  return [state, toggle, setTrue, setFalse]
}

// Usage
const [isOpen, toggle, open, close] = useToggle()`,
        }
      ]
    },
    {
      title: 'Event Handling',
      items: [
        {
          label: 'onClick and onChange',
          language: 'jsx',
          code: `function Form() {
  const [value, setValue] = useState('')

  return (
    <div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={() => console.log('submitted:', value)}>
        Submit
      </button>
    </div>
  )
}`,
        },
        {
          label: 'onSubmit with preventDefault',
          language: 'jsx',
          code: `function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e) {
    e.preventDefault()  // prevent page reload
    login({ email, password })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  )
}`,
          note: 'Always call e.preventDefault() in form onSubmit handlers to prevent the browser from reloading the page'
        },
        {
          label: 'Synthetic events and event pooling',
          language: 'jsx',
          code: `function handleChange(e) {
  // SyntheticEvent is safe to read synchronously
  const value = e.target.value

  // In older React (<17), events were pooled and nullified after the handler
  // In React 17+, event pooling was removed - e.target is always safe

  setState(value)

  // e.persist() is no longer necessary in React 17+
}`,
          note: 'React wraps native events in SyntheticEvent for cross-browser consistency. Event pooling was removed in React 17'
        },
        {
          label: 'Passing arguments to handlers',
          language: 'jsx',
          code: `// Use an arrow function to pass extra arguments
function ItemList({ items, onDelete }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          {item.name}
          <button onClick={() => onDelete(item.id)}>Delete</button>
        </li>
      ))}
    </ul>
  )
}`,
          note: 'The arrow function wrapper creates a new function each render - for long lists, extract items into a memoized component'
        },
        {
          label: 'Event delegation with data attributes',
          language: 'jsx',
          code: `// Attach one handler to the parent instead of each child
function List({ items, onSelect }) {
  function handleClick(e) {
    const id = e.target.dataset.id
    if (id) onSelect(Number(id))
  }

  return (
    <ul onClick={handleClick}>
      {items.map(item => (
        <li key={item.id} data-id={item.id}>{item.name}</li>
      ))}
    </ul>
  )
}`,
          note: 'Event delegation is a performance pattern for very large lists - React already does this internally with its event system'
        }
      ]
    },
    {
      title: 'Conditional Rendering',
      items: [
        {
          label: 'Ternary operator',
          language: 'jsx',
          code: `function Status({ isLoading, error, data }) {
  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        <DataDisplay data={data} />
      )}
    </div>
  )
}`,
        },
        {
          label: 'Logical AND short-circuit',
          language: 'jsx',
          code: `function Notification({ count }) {
  return (
    <div>
      <Bell />
      {count > 0 && <Badge count={count} />}
    </div>
  )
}`,
          note: 'Beware: if count is 0, React renders the number 0 in the DOM. Use count > 0 && ... rather than count && ...'
        },
        {
          label: 'Early return',
          language: 'jsx',
          code: `function UserProfile({ user }) {
  if (!user) return null
  if (user.banned) return <BannedMessage />

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.bio}</p>
    </div>
  )
}`,
          note: 'Early returns keep the main render path clean and avoid deeply nested ternaries'
        },
        {
          label: 'Switch pattern with lookup object',
          language: 'jsx',
          code: `const STATUS_COMPONENTS = {
  idle:    () => <p>Ready</p>,
  loading: () => <Spinner />,
  success: () => <SuccessIcon />,
  error:   () => <ErrorIcon />
}

function StatusDisplay({ status }) {
  const Component = STATUS_COMPONENTS[status]
  return Component ? <Component /> : null
}`,
          note: 'The lookup object pattern scales better than long switch statements or chained ternaries'
        },
        {
          label: 'Conditional class names',
          language: 'jsx',
          code: `// Manual template literal
<div className={\`card \${isActive ? 'card--active' : ''} \${isDisabled ? 'card--disabled' : ''}\`}>

// With clsx library (recommended)
import clsx from 'clsx'
<div className={clsx('card', { 'card--active': isActive, 'card--disabled': isDisabled })}>`,
          note: 'The clsx library (or classnames) makes conditional class names much more readable'
        }
      ]
    },
    {
      title: 'Lists and Forms',
      items: [
        {
          label: 'Rendering lists with key',
          language: 'jsx',
          code: `function ProductList({ products }) {
  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          <strong>{product.name}</strong> - \${product.price}
        </li>
      ))}
    </ul>
  )
}`,
          note: 'Always use a stable unique id as the key - never use array index as key for lists that can reorder or filter'
        },
        {
          label: 'Controlled inputs',
          language: 'jsx',
          code: `function SearchBox({ onSearch }) {
  const [query, setQuery] = useState('')

  return (
    <input
      type="text"
      value={query}
      placeholder="Search..."
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && onSearch(query)}
    />
  )
}`,
          note: 'A controlled input has its value driven by React state. The input and state are always in sync'
        },
        {
          label: 'Select, checkbox, and radio inputs',
          language: 'jsx',
          code: `// Select
<select value={selected} onChange={e => setSelected(e.target.value)}>
  <option value="">Pick one</option>
  <option value="a">Option A</option>
  <option value="b">Option B</option>
</select>

// Checkbox - uses "checked" not "value"
<input
  type="checkbox"
  checked={isChecked}
  onChange={e => setIsChecked(e.target.checked)}
/>

// Radio group
{options.map(opt => (
  <label key={opt.value}>
    <input
      type="radio"
      value={opt.value}
      checked={selected === opt.value}
      onChange={() => setSelected(opt.value)}
    />
    {opt.label}
  </label>
))}`,
        },
        {
          label: 'Form submission with validation',
          language: 'jsx',
          code: `function RegisterForm() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})

  function validate() {
    const errs = {}
    if (!form.email.includes('@')) errs.email = 'Invalid email'
    if (form.password.length < 8) errs.password = 'Min 8 characters'
    return errs
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) return setErrors(errs)
    submitForm(form)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" value={form.email}
        onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
      {errors.email && <span>{errors.email}</span>}
      <button type="submit">Register</button>
    </form>
  )
}`,
        },
        {
          label: 'Dynamic form fields',
          language: 'jsx',
          code: `function TagInput() {
  const [tags, setTags] = useState([])
  const [input, setInput] = useState('')

  function addTag() {
    const tag = input.trim()
    if (tag && !tags.includes(tag)) {
      setTags(prev => [...prev, tag])
      setInput('')
    }
  }

  function removeTag(tag) {
    setTags(prev => prev.filter(t => t !== tag))
  }

  return (
    <div>
      {tags.map(tag => (
        <span key={tag}>{tag} <button onClick={() => removeTag(tag)}>x</button></span>
      ))}
      <input value={input} onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && addTag()} />
    </div>
  )
}`,
        }
      ]
    },
    {
      title: 'Code Splitting and React Router v6',
      items: [
        {
          label: 'Lazy loading with React.lazy and Suspense',
          language: 'jsx',
          code: `import { lazy, Suspense } from 'react'

// Component is loaded only when first rendered
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Settings = lazy(() => import('./pages/Settings'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  )
}`,
          note: 'Wrap lazy-loaded routes in Suspense - the fallback renders while the chunk is downloading'
        },
        {
          label: 'Basic routing with Routes and Route',
          language: 'jsx',
          code: `import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users/:id" element={<UserDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}`,
        },
        {
          label: 'Nested routes with Outlet',
          language: 'jsx',
          code: `function App() {
  return (
    <Routes>
      <Route path="/app" element={<AppLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}

function AppLayout() {
  return (
    <div>
      <Sidebar />
      <main>
        <Outlet />  {/* child routes render here */}
      </main>
    </div>
  )
}`,
          note: 'Outlet renders the matched child route inside the parent layout - essential for shared layouts'
        },
        {
          label: 'useNavigate and useParams',
          language: 'jsx',
          code: `import { useNavigate, useParams } from 'react-router-dom'

function UserDetail() {
  const { id } = useParams()           // from route path "/users/:id"
  const navigate = useNavigate()

  function handleDelete() {
    deleteUser(id)
    navigate('/users')                  // redirect after action
    navigate(-1)                        // go back in history
    navigate('/login', { replace: true }) // replace current history entry
  }

  return <div>User {id}</div>
}`,
        },
        {
          label: 'Link and NavLink',
          language: 'jsx',
          code: `import { Link, NavLink } from 'react-router-dom'

// Link - basic navigation
<Link to="/about">About</Link>
<Link to={\`/users/\${user.id}\`}>View Profile</Link>

// NavLink - adds active class/style automatically
<NavLink
  to="/dashboard"
  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
>
  Dashboard
</NavLink>`,
          note: 'NavLink receives an object with isActive and isPending in its className and style callbacks'
        },
        {
          label: 'useSearchParams and useLocation',
          language: 'jsx',
          code: `import { useSearchParams, useLocation } from 'react-router-dom'

function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const sort = searchParams.get('sort') ?? 'name'

  function nextPage() {
    setSearchParams({ page: page + 1, sort })
  }

  return <div>Page {page}, sorted by {sort}</div>
}

function Analytics() {
  const location = useLocation()
  // location.pathname, location.search, location.state
  useEffect(() => { trackPageView(location.pathname) }, [location])
}`,
          note: 'useSearchParams works like useState but syncs with the URL query string'
        }
      ]
    }
  ]
}

export default react
