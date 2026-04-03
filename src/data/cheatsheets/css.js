const css = {
  id: 'css', title: 'CSS', color: 'blue',
  category: 'Frontend',
  description: 'Selectors, layout, typography, animations, and modern CSS features',
  sections: [
    {
      title: 'Selectors',
      items: [
        { label: 'Basic selectors', language: 'css', code: `/* Element */\np { color: red; }\n\n/* Class */\n.card { padding: 1rem; }\n\n/* ID */\n#header { position: sticky; }\n\n/* Universal */\n* { box-sizing: border-box; }` },
        { label: 'Attribute selectors', language: 'css', code: `[disabled] { opacity: 0.5; }\n[type="text"] { border: 1px solid #ccc; }\n[href^="https"] { color: green; }  /* starts with */\n[href$=".pdf"] { color: red; }     /* ends with */\n[class*="icon"] { display: inline-flex; } /* contains */` },
        { label: 'Pseudo-classes', language: 'css', code: `a:hover { text-decoration: underline; }\ninput:focus { outline: 2px solid blue; }\nli:first-child { font-weight: bold; }\nli:last-child { border-bottom: none; }\nli:nth-child(2n) { background: #f5f5f5; }\n:not(.disabled) { cursor: pointer; }\n:is(h1, h2, h3) { font-family: sans-serif; }` },
        { label: 'Pseudo-elements', language: 'css', code: `p::first-line { font-variant: small-caps; }\np::first-letter { font-size: 2em; float: left; }\n.card::before { content: ""; display: block; }\n.card::after  { content: attr(data-label); }\n::placeholder { color: #aaa; }\n::selection   { background: #ffeb3b; }` },
        { label: 'Combinators', language: 'css', code: `/* Descendant */\n.nav a { color: white; }\n\n/* Direct child */\nul > li { list-style: disc; }\n\n/* Adjacent sibling */\nh2 + p { margin-top: 0; }\n\n/* General sibling */\nh2 ~ p { color: #555; }` },
      ]
    },
    {
      title: 'Box Model',
      items: [
        { label: 'box-sizing', language: 'css', code: `*, *::before, *::after {\n  box-sizing: border-box;\n}\n/* border-box: width includes padding + border\n   content-box: width = content only (default) */` },
        { label: 'Margin and padding', language: 'css', code: `/* shorthand: top right bottom left */\nmargin: 10px 20px 10px 20px;\n/* shorthand: top/bottom left/right */\nmargin: 10px 20px;\n/* auto centers block elements */\nmargin: 0 auto;\n\npadding: 1rem 2rem;` },
        { label: 'Border', language: 'css', code: `border: 1px solid #e2e8f0;\nborder-top: 2px dashed red;\nborder-radius: 8px;\nborder-radius: 50%;           /* circle */\nborder-radius: 4px 8px 4px 8px; /* TL TR BR BL */` },
        { label: 'Width, height, overflow', language: 'css', code: `width: 100%;       /* relative to parent */\nmax-width: 1200px;\nmin-height: 100vh;\nheight: fit-content;\naspect-ratio: 16 / 9;\n\noverflow: hidden;\noverflow: auto;    /* scroll when needed */\noverflow-x: hidden;\ntext-overflow: ellipsis; /* requires white-space: nowrap */` },
        { label: 'Display values', language: 'css', code: `display: block;\ndisplay: inline;\ndisplay: inline-block;\ndisplay: flex;\ndisplay: grid;\ndisplay: none;\ndisplay: contents; /* element disappears, children remain */` },
      ]
    },
    {
      title: 'Flexbox',
      items: [
        { label: 'Container setup', language: 'css', code: `.flex-container {\n  display: flex;\n  flex-direction: row;     /* row | column | row-reverse | column-reverse */\n  flex-wrap: wrap;         /* nowrap | wrap | wrap-reverse */\n  gap: 1rem;               /* row-gap column-gap */\n  justify-content: center; /* main axis */\n  align-items: stretch;    /* cross axis */\n  align-content: flex-start; /* multi-line cross axis */\n}` },
        { label: 'justify-content values', language: 'css', code: `justify-content: flex-start;    /* default */\njustify-content: flex-end;\njustify-content: center;\njustify-content: space-between; /* gaps between items */\njustify-content: space-around;  /* equal space around items */\njustify-content: space-evenly;  /* equal space including edges */` },
        { label: 'align-items values', language: 'css', code: `align-items: stretch;   /* default: fill cross axis */\nalign-items: flex-start;\nalign-items: flex-end;\nalign-items: center;\nalign-items: baseline;  /* align text baselines */` },
        { label: 'Flex item properties', language: 'css', code: `.item {\n  flex-grow: 1;    /* take available space */\n  flex-shrink: 1;  /* shrink if needed (default) */\n  flex-basis: 200px; /* initial size */\n  /* shorthand */\n  flex: 1;           /* flex: 1 1 0 */\n  flex: 1 1 auto;\n  order: 2;          /* visual order */\n  align-self: center;\n}` },
        { label: 'Common flex patterns', language: 'css', code: `/* Center anything */\n.center { display: flex; place-items: center; }\n\n/* Sticky footer */\nbody { display: flex; flex-direction: column; min-height: 100vh; }\nfooter { margin-top: auto; }\n\n/* Sidebar layout */\n.layout { display: flex; }\n.sidebar { flex: 0 0 250px; }\n.main    { flex: 1; }` },
      ]
    },
    {
      title: 'Grid',
      items: [
        { label: 'Grid container', language: 'css', code: `.grid {\n  display: grid;\n  grid-template-columns: 1fr 2fr 1fr;\n  grid-template-rows: auto 1fr auto;\n  gap: 1rem 2rem; /* row-gap column-gap */\n  grid-auto-rows: minmax(100px, auto);\n}` },
        { label: 'fr unit and repeat()', language: 'css', code: `/* 3 equal columns */\ngrid-template-columns: repeat(3, 1fr);\n\n/* responsive columns */\ngrid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n\n/* named sizes */\ngrid-template-columns: 200px 1fr min-content max-content;` },
        { label: 'Placing items', language: 'css', code: `.item {\n  grid-column: 1 / 3;   /* start / end line */\n  grid-column: span 2;  /* span 2 columns */\n  grid-row: 1 / 3;\n  /* shorthand: row-start/col-start/row-end/col-end */\n  grid-area: 1 / 1 / 3 / 4;\n}` },
        { label: 'Named template areas', language: 'css', code: `.layout {\n  display: grid;\n  grid-template-areas:\n    "header header"\n    "sidebar main"\n    "footer footer";\n  grid-template-columns: 250px 1fr;\n}\nheader { grid-area: header; }\n.sidebar { grid-area: sidebar; }\nmain   { grid-area: main; }\nfooter { grid-area: footer; }` },
        { label: 'Alignment in grid', language: 'css', code: `/* container */\njustify-items: center;  /* inline axis */\nalign-items: center;    /* block axis */\nplace-items: center;    /* shorthand */\n\njustify-content: space-between;\nalign-content: start;\nplace-content: start space-between;\n\n/* item override */\n.item { justify-self: end; align-self: start; }` },
      ]
    },
    {
      title: 'Positioning',
      items: [
        { label: 'Position values', language: 'css', code: `position: static;   /* default: normal flow */\nposition: relative; /* offset from normal position */\nposition: absolute; /* relative to nearest positioned ancestor */\nposition: fixed;    /* relative to viewport, stays on scroll */\nposition: sticky;   /* relative until threshold, then fixed */` },
        { label: 'Offset properties', language: 'css', code: `.box {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  /* or shorthand via inset */\n  inset: 0;           /* all sides = 0 */\n  inset: 10px 20px;   /* top/bottom left/right */\n}` },
        { label: 'z-index stacking', language: 'css', code: `/* z-index only works on positioned elements */\n.modal-backdrop { position: fixed; z-index: 100; }\n.modal          { position: fixed; z-index: 101; }\n.tooltip        { position: absolute; z-index: 200; }\n\n/* Stacking context: new context created by:\n   transform, opacity < 1, filter, will-change */` },
        { label: 'Sticky positioning', language: 'css', code: `.sticky-header {\n  position: sticky;\n  top: 0;        /* sticks when reaching top: 0 */\n  z-index: 10;\n  background: white;\n}\n/* parent must have scrollable overflow and height */`, note: 'Parent cannot have overflow: hidden or overflow: auto' },
        { label: 'Centering with position', language: 'css', code: `/* Classic centering trick */\n.centered {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}` },
      ]
    },
    {
      title: 'Typography',
      items: [
        { label: 'Font properties', language: 'css', code: `font-family: 'Inter', system-ui, -apple-system, sans-serif;\nfont-size: 1rem;       /* relative to root */\nfont-size: clamp(1rem, 2.5vw, 2rem); /* responsive */\nfont-weight: 400;      /* 100–900 */\nfont-style: italic;\nfont-variant: small-caps;` },
        { label: 'Line and letter spacing', language: 'css', code: `line-height: 1.5;      /* unitless preferred */\nletter-spacing: 0.05em;\nword-spacing: 0.1em;\ntext-indent: 2em;` },
        { label: 'Text alignment and decoration', language: 'css', code: `text-align: left | center | right | justify;\ntext-decoration: underline;\ntext-decoration: line-through 2px red;\ntext-transform: uppercase | lowercase | capitalize;\ntext-shadow: 1px 1px 2px rgba(0,0,0,0.3);` },
        { label: 'Overflow and wrapping', language: 'css', code: `/* Single-line ellipsis */\n.truncate {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n/* Multi-line clamp */\n.clamp {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}` },
        { label: 'Web fonts', language: 'css', code: `@font-face {\n  font-family: 'MyFont';\n  src: url('font.woff2') format('woff2');\n  font-weight: 400;\n  font-display: swap; /* prevents FOIT */\n}\n\n/* Google Fonts in HTML */\n/* <link rel="preconnect" href="https://fonts.googleapis.com"> */` },
      ]
    },
    {
      title: 'Colors & Backgrounds',
      items: [
        { label: 'Color values', language: 'css', code: `color: #1a1a2e;                /* hex */\ncolor: rgb(26, 26, 46);         /* rgb */\ncolor: rgba(26, 26, 46, 0.8);  /* rgba */\ncolor: hsl(240 100% 14%);       /* hsl */\ncolor: oklch(20% 0.1 270);      /* oklch (wide gamut) */\ncolor: currentColor;            /* inherits current color */` },
        { label: 'Background', language: 'css', code: `background-color: #f0f4f8;\nbackground-image: url('bg.jpg');\nbackground-size: cover;   /* contain | cover | 100% */\nbackground-position: center;\nbackground-repeat: no-repeat;\nbackground-attachment: fixed; /* parallax effect */` },
        { label: 'Gradients', language: 'css', code: `background: linear-gradient(to right, #667eea, #764ba2);\nbackground: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);\nbackground: radial-gradient(circle at center, #fff, #000);\nbackground: conic-gradient(red, yellow, green, blue, red);` },
        { label: 'Multiple backgrounds', language: 'css', code: `background:\n  url('overlay.png') no-repeat center,\n  linear-gradient(to bottom, #fff, #eee);\n\n/* background-clip */\n.text-gradient {\n  background: linear-gradient(90deg, #f00, #00f);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n}` },
        { label: 'Box shadow', language: 'css', code: `box-shadow: 0 2px 4px rgba(0,0,0,0.1);\nbox-shadow: 0 4px 6px -1px rgba(0,0,0,0.1),\n            0 2px 4px -1px rgba(0,0,0,0.06);\nbox-shadow: inset 0 2px 4px rgba(0,0,0,0.2);\nbox-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5); /* focus ring */` },
      ]
    },
    {
      title: 'Transitions & Animations',
      items: [
        { label: 'transition', language: 'css', code: `/* property duration timing-function delay */\ntransition: color 200ms ease;\ntransition: all 300ms ease-in-out;\ntransition:\n  background-color 200ms ease,\n  transform 300ms cubic-bezier(0.4, 0, 0.2, 1);`, note: 'Avoid transitioning all — use specific properties for performance' },
        { label: 'Timing functions', language: 'css', code: `transition-timing-function: linear;\ntransition-timing-function: ease;         /* default */\ntransition-timing-function: ease-in;\ntransition-timing-function: ease-out;\ntransition-timing-function: ease-in-out;\ntransition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); /* material */\ntransition-timing-function: steps(5, end); /* stepwise */` },
        { label: '@keyframes', language: 'css', code: `@keyframes fadeIn {\n  from { opacity: 0; transform: translateY(-10px); }\n  to   { opacity: 1; transform: translateY(0); }\n}\n\n@keyframes spin {\n  0%   { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }\n}` },
        { label: 'animation', language: 'css', code: `/* name duration timing iteration delay direction fill-mode */\nanimation: fadeIn 300ms ease forwards;\nanimation: spin 1s linear infinite;\n\n/* separate properties */\nanimation-name: fadeIn;\nanimation-duration: 300ms;\nanimation-fill-mode: forwards; /* keeps final state */\nanimation-play-state: paused;` },
        { label: 'transform', language: 'css', code: `transform: translateX(20px) translateY(-10px);\ntransform: translate(-50%, -50%);  /* centering trick */\ntransform: scale(1.05);\ntransform: rotate(45deg);\ntransform: skewX(10deg);\ntransform: matrix(1, 0, 0, 1, 0, 0);\n\n/* 3D */\ntransform: perspective(500px) rotateY(30deg);\ntransform-origin: top left;` },
      ]
    },
    {
      title: 'Media Queries',
      items: [
        { label: 'Breakpoints (mobile-first)', language: 'css', code: `/* Mobile first: base styles for small screens */\n.container { padding: 1rem; }\n\n/* Tablet */\n@media (min-width: 768px) {\n  .container { padding: 2rem; }\n}\n\n/* Desktop */\n@media (min-width: 1024px) {\n  .container { max-width: 1200px; margin: 0 auto; }\n}` },
        { label: 'Common breakpoints', language: 'css', code: `/* sm  */ @media (min-width: 640px)  { }\n/* md  */ @media (min-width: 768px)  { }\n/* lg  */ @media (min-width: 1024px) { }\n/* xl  */ @media (min-width: 1280px) { }\n/* 2xl */ @media (min-width: 1536px) { }\n\n/* max-width (desktop-first) */\n@media (max-width: 767px) { /* mobile */ }` },
        { label: 'Preference queries', language: 'css', code: `@media (prefers-color-scheme: dark) {\n  :root { --bg: #0f0f0f; --text: #fff; }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  *, *::before, *::after {\n    animation-duration: 0.01ms !important;\n    transition-duration: 0.01ms !important;\n  }\n}` },
        { label: 'Other media features', language: 'css', code: `@media print { .no-print { display: none; } }\n@media (orientation: landscape) { }\n@media (hover: hover) { /* has real hover */ }\n@media (pointer: coarse) { /* touch device */ }\n@media screen and (min-width: 768px) { }` },
      ]
    },
    {
      title: 'CSS Variables',
      items: [
        { label: 'Defining variables', language: 'css', code: `:root {\n  --color-primary: #3b82f6;\n  --color-text: #1f2937;\n  --spacing-sm: 0.5rem;\n  --spacing-md: 1rem;\n  --spacing-lg: 2rem;\n  --font-size-base: 16px;\n  --border-radius: 8px;\n}` },
        { label: 'Using variables', language: 'css', code: `.button {\n  background: var(--color-primary);\n  padding: var(--spacing-sm) var(--spacing-md);\n  border-radius: var(--border-radius);\n  font-size: var(--font-size-base);\n}\n\n/* With fallback */\ncolor: var(--color-accent, #ff6b6b);` },
        { label: 'calc() with variables', language: 'css', code: `:root { --nav-height: 64px; }\n\n.page {\n  min-height: calc(100vh - var(--nav-height));\n  margin-top: calc(var(--nav-height) + 1rem);\n}\n\n.grid-gap {\n  gap: calc(var(--spacing-md) * 2);\n}` },
        { label: 'Scoped variables', language: 'css', code: `/* Component-scoped override */\n.card {\n  --border-radius: 12px;\n  border-radius: var(--border-radius);\n}\n\n/* Dynamic via JavaScript */\n/* el.style.setProperty('--color-primary', '#ff0000') */` },
        { label: 'Theme switching', language: 'css', code: `:root {\n  --bg: #ffffff;\n  --text: #111111;\n}\n\n[data-theme="dark"] {\n  --bg: #0f0f0f;\n  --text: #f0f0f0;\n}\n\nbody {\n  background: var(--bg);\n  color: var(--text);\n}` },
      ]
    },
  ]
}

export default css
