const reactHooks = {
  id: 'react-hooks',
  title: 'React Hooks',
  color: 'cyan',
  category: 'Frontend',
  description: 'A comprehensive guide to every built-in React hook and custom hook patterns',
  sections: [
    {
      title: 'useState',
      items: [
        { label: 'Basic State', language: 'jsx', code: `const [count, setCount] = useState(0);\nsetCount(count + 1);\nsetCount(0);`, note: 'The simplest hook for managing local component state' },
        { label: 'Functional Updates', language: 'jsx', code: `setCount(prev => prev + 1);`, note: 'Use this whenever the new state depends on the previous state' },
        { label: 'Lazy Initialization', language: 'jsx', code: `const [state, setState] = useState(() => {\n  const initial = calculateExpensiveValue();\n  return initial;\n});`, note: 'The initializer function only runs once on mount' },
        { label: 'Object/Array State', language: 'jsx', code: `setForm(prev => ({ ...prev, name: 'Alice' }));\nsetList(prev => [...prev, newItem]);`, note: 'React does not merge state automatically - you must spread manually' }
      ]
    },
    {
      title: 'useEffect',
      items: [
        { label: 'Basic Effect', language: 'jsx', code: `useEffect(() => {\n  // Runs after EVERY render\n});` },
        { label: 'Dependency Array', language: 'jsx', code: `useEffect(() => {\n  // Runs on mount and when [id] changes\n}, [id]);` },
        { label: 'Mount Only', language: 'jsx', code: `useEffect(() => {\n  // Runs only ONCE on mount\n}, []);` },
        { label: 'Cleanup', language: 'jsx', code: `useEffect(() => {\n  const sub = api.subscribe();\n  return () => sub.unsubscribe();\n}, []);`, note: 'The cleanup function runs before the next effect and on unmount' }
      ]
    },
    {
      title: 'useContext',
      items: [
        { label: 'Consume Context', language: 'jsx', code: `const theme = useContext(ThemeContext);`, note: 'Avoids prop drilling by sharing data deep through the tree' },
        { label: 'Create Context', language: 'jsx', code: `const MyContext = createContext(defaultValue);` },
        { label: 'Provide Context', language: 'jsx', code: `<MyContext.Provider value={value}>\n  {children}\n</MyContext.Provider>`, note: 'Any component inside the provider can access the value' },
        { label: 'Custom Context Hook', language: 'jsx', code: `function useTheme() {\n  const ctx = useContext(ThemeContext);\n  if (!ctx) throw new Error('Outside Provider');\n  return ctx;\n}` }
      ]
    },
    {
      title: 'useReducer',
      items: [
        { label: 'Reducer Pattern', language: 'jsx', code: `function reducer(state, action) {\n  switch (action.type) {\n    case 'inc': return { count: state.count + 1 };\n    default: return state;\n  }\n}` },
        { label: 'Basic Usage', language: 'jsx', code: `const [state, dispatch] = useReducer(reducer, { count: 0 });` },
        { label: 'Dispatching Actions', language: 'jsx', code: `dispatch({ type: 'inc' });`, note: 'Clean way to manage complex state logic' },
        { label: 'Initialization', language: 'jsx', code: `const [state, dispatch] = useReducer(reducer, initialArg, init);` }
      ]
    },
    {
      title: 'useRef',
      items: [
        { label: 'DOM Access', language: 'jsx', code: `const inputRef = useRef(null);\n// ...\n<input ref={inputRef} />\ninputRef.current.focus();`, note: 'Directly interact with a DOM node' },
        { label: 'Mutable Instance Var', language: 'jsx', code: `const count = useRef(0);\ncount.current++;`, note: 'Changing .current does NOT trigger a re-render' },
        { label: 'Store Timer ID', language: 'jsx', code: `const timer = useRef();\nuseEffect(() => {\n  timer.current = setInterval(...);\n  return () => clearInterval(timer.current);\n}, []);` }
      ]
    },
    {
      title: 'Performance Hooks',
      items: [
        { label: 'useMemo', language: 'jsx', code: `const result = useMemo(() => expensive(a, b), [a, b]);`, note: 'Caches the RESULT of a computation' },
        { label: 'useCallback', language: 'jsx', code: `const handler = useCallback(() => doSomething(a), [a]);`, note: 'Caches the FUNCTION reference itself' },
        { label: 'useTransition', language: 'jsx', code: `const [isPending, startTransition] = useTransition();\nstartTransition(() => { setState(slowVal); });`, note: 'Marks a state update as non-urgent (React 18)' },
        { label: 'useDeferredValue', language: 'jsx', code: `const deferredVal = useDeferredValue(val);`, note: 'Defers updating a value to keep the UI responsive' }
      ]
    },
    {
      title: 'Advanced Hooks',
      items: [
        { label: 'useLayoutEffect', language: 'jsx', code: `useLayoutEffect(() => {\n  // measure DOM before painting\n}, []);`, note: 'Runs synchronously after DOM mutations but before browser paint' },
        { label: 'useImperativeHandle', language: 'jsx', code: `useImperativeHandle(ref, () => ({\n  focus: () => { ... }\n}));`, note: 'Customizes the instance value exposed to parents' },
        { label: 'useId', language: 'jsx', code: `const id = useId();`, note: 'Stable ID for accessibility, works with server rendering' },
        { label: 'useSyncExternalStore', language: 'jsx', code: `const state = useSyncExternalStore(subscribe, getSnapshot);`, note: 'Recommended for libraries to subscribe to external stores' }
      ]
    },
    {
      title: 'Custom Hooks',
      items: [
        { label: 'Definition', language: 'jsx', code: `function useMyHook() {\n  const [val, setVal] = useState();\n  return val;\n}`, note: 'Must always start with "use"' },
        { label: 'Rules of Hooks', language: 'text', code: `1. Only call hooks at the Top Level\n2. Only call hooks from React Functions\n3. Don't call hooks inside loops or conditions` },
        { label: 'Extracting Logic', language: 'jsx', code: `// Shared logic in one place\nfunction useWindowWidth() { ... }` }
      ]
    },
    {
      title: 'Hooks Testing',
      items: [
        { label: 'renderHook', language: 'jsx', code: `const { result } = renderHook(() => useMyHook());` },
        { label: 'act', language: 'jsx', code: `act(() => { result.current.update(); });`, note: 'Ensures all updates are processed before assertions' }
      ]
    }
  ]
}

export default reactHooks
