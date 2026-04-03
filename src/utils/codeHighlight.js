/**
 * Lightweight multi-language syntax highlighter.
 * Uses inline styles so no Tailwind safelist is needed.
 */

const T = {
  comment:   'color:#6b7280;font-style:italic',
  keyword:   'color:#a78bfa;font-weight:600',
  string:    'color:#4ade80',
  number:    'color:#facc15',
  constant:  'color:#fb923c',
  func:      'color:#60a5fa',
  builtin:   'color:#22d3ee',
  variable:  'color:#67e8f9',
  property:  'color:#93c5fd',
  attr:      'color:#fde047',
  tag:       'color:#f87171',
  selector:  'color:#c4b5fd',
  operator:  'color:#e2e8f0',
  punct:     'color:#94a3b8',
}

function esc(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
}

function span(style, text) {
  return `<span style="${style}">${esc(text)}</span>`
}

/** Apply patterns left-to-right, single pass. */
function applyPatterns(code, patterns) {
  const combined = new RegExp(patterns.map(p => `(${p.re.source})`).join('|'), 'gs')
  let result = ''
  let last = 0
  for (const m of code.matchAll(combined)) {
    if (m.index > last) result += esc(code.slice(last, m.index))
    let pi = -1
    for (let i = 0; i < patterns.length; i++) {
      if (m[i + 1] !== undefined) { pi = i; break }
    }
    result += pi >= 0 ? span(patterns[pi].style, m[0]) : esc(m[0])
    last = m.index + m[0].length
  }
  if (last < code.length) result += esc(code.slice(last))
  return result
}

// ─── Language patterns ─────────────────────────────────────────────────────

const LANG_PATTERNS = {
  javascript: [
    { re: /\/\*[\s\S]*?\*\//, style: T.comment },
    { re: /\/\/[^\n]*/, style: T.comment },
    { re: /`(?:[^`\\]|\\.)*`/, style: T.string },
    { re: /"(?:[^"\\]|\\.)*"/, style: T.string },
    { re: /'(?:[^'\\]|\\.)*'/, style: T.string },
    { re: /\b(const|let|var|function|return|if|else|for|while|do|class|import|export|default|from|async|await|new|this|typeof|instanceof|throw|try|catch|finally|switch|case|break|continue|of|in|delete|void|yield|extends|super|static|get|set)\b/, style: T.keyword },
    { re: /\b(true|false|null|undefined|NaN|Infinity)\b/, style: T.constant },
    { re: /\b\d+\.?\d*([eE][+-]?\d+)?\b/, style: T.number },
    { re: /\b([A-Z][a-zA-Z0-9_$]*)(?=\s*\()/, style: T.func },
    { re: /\b([a-zA-Z_$][a-zA-Z0-9_$]*)(?=\s*\()/, style: T.func },
  ],
  js: [], // alias filled below
  typescript: [], // alias
  ts: [],
  python: [
    { re: /#[^\n]*/, style: T.comment },
    { re: /"""[\s\S]*?"""|'''[\s\S]*?'''/, style: T.string },
    { re: /f"(?:[^"\\]|\\.)*"|f'(?:[^'\\]|\\.)*'/, style: T.string },
    { re: /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/, style: T.string },
    { re: /\b(def|class|import|from|return|if|elif|else|for|while|try|except|finally|with|as|lambda|yield|pass|break|continue|in|not|and|or|is|del|raise|global|nonlocal|assert|async|await)\b/, style: T.keyword },
    { re: /\b(print|len|range|type|isinstance|issubclass|list|dict|set|tuple|str|int|float|bool|bytes|complex|enumerate|zip|map|filter|sorted|reversed|sum|min|max|abs|round|any|all|open|input|repr|format|hasattr|getattr|setattr|delattr|property|staticmethod|classmethod|super)\b/, style: T.builtin },
    { re: /\b(None|True|False)\b/, style: T.constant },
    { re: /@[a-zA-Z_][a-zA-Z0-9_.]*/, style: T.keyword },
    { re: /\bself\b/, style: T.variable },
    { re: /\b\d+\.?\d*\b/, style: T.number },
  ],
  html: [
    { re: /<!--[\s\S]*?-->/, style: T.comment },
    { re: /<!DOCTYPE[^>]*>/i, style: T.keyword },
    { re: /(<\/?)([a-zA-Z][a-zA-Z0-9-]*)/, style: T.tag },  // handled specially
    { re: /\/?>/, style: T.tag },
    { re: /"[^"]*"|'[^']*'/, style: T.string },
    { re: /\b[a-z][a-z0-9-]*(?=\s*=)/, style: T.attr },
    { re: /&[a-zA-Z]+;|&#\d+;/, style: T.constant },
  ],
  css: [
    { re: /\/\*[\s\S]*?\*\//, style: T.comment },
    { re: /@[a-z-]+/, style: T.keyword },
    { re: /"[^"]*"|'[^']*'/, style: T.string },
    { re: /--[a-zA-Z][a-zA-Z0-9-]*/, style: T.variable },
    { re: /#[0-9a-fA-F]{3,8}\b/, style: T.string },
    { re: /\b(var|calc|min|max|clamp|rgb|rgba|hsl|hsla|linear-gradient|radial-gradient|url)\s*(?=\()/, style: T.builtin },
    { re: /::?[a-z-]+/, style: T.selector },
    { re: /[.#][a-zA-Z_-][a-zA-Z0-9_-]*/, style: T.selector },
    { re: /\b[a-z-]+(?=\s*:)/, style: T.property },
    { re: /-?\d+\.?\d*(%|px|em|rem|vh|vw|vmin|vmax|dvh|svh|fr|deg|rad|s|ms|ch|ex)?/, style: T.number },
  ],
  scss: [],
  bash: [
    { re: /#[^\n]*/, style: T.comment },
    { re: /"(?:[^"\\]|\\.)*"|'[^']*'/, style: T.string },
    { re: /\$[a-zA-Z_][a-zA-Z0-9_]*|\$\{[^}]+\}/, style: T.variable },
    { re: /(?<=\s|^)--?[a-zA-Z][a-zA-Z0-9-]*/, style: T.attr },
    { re: /\b(git|docker|npm|npx|yarn|pnpm|node|python|python3|pip|pip3|cd|ls|mkdir|rm|cp|mv|cat|grep|find|chmod|chown|sudo|systemctl|nginx|ssh|curl|wget|echo|export|source|set|unset|if|then|else|fi|for|while|do|done|case|esac|function|return|exit|true|false|and|or)\b/, style: T.keyword },
    { re: /\b\d+\b/, style: T.number },
  ],
  shell: [],
  sh: [],
  text: [],
  plain: [],
}

// Aliases
LANG_PATTERNS.js         = LANG_PATTERNS.javascript
LANG_PATTERNS.typescript = LANG_PATTERNS.javascript
LANG_PATTERNS.ts         = LANG_PATTERNS.javascript
LANG_PATTERNS.scss       = LANG_PATTERNS.css
LANG_PATTERNS.shell      = LANG_PATTERNS.bash
LANG_PATTERNS.sh         = LANG_PATTERNS.bash

/**
 * highlight(code, language) → HTML string with inline-styled spans.
 * Safe to use with dangerouslySetInnerHTML.
 */
export function highlight(code, language = 'text') {
  const patterns = LANG_PATTERNS[language]
  if (!patterns || patterns.length === 0) return esc(code)
  return applyPatterns(code, patterns)
}
