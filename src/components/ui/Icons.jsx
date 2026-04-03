/**
 * Central SVG icon set. All icons accept a `className` prop.
 * Default size: w-4 h-4 (16px). Override via className.
 */

// ── Status ────────────────────────────────────────────────────────────────────

export function CheckIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 4L6 11l-3-3" />
    </svg>
  )
}

export function CrossIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <path d="M12 4L4 12M4 4l8 8" />
    </svg>
  )
}

export function WarningIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2L14.5 13.5H1.5L8 2z" />
      <path d="M8 6.5v3" strokeWidth="1.8" />
      <circle cx="8" cy="11.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function DiamondIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 1.5l2 4.5h4.5l-3.5 3.5 1.5 5L8 12l-4.5 2.5 1.5-5L1.5 6H6L8 1.5z" />
    </svg>
  )
}

export function FlameIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 1c0 0-4 4-4 7.5a4 4 0 008 0c0-1.5-.8-2.8-2-3.5.3 1.2-.2 2.5-2 2.5-.8 0-1.5-.7-1.5-1.5C6.5 4 8 1 8 1z" />
    </svg>
  )
}

export function LightbulbIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2a4 4 0 014 4c0 1.8-1 3.2-2.5 4H6.5C5 10.2 4 8.8 4 6a4 4 0 014-4z" />
      <path d="M6.5 10v.5a1.5 1.5 0 003 0V10" />
    </svg>
  )
}

// ── Navigation ────────────────────────────────────────────────────────────────

export function GridIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <rect x="1.5" y="1.5" width="5" height="5" rx="1" />
      <rect x="9.5" y="1.5" width="5" height="5" rx="1" />
      <rect x="1.5" y="9.5" width="5" height="5" rx="1" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
    </svg>
  )
}

export function CodeIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 4L1 8l4 4M11 4l4 4-4 4M9 3l-2 10" />
    </svg>
  )
}

export function MapIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 3.5l4-1.5 6 2 4-1.5v10l-4 1.5-6-2-4 1.5V3.5z" />
      <path d="M5 2v10M11 4v10" />
    </svg>
  )
}

export function BookIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3a2 2 0 012-2h8a2 2 0 012 2v11l-6-2-6 2V3z" />
      <path d="M8 1v12" />
    </svg>
  )
}

export function RefreshIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13.5 8a5.5 5.5 0 11-1.6-3.9" />
      <path d="M12 1v4H8" />
    </svg>
  )
}

export function ZapIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 1L3 9h5.5L6.5 15 14 7H8.5L9.5 1z" />
    </svg>
  )
}

export function EditIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 2l3 3-8 8H3v-3l8-8z" />
      <path d="M9.5 3.5l3 3" />
    </svg>
  )
}

export function TrophyIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 1h6v5a3 3 0 01-6 0V1z" />
      <path d="M2 2h3M11 2h3M8 9v3M5 14h6" />
      <path d="M2 2c0 3 1.5 4.5 3 5M14 2c0 3-1.5 4.5-3 5" />
    </svg>
  )
}

export function AwardIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="6" r="4" />
      <path d="M5.5 9.5L4 15l4-2 4 2-1.5-5.5" />
    </svg>
  )
}

export function MessageIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 2h12a1 1 0 011 1v7a1 1 0 01-1 1H5l-3 3V3a1 1 0 011-1z" />
    </svg>
  )
}

// ── Cheatsheet topic icons ────────────────────────────────────────────────────

export function HtmlIcon({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 3l1.5 16L12 21l6.5-2L20 3H4z" />
      <path d="M8 8h8l-.5 5.5L12 15l-3.5-1.5L8 8z" />
    </svg>
  )
}

export function CssIcon({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 3l1.5 16L12 21l6.5-2L20 3H4z" />
      <path d="M16 8H8l.5 4h7l-.5 4.5L12 17l-3-0.5L8.8 14" />
    </svg>
  )
}

export function JsIcon({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M14 10v5.5a2.5 2.5 0 01-5 0" />
      <path d="M10 10v8" />
    </svg>
  )
}

export function TsIcon({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3h18v18H3z" />
      <path d="M7 8h4M9 8v8M13 12a1.5 1.5 0 1 1 3 0c0 1.5-3 1.5-3 4" />
    </svg>
  )
}

export function ReactIcon({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="2" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
    </svg>
  )
}

export function SqlIcon({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  )
}

export function TerminalIcon({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7 10l3 2-3 2M12 14h5" />
    </svg>
  )
}

export function PythonIcon({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3C7 3 7 6 7 6v3h5v1H5S2 10 2 14s3 4 3 4h2v-3s0-3 3-3h5s3 0 3-3V6s0-3-4-3z" />
      <path d="M12 21c5 0 5-3 5-3v-3h-5v-1h7s3 0 3-4-3-4-3-4h-2v3s0 3-3 3H9s-3 0-3 3v3s0 3 4 3z" />
      <circle cx="9.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="17.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function NodeIcon({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l9 5v10l-9 5-9-5V7l9-5z" />
      <path d="M12 22V12m0 0l-9-5m9 5l9-5" />
    </svg>
  )
}

export function DockerIcon({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12s-4 4-10 4S2 12 2 12s4-4 10-4 10 4 10 4z" />
      <path d="M12 8v8m-4-6v4m8-4v4" />
      <rect x="8" y="5" width="2" height="2" />
      <rect x="11" y="5" width="2" height="2" />
      <rect x="14" y="5" width="2" height="2" />
    </svg>
  )
}

export function AlgorithmIcon({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12h18M3 6h18M3 18h18" />
      <path d="M7 3v18M17 3v18" />
    </svg>
  )
}

export function ChartIcon({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 20h18M3 16l4-4 4 4 6-6 4 4" />
    </svg>
  )
}

export function DatabaseIcon({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
    </svg>
  )
}

export function SecurityIcon({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M12 8v4m0 4h.01" />
    </svg>
  )
}

export function NetworkIcon({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <circle cx="19" cy="5" r="2" />
      <circle cx="5" cy="5" r="2" />
      <circle cx="19" cy="19" r="2" />
      <circle cx="5" cy="19" r="2" />
      <path d="M12 9V5m0 10v4m7-7h-4M5 12H9" />
    </svg>
  )
}

export function PatternIcon({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" />
    </svg>
  )
}

export function TestIcon({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2l-6 16h16l-6-16z" />
      <path d="M10 10l4 4m-4 0l4-4" />
    </svg>
  )
}

export function PerformanceIcon({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  )
}

export function InterviewIcon({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  )
}

export function CloudIcon({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.5 19H6a4 4 0 01-.5-8A6 6 0 0118 13a4 4 0 01-.5 6z" />
    </svg>
  )
}

export function GitBranchIcon({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <path d="M6 9v7a3 3 0 003 3h6" />
      <path d="M18 15V9a3 3 0 00-3-3H9" />
    </svg>
  )
}

export function RegexIcon({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v18M3 12h18M5 5l14 14M19 5L5 19" />
    </svg>
  )
}

// ── Inline use helpers ────────────────────────────────────────────────────────

/** Map cheatsheet id -> icon component */
export function SheetIcon({ id, className }) {
  const map = {
    'html':                <HtmlIcon        className={className} />,
    'css':                 <CssIcon         className={className} />,
    'javascript':          <JsIcon          className={className} />,
    'typescript':          <TsIcon          className={className} />,
    'react':               <ReactIcon       className={className} />,
    'sql':                 <SqlIcon         className={className} />,
    'bash':                <TerminalIcon    className={className} />,
    'python':              <PythonIcon      className={className} />,
    'nodejs':              <NodeIcon        className={className} />,
    'docker':              <DockerIcon      className={className} />,
    'cloud':               <CloudIcon       className={className} />,
    'git':                 <GitBranchIcon   className={className} />,
    'algorithms':          <AlgorithmIcon   className={className} />,
    'big-o':               <ChartIcon       className={className} />,
    'data-structures':     <DatabaseIcon    className={className} />,
    'java':                <NodeIcon        className={className} />,
    'system-design':       <PatternIcon     className={className} />,
    'api-security':        <SecurityIcon    className={className} />,
    'rest-api':            <HtmlIcon        className={className} />,
    'cpp':                 <TsIcon          className={className} />,
    'react-hooks':         <ReactIcon       className={className} />,
    'database-design':     <SqlIcon         className={className} />,
    'network-fundamentals': <NetworkIcon     className={className} />,
    'design-patterns':     <PatternIcon     className={className} />,
    'testing':             <TestIcon        className={className} />,
    'web-performance':     <PerformanceIcon className={className} />,
    'behavioral-interview': <InterviewIcon   className={className} />,
    'regex':               <RegexIcon       className={className} />,
  }
  return map[id] ?? <BookIcon className={className} />
}

