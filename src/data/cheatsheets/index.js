const html = {
  id: 'html', title: 'HTML', icon: '🌐', color: 'orange',
  description: 'Core HTML syntax, semantic elements, forms, and meta tags',
  sections: [
    {
      title: 'Document Structure',
      items: [
        { label: 'Basic template', language: 'html', code: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Page Title</title>\n</head>\n<body>\n  <!-- content -->\n</body>\n</html>`, note: 'lang attribute helps screen readers and SEO' },
        { label: 'charset meta', language: 'html', code: `<meta charset="UTF-8">`, note: 'Must be first element in <head>' },
        { label: 'viewport meta', language: 'html', code: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`, note: 'Required for mobile-responsive layouts' },
        { label: 'title and base', language: 'html', code: `<title>My Page</title>\n<base href="https://example.com/" target="_blank">` },
        { label: 'script and style placement', language: 'html', code: `<!-- styles in <head> -->\n<link rel="stylesheet" href="style.css">\n\n<!-- scripts before </body> or with defer -->\n<script src="app.js" defer></script>`, note: 'defer executes after HTML is parsed' },
      ]
    },
    {
      title: 'Text Elements',
      items: [
        { label: 'Headings', language: 'html', code: `<h1>Main Title</h1>\n<h2>Section</h2>\n<h3>Sub-section</h3>\n<h4>Detail</h4>\n<h5>Minor</h5>\n<h6>Smallest</h6>`, note: 'Only one h1 per page for SEO' },
        { label: 'Paragraph and inline', language: 'html', code: `<p>Regular paragraph text.</p>\n<p>Text with <strong>bold</strong> and <em>italic</em> and <code>inline code</code>.</p>\n<p><mark>highlighted</mark> | <del>deleted</del> | <ins>inserted</ins></p>` },
        { label: 'Preformatted and code', language: 'html', code: `<pre><code class="language-js">\nconst x = 42;\n</code></pre>` },
        { label: 'Quotations', language: 'html', code: `<blockquote cite="https://source.com">\n  <p>Quote text here.</p>\n</blockquote>\n<p>He said <q>hello</q> to the crowd.</p>` },
        { label: 'Miscellaneous inline', language: 'html', code: `<abbr title="HyperText Markup Language">HTML</abbr>\n<time datetime="2024-01-15">January 15, 2024</time>\n<kbd>Ctrl</kbd> + <kbd>C</kbd>\n<var>x</var> = <var>y</var> + 2\n<br> <!-- line break -->\n<hr> <!-- thematic break -->` },
      ]
    },
    {
      title: 'Links & Images',
      items: [
        { label: 'Anchor link', language: 'html', code: `<a href="https://example.com">External link</a>\n<a href="/about">Internal link</a>\n<a href="#section-id">Jump to section</a>\n<a href="mailto:email@example.com">Email link</a>\n<a href="tel:+1234567890">Phone link</a>` },
        { label: 'Link targets and rel', language: 'html', code: `<a href="https://example.com" target="_blank" rel="noopener noreferrer">\n  Opens in new tab\n</a>`, note: 'noopener noreferrer prevents security vulnerability' },
        { label: 'Image', language: 'html', code: `<img src="photo.jpg" alt="A scenic mountain view" width="800" height="600" loading="lazy">`, note: 'alt is required for accessibility; loading="lazy" defers offscreen images' },
        { label: 'Responsive image', language: 'html', code: `<img\n  src="image-800.jpg"\n  srcset="image-400.jpg 400w, image-800.jpg 800w, image-1200.jpg 1200w"\n  sizes="(max-width: 600px) 400px, (max-width: 900px) 800px, 1200px"\n  alt="Description">` },
        { label: 'Figure with caption', language: 'html', code: `<figure>\n  <img src="chart.png" alt="Bar chart showing Q4 revenue">\n  <figcaption>Fig 1: Q4 2024 Revenue by Region</figcaption>\n</figure>` },
      ]
    },
    {
      title: 'Lists',
      items: [
        { label: 'Unordered list', language: 'html', code: `<ul>\n  <li>Apples</li>\n  <li>Bananas</li>\n  <li>Cherries</li>\n</ul>` },
        { label: 'Ordered list', language: 'html', code: `<ol type="1" start="1">\n  <li>First step</li>\n  <li>Second step</li>\n  <li>Third step</li>\n</ol>`, note: 'type can be "1", "a", "A", "i", "I"' },
        { label: 'Description list', language: 'html', code: `<dl>\n  <dt>HTML</dt>\n  <dd>HyperText Markup Language — structure of web pages</dd>\n  <dt>CSS</dt>\n  <dd>Cascading Style Sheets — visual presentation</dd>\n</dl>` },
        { label: 'Nested list', language: 'html', code: `<ul>\n  <li>Frontend\n    <ul>\n      <li>HTML</li>\n      <li>CSS</li>\n      <li>JavaScript</li>\n    </ul>\n  </li>\n  <li>Backend</li>\n</ul>` },
      ]
    },
    {
      title: 'Tables',
      items: [
        { label: 'Basic table', language: 'html', code: `<table>\n  <thead>\n    <tr>\n      <th scope="col">Name</th>\n      <th scope="col">Age</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>Alice</td>\n      <td>30</td>\n    </tr>\n  </tbody>\n  <tfoot>\n    <tr><td colspan="2">Total: 1</td></tr>\n  </tfoot>\n</table>` },
        { label: 'colspan and rowspan', language: 'html', code: `<tr>\n  <td colspan="2">Spans 2 columns</td>\n</tr>\n<tr>\n  <td rowspan="3">Spans 3 rows</td>\n  <td>Row 1</td>\n</tr>` },
        { label: 'scope attribute', language: 'html', code: `<th scope="col">Column header</th>\n<th scope="row">Row header</th>\n<th scope="colgroup" colspan="2">Group header</th>`, note: 'scope improves screen reader navigation' },
        { label: 'caption', language: 'html', code: `<table>\n  <caption>Monthly Sales Report</caption>\n  <!-- ... -->\n</table>`, note: 'caption should be the first child of table' },
      ]
    },
    {
      title: 'Forms & Inputs',
      items: [
        { label: 'Basic form', language: 'html', code: `<form action="/submit" method="POST" novalidate>\n  <label for="email">Email</label>\n  <input type="email" id="email" name="email" required placeholder="you@example.com">\n  <button type="submit">Submit</button>\n</form>` },
        { label: 'Input types', language: 'html', code: `<input type="text">\n<input type="email">\n<input type="password">\n<input type="number" min="0" max="100" step="1">\n<input type="date">\n<input type="checkbox" checked>\n<input type="radio" name="group" value="a">\n<input type="file" accept=".jpg,.png">\n<input type="range" min="0" max="100">\n<input type="hidden" value="token123">` },
        { label: 'Textarea and select', language: 'html', code: `<textarea name="bio" rows="4" cols="50" maxlength="500"></textarea>\n\n<select name="country">\n  <optgroup label="Europe">\n    <option value="gb">United Kingdom</option>\n    <option value="de">Germany</option>\n  </optgroup>\n  <option value="us" selected>United States</option>\n</select>` },
        { label: 'Fieldset and legend', language: 'html', code: `<fieldset>\n  <legend>Shipping address</legend>\n  <label for="street">Street</label>\n  <input type="text" id="street" name="street">\n  <label for="city">City</label>\n  <input type="text" id="city" name="city">\n</fieldset>` },
        { label: 'Datalist and output', language: 'html', code: `<input list="browsers" name="browser">\n<datalist id="browsers">\n  <option value="Chrome">\n  <option value="Firefox">\n  <option value="Safari">\n</datalist>\n\n<output name="result" for="a b">60</output>` },
      ]
    },
    {
      title: 'Semantic Elements',
      items: [
        { label: 'Page structure', language: 'html', code: `<header><!-- logo, nav --></header>\n<nav><!-- navigation links --></nav>\n<main>\n  <article><!-- self-contained content --></article>\n  <aside><!-- sidebar --></aside>\n</main>\n<footer><!-- copyright, links --></footer>` },
        { label: 'Article vs Section', language: 'html', code: `<!-- article: self-contained, reusable -->\n<article>\n  <h2>Blog Post Title</h2>\n  <p>Content...</p>\n</article>\n\n<!-- section: thematic grouping -->\n<section aria-labelledby="features-heading">\n  <h2 id="features-heading">Features</h2>\n</section>`, note: 'article can stand alone; section groups related content' },
        { label: 'Aside', language: 'html', code: `<aside>\n  <h3>Related Articles</h3>\n  <ul>...</ul>\n</aside>`, note: 'Tangentially related to surrounding content' },
        { label: 'Time and address', language: 'html', code: `<time datetime="2024-06-15T09:00">June 15 at 9am</time>\n<time datetime="P7D">7 days</time>\n\n<address>\n  <a href="mailto:hi@example.com">hi@example.com</a>\n</address>` },
      ]
    },
    {
      title: 'Meta & Head Tags',
      items: [
        { label: 'SEO meta tags', language: 'html', code: `<meta name="description" content="Page description under 160 chars">\n<meta name="keywords" content="html, css, javascript">\n<meta name="author" content="Your Name">\n<meta name="robots" content="index, follow">` },
        { label: 'Open Graph', language: 'html', code: `<meta property="og:title" content="Page Title">\n<meta property="og:description" content="Description">\n<meta property="og:image" content="https://example.com/og.jpg">\n<meta property="og:url" content="https://example.com/page">\n<meta property="og:type" content="website">`, note: 'Used by Facebook, LinkedIn, Slack link previews' },
        { label: 'Twitter/X Card', language: 'html', code: `<meta name="twitter:card" content="summary_large_image">\n<meta name="twitter:title" content="Page Title">\n<meta name="twitter:description" content="Description">\n<meta name="twitter:image" content="https://example.com/card.jpg">` },
        { label: 'Favicon and icons', language: 'html', code: `<link rel="icon" type="image/png" href="/favicon.png">\n<link rel="apple-touch-icon" href="/apple-touch-icon.png">\n<link rel="manifest" href="/site.webmanifest">` },
        { label: 'Canonical and hreflang', language: 'html', code: `<link rel="canonical" href="https://example.com/page">\n<link rel="alternate" hreflang="fr" href="https://example.com/fr/page">`, note: 'canonical prevents duplicate content SEO penalty' },
      ]
    },
  ]
}

const css = {
  id: 'css', title: 'CSS', icon: '🎨', color: 'blue',
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

const javascript = {
  id: 'javascript', title: 'JavaScript', icon: '⚡', color: 'yellow',
  description: 'Modern JS syntax: ES6+, async patterns, functional methods',
  sections: [
    {
      title: 'Variables & Types',
      items: [
        { label: 'Variable declarations', language: 'javascript', code: `const pi = 3.14;        // immutable binding\nlet count = 0;          // reassignable\nvar legacy = 'avoid';   // function-scoped, hoisted\n\n// const with objects/arrays — binding is immutable, not value\nconst arr = [1, 2, 3];\narr.push(4);            // OK\narr = [];               // TypeError` },
        { label: 'Data types', language: 'javascript', code: `typeof 42            // "number"\ntypeof "hello"       // "string"\ntypeof true          // "boolean"\ntypeof undefined     // "undefined"\ntypeof null          // "object" (historical bug!)\ntypeof {}            // "object"\ntypeof []            // "object"\ntypeof function(){}  // "function"\ntypeof Symbol()      // "symbol"\ntypeof 9007199254740991n // "bigint"` },
        { label: 'Type checking', language: 'javascript', code: `Array.isArray([1,2])    // true\ninstanceof check:\nconsole.log([] instanceof Array)  // true\n\n// Safe null check\nconst len = str?.length ?? 0;\n\n// Explicit conversion\nNumber("42")    // 42\nString(42)      // "42"\nBoolean(0)      // false\nBoolean("")     // false\nBoolean([])     // true  ← gotcha!` },
        { label: 'Nullish and optional chaining', language: 'javascript', code: `const user = null;\n\n// Optional chaining\nuser?.profile?.avatar   // undefined (no error)\nuser?.getName?.()       // undefined (no error)\narr?.[0]                // undefined (no error)\n\n// Nullish coalescing (only null/undefined, not 0/"")\nconst name = user?.name ?? 'Anonymous';\n\n// Nullish assignment\nuser.settings ??= {};   // assigns only if null/undefined` },
        { label: 'Template literals', language: 'javascript', code: `const name = 'World';\nconst greeting = \`Hello \${name}!\`;\n\n// Multi-line\nconst html = \`\n  <div class="card">\n    <h2>\${title}</h2>\n  </div>\n\`;\n\n// Tagged template literal\ncss\`color: \${theme.primary};\`` },
      ]
    },
    {
      title: 'Functions',
      items: [
        { label: 'Declaration vs expression', language: 'javascript', code: `// Declaration — hoisted\nfunction greet(name) {\n  return \`Hello \${name}\`;\n}\n\n// Expression — not hoisted\nconst greet = function(name) {\n  return \`Hello \${name}\`;\n};\n\n// Arrow function\nconst greet = (name) => \`Hello \${name}\`;` },
        { label: 'Arrow functions', language: 'javascript', code: `// Implicit return (single expression)\nconst double = x => x * 2;\nconst add = (a, b) => a + b;\n\n// Object literal: wrap in parens\nconst toObj = x => ({ value: x });\n\n// Multi-statement\nconst process = (x) => {\n  const result = x * 2;\n  return result + 1;\n};`, note: 'Arrow functions inherit this from enclosing scope' },
        { label: 'Default parameters', language: 'javascript', code: `function createUser(name, role = 'user', active = true) {\n  return { name, role, active };\n}\n\ncreateUser('Alice');             // role='user', active=true\ncreateUser('Bob', 'admin');      // active=true\ncreateUser('Eve', 'mod', false); // all custom\n\n// Works with destructuring\nfunction init({ host = 'localhost', port = 3000 } = {}) {}` },
        { label: 'Rest and spread', language: 'javascript', code: `// Rest: collects remaining args into array\nfunction sum(...nums) {\n  return nums.reduce((a, b) => a + b, 0);\n}\nsum(1, 2, 3, 4);  // 10\n\n// Must be last parameter\nfunction log(level, ...messages) {}\n\n// Spread: expands array/object\nconst merged = [...arr1, ...arr2];\nconst config = { ...defaults, ...overrides };` },
        { label: 'Closures', language: 'javascript', code: `function counter(start = 0) {\n  let count = start;\n  return {\n    increment: () => ++count,\n    decrement: () => --count,\n    value: () => count,\n  };\n}\n\nconst c = counter(10);\nc.increment(); // 11\nc.increment(); // 12\nc.value();     // 12`, note: 'Inner function remembers variables from outer scope after outer function returns' },
      ]
    },
    {
      title: 'Arrays',
      items: [
        { label: 'Creation and access', language: 'javascript', code: `const arr = [1, 2, 3];\narr[0];            // 1 (first)\narr.at(-1);        // 3 (last, ES2022)\narr.length;        // 3\n\n// Array.from\nArray.from('abc');          // ['a','b','c']\nArray.from({length:3}, (_,i) => i+1); // [1,2,3]\n\n// Spread\nconst copy = [...arr];` },
        { label: 'Mutation methods', language: 'javascript', code: `const a = [1, 2, 3];\na.push(4);           // add to end → [1,2,3,4]\na.pop();             // remove from end → 4\na.unshift(0);        // add to start → [0,1,2,3]\na.shift();           // remove from start → 0\na.splice(1, 1);      // remove 1 at index 1\na.splice(1, 0, 99);  // insert 99 at index 1\na.reverse();         // in-place reverse\na.sort((a,b) => a-b); // in-place numeric sort` },
        { label: 'Non-mutating methods', language: 'javascript', code: `const a = [1, 2, 3, 4, 5];\na.slice(1, 3);      // [2, 3] — start(incl), end(excl)\na.concat([6, 7]);   // [1,2,3,4,5,6,7]\na.indexOf(3);       // 2\na.lastIndexOf(3);   // 2\na.includes(3);      // true\na.join(', ');       // "1, 2, 3, 4, 5"\na.flat(2);          // flatten up to depth 2\na.toReversed();     // non-mutating reverse (ES2023)\na.toSorted((a,b)=>a-b); // non-mutating sort` },
        { label: 'Searching and testing', language: 'javascript', code: `const users = [{id:1,name:'Alice'},{id:2,name:'Bob'}];\n\nusers.find(u => u.id === 2);      // {id:2,name:'Bob'}\nusers.findIndex(u => u.id === 2); // 1\nusers.some(u => u.name === 'Bob'); // true\nusers.every(u => u.id > 0);        // true` },
      ]
    },
    {
      title: 'Objects',
      items: [
        { label: 'Object syntax', language: 'javascript', code: `const name = 'Alice';\nconst age = 30;\n\n// Property shorthand\nconst user = { name, age };\n\n// Computed property names\nconst key = 'dynamic';\nconst obj = { [key]: 'value', [\`\${key}2\`]: 'other' };\n\n// Method shorthand\nconst calc = {\n  add(a, b) { return a + b; },\n  sub(a, b) { return a - b; },\n};` },
        { label: 'Object methods', language: 'javascript', code: `const obj = { a: 1, b: 2, c: 3 };\n\nObject.keys(obj);    // ['a','b','c']\nObject.values(obj);  // [1, 2, 3]\nObject.entries(obj); // [['a',1],['b',2],['c',3]]\n\nObject.assign({}, obj, { d: 4 });  // shallow merge\nObject.freeze(obj);  // immutable\nObject.keys(obj).length; // property count\nObject.fromEntries([['a',1],['b',2]]); // {a:1,b:2}` },
        { label: 'Spread and merge', language: 'javascript', code: `const defaults = { color: 'blue', size: 'md' };\nconst custom   = { size: 'lg', weight: 'bold' };\n\n// Later keys win\nconst merged = { ...defaults, ...custom };\n// { color: 'blue', size: 'lg', weight: 'bold' }\n\n// Deep clone (JSON-safe values only)\nconst deep = JSON.parse(JSON.stringify(obj));\n\n// structuredClone (modern)\nconst clone = structuredClone(obj);` },
        { label: 'Optional chaining & nullish', language: 'javascript', code: `const config = {\n  server: { port: 3000 }\n};\n\n// Optional chaining\nconfig.server?.port           // 3000\nconfig.db?.host               // undefined (no error)\nconfig.getTimeout?.()         // undefined (no error)\n\n// Nullish assignment\nconfig.timeout ??= 5000;      // sets if null/undefined\nconfig.retries ||= 3;         // sets if falsy` },
        { label: 'Getters and setters', language: 'javascript', code: `const person = {\n  firstName: 'John',\n  lastName: 'Doe',\n  get fullName() {\n    return \`\${this.firstName} \${this.lastName}\`;\n  },\n  set fullName(val) {\n    [this.firstName, this.lastName] = val.split(' ');\n  },\n};\n\nperson.fullName;          // 'John Doe'\nperson.fullName = 'Jane Smith';\nperson.firstName;         // 'Jane'` },
      ]
    },
    {
      title: 'Destructuring & Spread',
      items: [
        { label: 'Array destructuring', language: 'javascript', code: `const [a, b, c] = [1, 2, 3];\n\n// Skip elements\nconst [first, , third] = [1, 2, 3];\n\n// Default values\nconst [x = 10, y = 20] = [5];\n// x=5, y=20\n\n// Rest\nconst [head, ...tail] = [1, 2, 3, 4];\n// head=1, tail=[2,3,4]\n\n// Swap\nlet p = 1, q = 2;\n[p, q] = [q, p];` },
        { label: 'Object destructuring', language: 'javascript', code: `const { name, age } = user;\n\n// Rename\nconst { name: userName, age: userAge } = user;\n\n// Default values\nconst { role = 'user', active = true } = user;\n\n// Nested\nconst { address: { city, zip } } = user;\n\n// Rest\nconst { id, ...rest } = user;` },
        { label: 'Function parameter destructuring', language: 'javascript', code: `// Object params\nfunction render({ title, body, footer = '' }) {\n  return \`<h1>\${title}</h1><p>\${body}</p>\`;\n}\n\n// Array params\nfunction first([head]) { return head; }\n\n// With defaults\nfunction connect({ host = 'localhost', port = 5432 } = {}) {\n  return \`\${host}:\${port}\`;\n}` },
        { label: 'Spread operator', language: 'javascript', code: `// Arrays\nconst combined = [...arr1, 'middle', ...arr2];\nMath.max(...numbers);\nconst copy = [...original];\n\n// Objects\nconst updated = { ...user, role: 'admin' };\nconst cloned  = { ...obj };\n\n// Pass array as individual args\nconst nums = [1, 2, 3];\nconsole.log(...nums); // 1 2 3` },
      ]
    },
    {
      title: 'Classes',
      items: [
        { label: 'Class basics', language: 'javascript', code: `class Animal {\n  #name; // private field (ES2022)\n  static count = 0;\n\n  constructor(name, sound) {\n    this.#name = name;\n    this.sound = sound;\n    Animal.count++;\n  }\n\n  speak() {\n    return \`\${this.#name} says \${this.sound}\`;\n  }\n\n  get name() { return this.#name; }\n}` },
        { label: 'Inheritance', language: 'javascript', code: `class Dog extends Animal {\n  constructor(name) {\n    super(name, 'woof'); // call parent constructor\n    this.tricks = [];\n  }\n\n  learn(trick) {\n    this.tricks.push(trick);\n    return this;\n  }\n\n  // Override parent method\n  speak() {\n    return \`\${super.speak()}! Also knows: \${this.tricks.join(', ')}\`;\n  }\n}` },
        { label: 'Static methods and fields', language: 'javascript', code: `class MathUtils {\n  static PI = 3.14159;\n\n  static circleArea(r) {\n    return MathUtils.PI * r * r;\n  }\n\n  static #privateHelper(x) {\n    return x * 2;\n  }\n\n  // Factory method pattern\n  static create(config) {\n    return new MathUtils(config);\n  }\n}\n\nMathUtils.circleArea(5); // 78.54` },
      ]
    },
    {
      title: 'Promises',
      items: [
        { label: 'Creating a Promise', language: 'javascript', code: `const delay = (ms) => new Promise((resolve, reject) => {\n  if (ms < 0) reject(new Error('Negative delay'));\n  setTimeout(resolve, ms);\n});\n\n// Already resolved/rejected\nPromise.resolve(42);\nPromise.reject(new Error('fail'));` },
        { label: '.then / .catch / .finally', language: 'javascript', code: `fetch('/api/users')\n  .then(res => res.json())\n  .then(data => console.log(data))\n  .catch(err => console.error(err))\n  .finally(() => setLoading(false));\n\n// Chaining\ngetUser(id)\n  .then(user => getProfile(user.id))\n  .then(profile => renderProfile(profile));` },
        { label: 'Promise combinators', language: 'javascript', code: `// All must succeed\nconst [users, posts] = await Promise.all([fetchUsers(), fetchPosts()]);\n\n// First to resolve\nconst fastest = await Promise.race([p1, p2, p3]);\n\n// All settle (never throws)\nconst results = await Promise.allSettled([p1, p2, p3]);\nresults.forEach(r => {\n  if (r.status === 'fulfilled') console.log(r.value);\n  if (r.status === 'rejected')  console.log(r.reason);\n});\n\n// First to fulfill\nconst first = await Promise.any([p1, p2, p3]);` },
        { label: 'Promise patterns', language: 'javascript', code: `// Retry pattern\nasync function retry(fn, times = 3) {\n  for (let i = 0; i < times; i++) {\n    try { return await fn(); }\n    catch (err) { if (i === times - 1) throw err; }\n  }\n}\n\n// Timeout wrapper\nconst withTimeout = (promise, ms) =>\n  Promise.race([promise, new Promise((_, rej) =>\n    setTimeout(() => rej(new Error('Timeout')), ms))]);` },
      ]
    },
    {
      title: 'Async / Await',
      items: [
        { label: 'Basic async/await', language: 'javascript', code: `async function fetchUser(id) {\n  const res  = await fetch(\`/api/users/\${id}\`);\n  if (!res.ok) throw new Error(\`HTTP \${res.status}\`);\n  const data = await res.json();\n  return data;\n}\n\n// Arrow function\nconst fetchUser = async (id) => {\n  const res = await fetch(\`/api/users/\${id}\`);\n  return res.json();\n};` },
        { label: 'Error handling', language: 'javascript', code: `async function loadData() {\n  try {\n    const data = await fetch('/api/data').then(r => r.json());\n    return data;\n  } catch (err) {\n    if (err instanceof TypeError) {\n      console.error('Network error:', err.message);\n    } else {\n      throw err; // re-throw unexpected errors\n    }\n  } finally {\n    setLoading(false); // always runs\n  }\n}` },
        { label: 'Parallel execution', language: 'javascript', code: `// Sequential (slow — each waits for previous)\nconst a = await fetchA();\nconst b = await fetchB();\n\n// Parallel (fast — both start simultaneously)\nconst [a, b] = await Promise.all([fetchA(), fetchB()]);\n\n// Start both, await separately\nconst pA = fetchA();\nconst pB = fetchB();\nconst a = await pA;\nconst b = await pB;`, note: 'Common mistake: sequential awaits that could be parallel' },
        { label: 'Async iteration', language: 'javascript', code: `// Async generator\nasync function* paginate(url) {\n  let cursor = null;\n  do {\n    const res = await fetch(url + (cursor ? \`?cursor=\${cursor}\` : ''));\n    const { data, next } = await res.json();\n    yield data;\n    cursor = next;\n  } while (cursor);\n}\n\n// Consuming\nfor await (const page of paginate('/api/items')) {\n  console.log(page);\n}` },
      ]
    },
    {
      title: 'Array Methods',
      items: [
        { label: 'map, filter, reduce', language: 'javascript', code: `const nums = [1, 2, 3, 4, 5];\n\n// map: transform each element\nnums.map(x => x * 2);          // [2,4,6,8,10]\n\n// filter: keep matching elements\nnums.filter(x => x % 2 === 0); // [2,4]\n\n// reduce: accumulate to single value\nnums.reduce((sum, x) => sum + x, 0); // 15\n\n// Chaining\nconst result = nums\n  .filter(x => x > 2)\n  .map(x => x ** 2)\n  .reduce((a, b) => a + b, 0); // 50` },
        { label: 'find, findIndex, some, every', language: 'javascript', code: `const users = [\n  { id: 1, name: 'Alice', admin: false },\n  { id: 2, name: 'Bob',   admin: true  },\n];\n\nusers.find(u => u.id === 2);       // {id:2,...}\nusers.findIndex(u => u.admin);     // 1\nusers.some(u => u.admin);          // true\nusers.every(u => u.name.length > 0); // true` },
        { label: 'flat, flatMap, groupBy', language: 'javascript', code: `[[1,2],[3,4],[5]].flat();         // [1,2,3,4,5]\n[[1,[2,3]],[[4]]].flat(Infinity); // fully flattened\n\n// flatMap = map + flat(1)\n[1,2,3].flatMap(x => [x, x*2]); // [1,2,2,4,3,6]\n\n// Group (ES2024)\nObject.groupBy(users, u => u.admin ? 'admins' : 'users');\n// { admins: [{...}], users: [{...}] }` },
        { label: 'forEach vs map', language: 'javascript', code: `// forEach: side effects, returns undefined\nusers.forEach(user => console.log(user.name));\n\n// map: transform, returns new array\nconst names = users.map(u => u.name);\n\n// Don't use forEach to build arrays\n// ❌ const result = []; users.forEach(u => result.push(u.name));\n// ✅ const result = users.map(u => u.name);` },
      ]
    },
    {
      title: 'Error Handling',
      items: [
        { label: 'try / catch / finally', language: 'javascript', code: `try {\n  const data = JSON.parse(rawInput);\n  processData(data);\n} catch (err) {\n  if (err instanceof SyntaxError) {\n    console.error('Invalid JSON:', err.message);\n  } else {\n    throw err; // don't swallow unknown errors\n  }\n} finally {\n  cleanup(); // always runs, even if try/catch throws\n}` },
        { label: 'Error types', language: 'javascript', code: `new Error('generic error')\nnew TypeError('wrong type')\nnew RangeError('out of range: index -1')\nnew ReferenceError('variable not defined')\nnew SyntaxError('invalid syntax')\nnew URIError('malformed URI')\n\n// Properties\nerr.name;    // 'TypeError'\nerr.message; // 'wrong type'\nerr.stack;   // stack trace string` },
        { label: 'Custom error class', language: 'javascript', code: `class AppError extends Error {\n  constructor(message, code, statusCode = 500) {\n    super(message);\n    this.name = 'AppError';\n    this.code = code;\n    this.statusCode = statusCode;\n    Error.captureStackTrace(this, this.constructor);\n  }\n}\n\nthrow new AppError('User not found', 'NOT_FOUND', 404);` },
        { label: 'Global error handling', language: 'javascript', code: `// Browser\nwindow.addEventListener('error', e => {\n  reportError(e.error);\n});\n\nwindow.addEventListener('unhandledrejection', e => {\n  reportError(e.reason);\n  e.preventDefault();\n});\n\n// Node.js\nprocess.on('uncaughtException',  err => { /* ... */ });\nprocess.on('unhandledRejection', err => { /* ... */ });` },
      ]
    },
  ]
}

const python = {
  id: 'python', title: 'Python', icon: '🐍', color: 'emerald',
  description: 'Python 3 syntax, data structures, classes, and standard library',
  sections: [
    {
      title: 'Variables & Types',
      items: [
        { label: 'Basic types', language: 'python', code: `# Numbers\nx = 42         # int\ny = 3.14       # float\nz = 2 + 3j     # complex\nbig = 10_000_000  # underscores for readability\n\n# Booleans\nt = True\nf = False\n\n# None (null equivalent)\nval = None\n\n# Check type\ntype(x)        # <class 'int'>\nprint(type(x).__name__)  # 'int'` },
        { label: 'Type conversion', language: 'python', code: `int("42")          # 42\nint(3.9)           # 3 (truncates)\nfloat("3.14")      # 3.14\nstr(100)           # "100"\nbool(0)            # False\nbool("")           # False\nbool([])           # False\nbool(1)            # True\nbool("hello")      # True\nlist("abc")        # ['a', 'b', 'c']\ntuple([1,2,3])     # (1, 2, 3)` },
        { label: 'isinstance and type checks', language: 'python', code: `isinstance(42, int)           # True\nisinstance(42, (int, float))  # True\n\n# Check for None\nif val is None:\n    print("nothing")\n\nif val is not None:\n    print("something")\n\n# Walrus operator (Python 3.8+)\nif n := len(data):\n    print(f"Got {n} items")` },
        { label: 'Multiple assignment', language: 'python', code: `a = b = c = 0       # all = 0\na, b = 1, 2         # tuple unpacking\na, b = b, a         # swap\nfirst, *rest = [1, 2, 3, 4]   # first=1, rest=[2,3,4]\n*init, last = [1, 2, 3, 4]    # init=[1,2,3], last=4\na, _, b = (1, 2, 3)           # skip middle` },
      ]
    },
    {
      title: 'Strings',
      items: [
        { label: 'f-strings', language: 'python', code: `name = "Alice"\nage = 30\n\nf"Hello {name}"                # Hello Alice\nf"{age:03d}"                   # 030 (padded)\nf"{3.14159:.2f}"               # 3.14\nf"{name!r}"                    # 'Alice' (repr)\nf"{2**10:,}"                   # 1,024 (comma sep)\nf"{'left':<10}|{'right':>10}"  # alignment` },
        { label: 'String methods', language: 'python', code: `s = "  Hello, World!  "\n\ns.strip()             # "Hello, World!"\ns.lower()             # "  hello, world!  "\ns.upper()             # "  HELLO, WORLD!  "\ns.replace("Hello", "Hi")   # "  Hi, World!  "\ns.split(", ")         # ['  Hello', 'World!  ']\n", ".join(["a","b","c"])  # "a, b, c"\ns.startswith("  H")  # True\ns.find("World")       # 9` },
        { label: 'String slicing', language: 'python', code: `s = "Hello, World!"\n\ns[0]       # 'H'\ns[-1]      # '!'\ns[0:5]     # 'Hello'\ns[7:]      # 'World!'\ns[:5]      # 'Hello'\ns[::2]     # every other char\ns[::-1]    # reversed: '!dlroW ,olleH'\ns[7:12]    # 'World'` },
        { label: 'Multiline strings', language: 'python', code: `text = """\nLine one\nLine two\nLine three\n"""\n\n# Continued string (no newline)\nquery = (\n    "SELECT * FROM users "\n    "WHERE active = true "\n    "LIMIT 10"\n)\n\ndocstring = """\nFunction description.\n\nArgs:\n    x: input value\n"""` },
      ]
    },
    {
      title: 'Lists',
      items: [
        { label: 'List operations', language: 'python', code: `lst = [1, 2, 3]\n\nlst.append(4)        # [1,2,3,4]\nlst.extend([5,6])    # [1,2,3,4,5,6]\nlst.insert(0, 0)     # [0,1,2,3,4,5,6]\nlst.remove(3)        # removes first 3\nlst.pop()            # removes & returns last\nlst.pop(0)           # removes & returns index 0\nlst.index(2)         # index of value 2\nlst.count(2)         # occurrences of 2\nlst.sort()\nlst.sort(reverse=True)\nlst.reverse()` },
        { label: 'List slicing', language: 'python', code: `lst = [0, 1, 2, 3, 4, 5]\n\nlst[1:4]     # [1, 2, 3]\nlst[:3]      # [0, 1, 2]\nlst[3:]      # [3, 4, 5]\nlst[-2:]     # [4, 5]\nlst[::2]     # [0, 2, 4]\nlst[::-1]    # [5, 4, 3, 2, 1, 0]\n\n# Copy\ncopy = lst[:]\ncopy = list(lst)\n\n# Replace slice\nlst[1:3] = [10, 20]` },
        { label: 'List comprehension', language: 'python', code: `# Basic\nsquares = [x**2 for x in range(10)]\n\n# With condition\nevens = [x for x in range(20) if x % 2 == 0]\n\n# Nested\nmatrix = [[i*j for j in range(1,4)] for i in range(1,4)]\n\n# Flatten\nflat = [item for sublist in matrix for item in sublist]\n\n# Transformation\nnames = [name.strip().title() for name in raw_names if name]` },
        { label: 'sorted and sort', language: 'python', code: `# sorted: returns new list\nsorted([3,1,2])                    # [1, 2, 3]\nsorted([3,1,2], reverse=True)      # [3, 2, 1]\nsorted(users, key=lambda u: u.age) # by attribute\nsorted(words, key=str.lower)       # case-insensitive\nsorted(pairs, key=lambda x: (x[1], x[0])) # multi-key\n\n# sort: in-place\nlst.sort(key=lambda x: x['name'])` },
      ]
    },
    {
      title: 'Dictionaries',
      items: [
        { label: 'Creating and accessing', language: 'python', code: `# Create\nd = {'name': 'Alice', 'age': 30}\nd = dict(name='Alice', age=30)\n\n# Access\nd['name']              # 'Alice' (KeyError if missing)\nd.get('name')          # 'Alice'\nd.get('city', 'N/A')   # 'N/A' (default)\n\n# Membership\n'name' in d            # True\n'city' not in d        # True\n\n# All keys/values/pairs\nlist(d.keys())\nlist(d.values())\nlist(d.items())` },
        { label: 'Updating and deleting', language: 'python', code: `d = {'a': 1, 'b': 2}\n\nd['c'] = 3             # add or update\nd.update({'c': 30, 'd': 4})\nd.update(e=5)          # kwargs syntax\n\ndel d['a']\nremoved = d.pop('b')   # remove and return\nd.pop('z', None)       # safe pop with default\nd.clear()              # remove all entries` },
        { label: 'Dict comprehension', language: 'python', code: `# Basic\nsquares = {x: x**2 for x in range(6)}\n\n# Filtered\neven_sq = {x: x**2 for x in range(10) if x % 2 == 0}\n\n# Swap keys and values\ninverted = {v: k for k, v in original.items()}\n\n# From lists\nkeys = ['a', 'b', 'c']\nvals = [1, 2, 3]\nd = dict(zip(keys, vals))  # or {k:v for k,v in zip(keys,vals)}` },
        { label: 'defaultdict and Counter', language: 'python', code: `from collections import defaultdict, Counter\n\n# defaultdict\ndd = defaultdict(list)\ndd['a'].append(1)   # no KeyError\ndd['a'].append(2)\n# dd == {'a': [1, 2]}\n\n# Counter\nc = Counter('abracadabra')\nc.most_common(3)    # [('a', 5), ('b', 2), ('r', 2)]\nc['a']              # 5\nCounter([1,1,2,3]) + Counter([1,2,2]) # combine` },
      ]
    },
    {
      title: 'Sets & Tuples',
      items: [
        { label: 'Sets', language: 'python', code: `s = {1, 2, 3}\ns = set([1, 2, 2, 3])  # {1, 2, 3} — deduplicates\n\ns.add(4)\ns.discard(4)      # no error if missing\ns.remove(4)       # KeyError if missing\n\na = {1, 2, 3, 4}\nb = {3, 4, 5, 6}\na | b   # union:        {1,2,3,4,5,6}\na & b   # intersection: {3, 4}\na - b   # difference:   {1, 2}\na ^ b   # symmetric diff:{1,2,5,6}` },
        { label: 'Tuples', language: 'python', code: `t = (1, 2, 3)\nt = 1, 2, 3    # parens optional\nt = (42,)      # single-element tuple (comma needed)\n\n# Access (same as list)\nt[0]           # 1\nt[-1]          # 3\nt[1:]          # (2, 3)\n\n# Unpacking\nx, y, z = t\na, *rest = t\n\n# Immutable — cannot reassign elements`, note: 'Tuples are hashable (can be dict keys); lists are not' },
        { label: 'Named tuples', language: 'python', code: `from collections import namedtuple\n\nPoint = namedtuple('Point', ['x', 'y'])\np = Point(3, 4)\np.x, p.y    # 3, 4\np[0], p[1]  # 3, 4\n\n# dataclass alternative (Python 3.7+)\nfrom dataclasses import dataclass\n\n@dataclass\nclass Point:\n    x: float\n    y: float\n\np = Point(3.0, 4.0)\nprint(p)  # Point(x=3.0, y=4.0)` },
        { label: 'frozenset', language: 'python', code: `# Immutable set — hashable, usable as dict key\nfs = frozenset([1, 2, 3])\n\ncache = {}\ncache[frozenset([1,2,3])] = 'result'\n\n# Supports set operations\nfs1 = frozenset({1,2})\nfs2 = frozenset({2,3})\nfs1 & fs2  # frozenset({2})` },
      ]
    },
    {
      title: 'Functions',
      items: [
        { label: '*args and **kwargs', language: 'python', code: `def log(*args, **kwargs):\n    print("args:", args)\n    print("kwargs:", kwargs)\n\nlog(1, 2, 3, sep=",", end="")\n# args: (1, 2, 3)\n# kwargs: {'sep': ',', 'end': ''}\n\n# Unpacking into function call\ndef add(a, b, c): return a+b+c\nnums = [1, 2, 3]\nadd(*nums)\nopts = {'b': 2, 'c': 3}\nadd(1, **opts)` },
        { label: 'Lambda', language: 'python', code: `# Lambda: single-expression anonymous function\ndouble = lambda x: x * 2\nadd    = lambda x, y: x + y\n\n# Common uses\nsorted(items, key=lambda x: x[1])\nfilter(lambda x: x > 0, nums)\nmap(lambda x: x.strip(), strings)\n\n# Prefer def for anything non-trivial`, note: 'Lambdas have no statements, no assignments, no annotations' },
        { label: 'Decorators', language: 'python', code: `import functools\n\ndef timer(func):\n    @functools.wraps(func)  # preserve __name__, __doc__\n    def wrapper(*args, **kwargs):\n        import time\n        start = time.time()\n        result = func(*args, **kwargs)\n        print(f"{func.__name__}: {time.time()-start:.3f}s")\n        return result\n    return wrapper\n\n@timer\ndef slow_function():\n    pass` },
        { label: 'Type hints', language: 'python', code: `from typing import Optional, Union, list, dict\n\ndef greet(name: str) -> str:\n    return f"Hello {name}"\n\ndef process(\n    items: list[int],\n    config: dict[str, str] | None = None\n) -> list[str]:\n    ...\n\n# Python 3.10+ union syntax\ndef func(x: int | float | None) -> str: ...` },
      ]
    },
    {
      title: 'Classes',
      items: [
        { label: 'Class definition', language: 'python', code: `class BankAccount:\n    interest_rate = 0.02   # class variable\n\n    def __init__(self, owner: str, balance: float = 0):\n        self.owner = owner       # instance variable\n        self._balance = balance  # convention: protected\n\n    def deposit(self, amount: float) -> None:\n        self._balance += amount\n\n    def __repr__(self) -> str:\n        return f"BankAccount({self.owner!r}, {self._balance})"` },
        { label: 'Inheritance', language: 'python', code: `class SavingsAccount(BankAccount):\n    def __init__(self, owner, balance=0):\n        super().__init__(owner, balance)\n        self.interest_earned = 0\n\n    def apply_interest(self):\n        gain = self._balance * self.interest_rate\n        self.deposit(gain)\n        self.interest_earned += gain\n\n# Multiple inheritance\nclass C(A, B):\n    pass\n# Method Resolution Order (MRO)\nC.__mro__` },
        { label: 'Dunder methods', language: 'python', code: `class Vector:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n\n    def __repr__(self): return f"Vector({self.x}, {self.y})"\n    def __str__(self):  return f"({self.x}, {self.y})"\n    def __add__(self, other): return Vector(self.x+other.x, self.y+other.y)\n    def __len__(self):  return 2\n    def __eq__(self, other): return self.x==other.x and self.y==other.y\n    def __hash__(self): return hash((self.x, self.y))` },
        { label: '@property, @classmethod, @staticmethod', language: 'python', code: `class Circle:\n    def __init__(self, radius):\n        self._radius = radius\n\n    @property\n    def radius(self): return self._radius\n\n    @radius.setter\n    def radius(self, val):\n        if val < 0: raise ValueError("negative radius")\n        self._radius = val\n\n    @classmethod\n    def from_diameter(cls, d): return cls(d / 2)\n\n    @staticmethod\n    def area_of(r): return 3.14159 * r ** 2` },
      ]
    },
    {
      title: 'Comprehensions',
      items: [
        { label: 'List, dict, set comprehensions', language: 'python', code: `# List\n[x**2 for x in range(10)]\n[x for x in lst if x > 0]\n\n# Dict\n{k: v for k, v in pairs}\n{s: len(s) for s in words}\n\n# Set\n{x % 10 for x in range(100)}\n\n# With condition (ternary)\n[x if x > 0 else 0 for x in nums]` },
        { label: 'Generator expressions', language: 'python', code: `# Like list comp but lazy — use () not []\ntotal = sum(x**2 for x in range(1000))   # no intermediate list\n\n# Use in any iterable context\nmax(len(s) for s in strings)\n','.join(str(x) for x in nums)\nall(x > 0 for x in nums)\nany(x < 0 for x in nums)\n\ngen = (x**2 for x in range(10))\nnext(gen)   # 0\nnext(gen)   # 1`, note: 'Generators are memory-efficient for large sequences' },
        { label: 'Nested comprehensions', language: 'python', code: `# Flatten 2D list\nmatrix = [[1,2],[3,4],[5,6]]\nflat = [x for row in matrix for x in row]  # [1,2,3,4,5,6]\n\n# Build 2D structure\ngrid = [[r*c for c in range(1,4)] for r in range(1,4)]\n# [[1,2,3],[2,4,6],[3,6,9]]\n\n# Cartesian product\npairs = [(x,y) for x in [1,2] for y in ['a','b']]` },
        { label: 'walrus in comprehension', language: 'python', code: `# Use := to capture a value\nresults = [\n    transformed\n    for x in data\n    if (transformed := expensive(x)) is not None\n]\n\n# Filter and use computed value\neven_sq = [\n    sq for x in range(20)\n    if (sq := x**2) % 2 == 0\n]` },
      ]
    },
    {
      title: 'File I/O',
      items: [
        { label: 'Reading files', language: 'python', code: `# Read entire file\nwith open('file.txt', 'r', encoding='utf-8') as f:\n    content = f.read()\n\n# Read lines\nwith open('file.txt') as f:\n    lines = f.readlines()   # list of strings with \\n\n    lines = [l.rstrip() for l in f]  # strip newlines\n\n# Read one line at a time\nwith open('large.txt') as f:\n    for line in f:\n        process(line.strip())` },
        { label: 'Writing files', language: 'python', code: `# Write (overwrites)\nwith open('out.txt', 'w', encoding='utf-8') as f:\n    f.write("Hello World\\n")\n    f.writelines(["line1\\n", "line2\\n"])\n\n# Append\nwith open('log.txt', 'a') as f:\n    f.write(f"{timestamp}: {message}\\n")\n\n# Write binary\nwith open('img.png', 'wb') as f:\n    f.write(bytes_data)` },
        { label: 'JSON', language: 'python', code: `import json\n\n# Read JSON file\nwith open('data.json') as f:\n    data = json.load(f)\n\n# Write JSON file\nwith open('out.json', 'w') as f:\n    json.dump(data, f, indent=2)\n\n# String conversion\ntext = json.dumps({'key': 'value'}, indent=2)\ndata = json.loads(text)\n\n# Handle dates (custom encoder)\njson.dumps(obj, default=str)` },
        { label: 'CSV', language: 'python', code: `import csv\n\n# Read CSV\nwith open('data.csv', newline='') as f:\n    reader = csv.DictReader(f)  # uses header row as keys\n    rows = list(reader)\n\n# Write CSV\nfields = ['name', 'age', 'city']\nwith open('out.csv', 'w', newline='') as f:\n    writer = csv.DictWriter(f, fieldnames=fields)\n    writer.writeheader()\n    writer.writerows(data)` },
        { label: 'pathlib', language: 'python', code: `from pathlib import Path\n\np = Path('data/file.txt')\np.exists()\np.parent      # Path('data')\np.name        # 'file.txt'\np.stem        # 'file'\np.suffix      # '.txt'\np.read_text()\np.write_text('content')\np.mkdir(parents=True, exist_ok=True)\nlist(p.parent.glob('*.txt'))` },
      ]
    },
    {
      title: 'Built-in Functions',
      items: [
        { label: 'Iteration helpers', language: 'python', code: `# range\nrange(10)       # 0..9\nrange(2, 10)    # 2..9\nrange(0, 10, 2) # 0,2,4,6,8\n\n# enumerate\nfor i, val in enumerate(lst, start=1):\n    print(i, val)\n\n# zip\nfor name, score in zip(names, scores):\n    print(f"{name}: {score}")\n\ndict(zip(keys, values))   # build dict` },
        { label: 'Functional tools', language: 'python', code: `# map\nlist(map(str, [1,2,3]))         # ['1','2','3']\nlist(map(int, '123'.split()))   # [1,2,3]\n\n# filter\nlist(filter(None, [0,'',1,2]))  # [1,2]\nlist(filter(lambda x: x>0, nums))\n\n# sorted with key\nsorted(data, key=lambda x: x['age'], reverse=True)\n\nfrom functools import reduce\nreduce(lambda a,b: a*b, [1,2,3,4])  # 24` },
        { label: 'Math and comparison', language: 'python', code: `abs(-5)          # 5\nround(3.14159, 2) # 3.14\nmin(3, 1, 4)     # 1\nmax(3, 1, 4)     # 4\nsum([1,2,3])     # 6\npow(2, 10)       # 1024\ndivmod(10, 3)    # (3, 1) — quotient, remainder\n\nimport math\nmath.sqrt(16)    # 4.0\nmath.ceil(3.2)   # 4\nmath.floor(3.9)  # 3\nmath.log2(1024)  # 10.0` },
        { label: 'Introspection', language: 'python', code: `len([1,2,3])      # 3\ntype(42)          # <class 'int'>\nid(obj)           # memory address\nrepr(obj)         # developer string\ndir(obj)          # list attributes/methods\nhasattr(obj, 'name')\ngetattr(obj, 'name', default)\nsetattr(obj, 'name', value)\ncallable(obj)     # True if obj is callable\nhelp(str.join)    # docs in REPL` },
      ]
    },
  ]
}

const cloud = {
  id: 'cloud', title: 'Cloud & Deploy', icon: '☁️', color: 'violet',
  description: 'Docker, Vercel, Railway, Nginx, and Linux deployment commands',
  sections: [
    {
      title: 'Docker Basics',
      items: [
        { label: 'Dockerfile', language: 'bash', code: `FROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --only=production\nCOPY . .\nEXPOSE 3000\nCMD ["node", "index.js"]`, note: 'Copy package.json first so npm ci layer is cached' },
        { label: 'Build and tag', language: 'bash', code: `# Build\ndocker build -t myapp:latest .\ndocker build -t myapp:1.0 --no-cache .\n\n# Multi-platform\ndocker buildx build --platform linux/amd64,linux/arm64 -t myapp .` },
        { label: 'Run containers', language: 'bash', code: `# Basic run\ndocker run myapp\n\n# Detached + port mapping\ndocker run -d -p 3000:3000 --name myapp myapp:latest\n\n# With env vars and volume\ndocker run -d \\\n  -p 3000:3000 \\\n  -e DATABASE_URL=postgres://... \\\n  -v $(pwd)/data:/app/data \\\n  --name myapp myapp:latest` },
        { label: 'Manage containers', language: 'bash', code: `docker ps              # running containers\ndocker ps -a           # all containers\ndocker stop myapp\ndocker start myapp\ndocker restart myapp\ndocker rm myapp        # remove stopped container\ndocker rm -f myapp     # force remove running\ndocker logs myapp      # view logs\ndocker logs -f myapp   # follow logs\ndocker exec -it myapp sh  # shell into container` },
        { label: 'Images and cleanup', language: 'bash', code: `docker images\ndocker pull node:20-alpine\ndocker push myrepo/myapp:latest\ndocker rmi myapp:latest\n\n# Cleanup\ndocker system prune     # remove unused everything\ndocker image prune      # remove dangling images\ndocker volume prune\ndocker container prune` },
      ]
    },
    {
      title: 'Docker Compose',
      items: [
        { label: 'docker-compose.yml', language: 'bash', code: `services:\n  app:\n    build: .\n    ports:\n      - "3000:3000"\n    environment:\n      - NODE_ENV=production\n      - DATABASE_URL=postgres://user:pass@db:5432/mydb\n    depends_on:\n      db:\n        condition: service_healthy\n    volumes:\n      - ./uploads:/app/uploads\n\n  db:\n    image: postgres:16\n    environment:\n      POSTGRES_DB: mydb\n      POSTGRES_USER: user\n      POSTGRES_PASSWORD: pass\n    volumes:\n      - pgdata:/var/lib/postgresql/data\n    healthcheck:\n      test: ["CMD", "pg_isready"]\n      interval: 5s\n      timeout: 5s\n      retries: 5\n\nvolumes:\n  pgdata:` },
        { label: 'Compose commands', language: 'bash', code: `docker compose up             # start all\ndocker compose up -d          # detached\ndocker compose up --build     # rebuild images\ndocker compose down           # stop + remove containers\ndocker compose down -v        # also remove volumes\ndocker compose logs -f        # follow all logs\ndocker compose logs app       # specific service\ndocker compose exec app sh    # shell into service\ndocker compose ps             # status\ndocker compose restart app` },
        { label: 'Networking', language: 'bash', code: `services:\n  app:\n    networks:\n      - frontend\n      - backend\n  db:\n    networks:\n      - backend\n  nginx:\n    networks:\n      - frontend\n\nnetworks:\n  frontend:\n  backend:\n    internal: true   # no external access`, note: 'Services on same network can reach each other by service name' },
        { label: 'Profiles and overrides', language: 'bash', code: `# docker-compose.yml (base)\n# docker-compose.override.yml (dev auto-applied)\n# docker-compose.prod.yml (explicit)\n\ndocker compose -f docker-compose.yml -f docker-compose.prod.yml up\n\n# Profiles\nservices:\n  mailhog:\n    image: mailhog/mailhog\n    profiles: [dev]\n\ndocker compose --profile dev up` },
      ]
    },
    {
      title: 'Vercel Deployment',
      items: [
        { label: 'Install and login', language: 'bash', code: `npm install -g vercel\nvercel login\n\n# Or use npx (no global install)\nnpx vercel login` },
        { label: 'Deploy', language: 'bash', code: `vercel               # preview deploy (prompts for config)\nvercel --prod        # production deploy\nvercel --yes         # skip prompts (use defaults)\n\n# Deploy specific directory\nvercel ./dist --prod\n\n# Link existing project\nvercel link` },
        { label: 'Environment variables', language: 'bash', code: `# Add via CLI\nvercel env add DATABASE_URL production\nvercel env add DATABASE_URL preview\nvercel env add DATABASE_URL development\n\n# List\nvercel env ls\n\n# Pull to local .env.local\nvercel env pull .env.local\n\n# Remove\nvercel env rm DATABASE_URL production` },
        { label: 'vercel.json config', language: 'bash', code: `{\n  "buildCommand": "npm run build",\n  "outputDirectory": "dist",\n  "installCommand": "npm ci",\n  "framework": "vite",\n  "rewrites": [\n    { "source": "/(.*)", "destination": "/index.html" }\n  ],\n  "headers": [\n    {\n      "source": "/api/(.*)",\n      "headers": [{ "key": "Cache-Control", "value": "no-store" }]\n    }\n  ]\n}`, note: 'rewrites: SPA fallback — serves index.html for all routes' },
        { label: 'Domains and aliases', language: 'bash', code: `vercel domains ls\nvercel domains add example.com\nvercel alias set my-deploy.vercel.app example.com\n\n# Inspect deployment\nvercel inspect\nvercel logs myapp.vercel.app` },
      ]
    },
    {
      title: 'Railway Deployment',
      items: [
        { label: 'Install and login', language: 'bash', code: `npm install -g @railway/cli\nrailway login\n\n# Or link existing project\nrailway link` },
        { label: 'Deploy and manage', language: 'bash', code: `railway up              # deploy current directory\nrailway up --detach     # deploy without following logs\nrailway status          # deployment status\nrailway logs            # view logs\nrailway logs --tail     # follow logs\nrailway open            # open project in browser\nrailway run <cmd>       # run command in Railway env` },
        { label: 'Environment variables', language: 'bash', code: `# Set variable\nrailway variables set DATABASE_URL=postgres://...\nrailway variables set API_KEY=secret123\n\n# List all\nrailway variables\n\n# Delete\nrailway variables delete API_KEY\n\n# Export to .env\nrailway variables --json > .env.json` },
        { label: 'Databases and services', language: 'bash', code: `# Add a database (Postgres, MySQL, Redis, MongoDB)\nrailway add                  # interactive menu\n\n# Connect variables automatically set:\n# PGHOST, PGPORT, PGDATABASE, PGUSER, PGPASSWORD\n# DATABASE_URL\n\n# Access database shell\nrailway connect postgres\nrailway connect redis` },
      ]
    },
    {
      title: 'Environment Variables',
      items: [
        { label: '.env file format', language: 'bash', code: `# .env file\nNODE_ENV=production\nPORT=3000\nDATABASE_URL=postgres://user:pass@host:5432/db\nAPI_KEY=sk-abc123\nJWT_SECRET=a-very-long-random-secret\n\n# Quoted strings (for spaces/special chars)\nAPP_NAME="My App Name"\n\n# Never commit .env to git!\n# Add .env to .gitignore` },
        { label: 'Node.js access', language: 'javascript', code: `// Built-in (Node 20+)\nconst port = process.env.PORT ?? 3000;\nconst dbUrl = process.env.DATABASE_URL;\n\n// With dotenv package\nimport 'dotenv/config';\n// or\nrequire('dotenv').config();\n\n// Validate required vars\nconst required = ['DATABASE_URL', 'JWT_SECRET'];\nrequired.forEach(key => {\n  if (!process.env[key]) throw new Error(\`Missing \${key}\`);\n});` },
        { label: 'Python access', language: 'python', code: `import os\nfrom dotenv import load_dotenv  # pip install python-dotenv\n\nload_dotenv()  # loads .env file\n\ndb_url = os.environ['DATABASE_URL']    # raises KeyError\ndb_url = os.environ.get('DATABASE_URL')  # None if missing\ndb_url = os.getenv('DATABASE_URL', 'sqlite:///dev.db')  # fallback\n\n# Validate required\nfor key in ['DATABASE_URL', 'SECRET_KEY']:\n    if not os.getenv(key):\n        raise RuntimeError(f"Missing required env var: {key}")` },
        { label: 'Vite / Frontend env vars', language: 'bash', code: `# .env files in Vite project\n.env                 # always loaded\n.env.local           # always loaded, git-ignored\n.env.development     # dev only\n.env.production      # prod only\n\n# Must be prefixed with VITE_ to be exposed to browser\nVITE_API_URL=https://api.example.com\nVITE_APP_TITLE=My App\n\n# Access in code\nimport.meta.env.VITE_API_URL` },
        { label: 'Secrets best practices', language: 'bash', code: `# .gitignore\n.env\n.env.local\n.env.*.local\n*.key\nsecrets/\n\n# Rotate secrets if leaked\n# Use different values per environment\n# Never log secrets even partially\n# Use a secret manager in production:\n# AWS Secrets Manager, HashiCorp Vault,\n# Doppler, 1Password Secrets Automation` },
      ]
    },
    {
      title: 'Nginx Config',
      items: [
        { label: 'Basic server block', language: 'bash', code: `server {\n    listen 80;\n    server_name example.com www.example.com;\n    root /var/www/html;\n    index index.html;\n\n    location / {\n        try_files $uri $uri/ /index.html;  # SPA fallback\n    }\n\n    location /api/ {\n        proxy_pass http://localhost:3000/;\n    }\n}` },
        { label: 'HTTPS with SSL', language: 'bash', code: `server {\n    listen 443 ssl http2;\n    server_name example.com;\n\n    ssl_certificate     /etc/letsencrypt/live/example.com/fullchain.pem;\n    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;\n    ssl_protocols TLSv1.2 TLSv1.3;\n\n    # Redirect HTTP to HTTPS\n    if ($scheme != "https") {\n        return 301 https://$host$request_uri;\n    }\n}` },
        { label: 'Reverse proxy', language: 'bash', code: `location /api/ {\n    proxy_pass         http://localhost:3000/;\n    proxy_http_version 1.1;\n    proxy_set_header   Host              $host;\n    proxy_set_header   X-Real-IP         $remote_addr;\n    proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;\n    proxy_set_header   X-Forwarded-Proto $scheme;\n    proxy_set_header   Upgrade           $http_upgrade;\n    proxy_set_header   Connection        'upgrade';\n}` },
        { label: 'Gzip and caching', language: 'bash', code: `# Gzip compression\ngzip on;\ngzip_vary on;\ngzip_min_length 1024;\ngzip_types text/plain text/css application/json\n           application/javascript text/xml\n           application/xml application/xml+rss;\n\n# Cache static assets\nlocation ~* \\.(js|css|png|jpg|gif|ico|woff2)$ {\n    expires 1y;\n    add_header Cache-Control "public, immutable";\n}` },
        { label: 'Common commands', language: 'bash', code: `nginx -t                 # test config\nnginx -T                 # test + dump config\nsystemctl reload nginx   # reload (no downtime)\nsystemctl restart nginx\nsystemctl status nginx\n\n# Config locations\n/etc/nginx/nginx.conf          # main config\n/etc/nginx/sites-available/    # site configs\n/etc/nginx/sites-enabled/      # symlinked active sites\n\n# Enable site\nln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/` },
      ]
    },
    {
      title: 'Linux Commands',
      items: [
        { label: 'File system', language: 'bash', code: `pwd               # current directory\nls -la            # list with hidden files + permissions\ncd /path/to/dir\ncd ~              # home directory\ncd -              # previous directory\nmkdir -p a/b/c    # create nested dirs\nrm -rf dir/       # remove directory recursively\ncp -r src/ dest/  # copy recursively\nmv old new        # move/rename\nln -s target link # symbolic link\nfind . -name "*.log" -newer file.txt` },
        { label: 'Text processing', language: 'bash', code: `cat file.txt\nhead -n 20 file.txt      # first 20 lines\ntail -n 50 file.txt      # last 50 lines\ntail -f app.log          # follow log in real-time\ngrep "error" app.log\ngrep -r "TODO" ./src     # recursive\ngrep -n "pattern" file   # with line numbers\nsed -i 's/old/new/g' file.txt  # in-place replace\nawk '{print $1}' file.txt      # print first column\nwc -l file.txt           # count lines` },
        { label: 'Permissions', language: 'bash', code: `# chmod: change file permissions\nchmod 644 file.txt     # rw-r--r--\nchmod 755 script.sh    # rwxr-xr-x\nchmod +x script.sh     # add execute\nchmod -R 755 dir/      # recursive\n\n# chown: change owner\nchown user:group file\nchown -R www-data:www-data /var/www/\n\n# Permission digits: 4=read 2=write 1=execute\n# 7=rwx 6=rw- 5=r-x 4=r-- 0=---` },
        { label: 'Process management', language: 'bash', code: `ps aux                   # list processes\nps aux | grep nginx      # filter\ntop                      # interactive process viewer\nhtop                     # nicer top\nkill -9 <pid>            # force kill by PID\npkill nginx              # kill by name\nkillall node\n\n# Background jobs\ncommand &                # run in background\nnohup command &          # persist after logout\njobs                     # list background jobs\nbg %1 / fg %1            # background/foreground` },
        { label: 'System and networking', language: 'bash', code: `df -h                    # disk usage\ndu -sh ./dir             # directory size\nfree -h                  # memory usage\nuname -a                 # system info\n\ncurl -I https://example.com    # headers only\ncurl -X POST url -d '{}' -H 'Content-Type: application/json'\nwget -O file.zip https://example.com/file.zip\n\nnetstat -tulpn           # open ports\nss -tulpn                # modern netstat\nlsof -i :3000            # what's using port 3000\nssh user@host\nssh-keygen -t ed25519 -C "email@example.com"` },
      ]
    },
    {
      title: 'Common Ports',
      items: [
        { label: 'Web and proxy', language: 'bash', code: `80    # HTTP\n443   # HTTPS\n8080  # HTTP alternate / dev servers\n8443  # HTTPS alternate\n3000  # Node.js / React dev\n5173  # Vite dev server\n4173  # Vite preview\n3001  # Express / alternate` },
        { label: 'Database ports', language: 'bash', code: `5432  # PostgreSQL\n3306  # MySQL / MariaDB\n27017 # MongoDB\n1433  # SQL Server\n1521  # Oracle\n9200  # Elasticsearch\n9300  # Elasticsearch (cluster)\n5984  # CouchDB` },
        { label: 'Cache and messaging', language: 'bash', code: `6379  # Redis\n11211 # Memcached\n5672  # RabbitMQ (AMQP)\n15672 # RabbitMQ management UI\n9092  # Kafka broker\n2181  # ZooKeeper\n4369  # RabbitMQ Erlang distribution` },
        { label: 'Dev tools and services', language: 'bash', code: `22    # SSH\n21    # FTP\n25    # SMTP\n587   # SMTP (submission)\n465   # SMTP SSL\n110   # POP3\n143   # IMAP\n8025  # MailHog SMTP\n8025  # MailHog web UI\n9090  # Prometheus\n3100  # Loki\n2375  # Docker daemon (unsecured)\n2376  # Docker daemon (TLS)` },
      ]
    },
  ]
}

const git = {
  id: 'git', title: 'Git', icon: '🔀', color: 'rose',
  description: 'Git workflow: commits, branches, remotes, rebasing, and stashing',
  sections: [
    {
      title: 'Setup & Init',
      items: [
        { label: 'Initial configuration', language: 'bash', code: `git config --global user.name "Your Name"\ngit config --global user.email "you@example.com"\ngit config --global core.editor "code --wait"\ngit config --global init.defaultBranch main\ngit config --global pull.rebase false\n\n# View config\ngit config --list\ngit config user.email` },
        { label: 'Initialize and clone', language: 'bash', code: `# New repo\ngit init                     # current directory\ngit init my-project          # new directory\n\n# Clone\ngit clone https://github.com/user/repo\ngit clone git@github.com:user/repo.git\ngit clone --depth 1 https://...  # shallow clone\ngit clone -b develop https://...  # specific branch` },
        { label: 'Remotes', language: 'bash', code: `git remote -v                              # list remotes\ngit remote add origin https://github.com/user/repo\ngit remote add upstream https://github.com/original/repo\ngit remote remove origin\ngit remote rename origin upstream\ngit remote set-url origin git@github.com:user/repo.git` },
        { label: '.gitconfig aliases', language: 'bash', code: `[alias]\n    st = status\n    co = checkout\n    br = branch\n    lg = log --graph --oneline --decorate --all\n    aa = add --all\n    cm = commit -m\n    undo = reset HEAD~1 --mixed\n\n# Usage\ngit lg\ngit cm "feat: add feature"` },
      ]
    },
    {
      title: 'Staging & Committing',
      items: [
        { label: 'git add', language: 'bash', code: `git add file.txt             # stage specific file\ngit add src/                 # stage directory\ngit add .                    # stage all changes\ngit add *.js                 # glob pattern\ngit add -p                   # interactive/partial staging\ngit add -u                   # stage tracked files only (no new)` },
        { label: 'git commit', language: 'bash', code: `git commit -m "feat: add user login"\ngit commit -m "Title" -m "Longer description"\ngit commit --amend -m "Fixed message"  # change last commit msg\ngit commit --amend --no-edit            # add to last commit\ngit commit -a -m "msg"                  # stage tracked + commit`, note: 'Amend only commits that have NOT been pushed to shared branch' },
        { label: 'git status and diff', language: 'bash', code: `git status\ngit status -s              # short format\n\ngit diff                   # unstaged changes\ngit diff --staged          # staged changes (before commit)\ngit diff HEAD              # all changes vs last commit\ngit diff main..feature     # between branches\ngit diff abc123 def456     # between commits` },
        { label: 'git log', language: 'bash', code: `git log\ngit log --oneline --graph --decorate --all\ngit log -n 10              # last 10 commits\ngit log --since="2 weeks ago"\ngit log --author="Alice"\ngit log --grep="hotfix"\ngit log -- path/to/file    # commits touching file\ngit log -p                 # show patches (diffs)\ngit shortlog -sn           # contributors by commit count` },
        { label: 'git show', language: 'bash', code: `git show                     # latest commit\ngit show abc1234             # specific commit\ngit show HEAD~3              # 3 commits back\ngit show main:file.txt       # file content at branch\ngit show abc1234:src/app.js  # file at commit` },
      ]
    },
    {
      title: 'Branching',
      items: [
        { label: 'Create and switch', language: 'bash', code: `# Create + switch\ngit checkout -b feature/login    # classic\ngit switch -c feature/login      # modern (Git 2.23+)\n\n# Switch only\ngit checkout main\ngit switch main\ngit switch -                 # previous branch` },
        { label: 'List and delete', language: 'bash', code: `git branch                   # local branches\ngit branch -a                # all (local + remote)\ngit branch -r                # remote tracking branches\ngit branch -v                # with last commit\n\n# Delete\ngit branch -d feature/done   # safe delete\ngit branch -D feature/oops   # force delete\n\n# Rename\ngit branch -m old-name new-name\ngit branch -M main           # force rename current` },
        { label: 'Tracking branches', language: 'bash', code: `# Create branch tracking remote\ngit checkout -b feature origin/feature\ngit switch --track origin/feature\n\n# Set tracking on existing branch\ngit branch -u origin/main main\ngit branch --set-upstream-to=origin/main\n\n# Show tracking\ngit branch -vv` },
        { label: 'Branch strategies', language: 'bash', code: `# Git Flow branches\nmain          # production\ndevelop       # integration\nfeature/*     # new features\nrelease/*     # pre-release\nhotfix/*      # production fixes\n\n# Trunk-based development\nmain          # production (always deployable)\nfeature/*     # short-lived, merged quickly\n\n# Conventional prefixes\nfeat/   fix/   chore/   docs/   refactor/   test/` },
      ]
    },
    {
      title: 'Merging & Rebasing',
      items: [
        { label: 'git merge', language: 'bash', code: `# Merge feature into main\ngit switch main\ngit merge feature/login\n\n# Keep merge commit (no fast-forward)\ngit merge --no-ff feature/login\n\n# Squash: combine all commits into one staged change\ngit merge --squash feature/login\ngit commit -m "feat: add login (squashed)"`, note: 'No-ff preserves branch history; squash gives clean linear history' },
        { label: 'git rebase', language: 'bash', code: `# Rebase feature onto main\ngit switch feature/login\ngit rebase main\n\n# Abort on conflict\ngit rebase --abort\n\n# Continue after resolving conflict\ngit add resolved-file.txt\ngit rebase --continue\n\n# Skip a commit\ngit rebase --skip`, note: 'Never rebase commits already pushed to shared branches' },
        { label: 'Interactive rebase', language: 'bash', code: `# Rewrite last 3 commits\ngit rebase -i HEAD~3\n\n# In the editor:\n# pick   abc123 first commit   (keep as-is)\n# squash def456 second commit  (squash into previous)\n# reword ghi789 third commit   (keep but edit message)\n# drop   jkl012 fourth commit  (remove entirely)\n# fixup  mno345 fifth commit   (squash, discard message)` },
        { label: 'git cherry-pick', language: 'bash', code: `# Apply a specific commit to current branch\ngit cherry-pick abc1234\n\n# Multiple commits\ngit cherry-pick abc..def         # range\ngit cherry-pick abc def ghi      # list\n\n# Without auto-committing\ngit cherry-pick -n abc1234\n\n# Abort\ngit cherry-pick --abort` },
        { label: 'Merge conflicts', language: 'bash', code: `# When conflict occurs:\ngit status                  # see conflicted files\n\n# Edit files — look for:\n# <<<<<<< HEAD\n# your changes\n# =======\n# incoming changes\n# >>>>>>> feature/branch\n\ngit add resolved-file.js    # mark resolved\ngit merge --continue        # or: git commit\n\n# Use a merge tool\ngit mergetool` },
      ]
    },
    {
      title: 'Remote Repos',
      items: [
        { label: 'push and pull', language: 'bash', code: `# Push\ngit push origin main\ngit push -u origin feature    # set upstream + push\ngit push --all                # push all branches\ngit push origin :old-branch   # delete remote branch\ngit push origin --delete old  # same thing\n\n# Pull (fetch + merge)\ngit pull origin main\ngit pull --rebase origin main  # fetch + rebase`, note: '--force-with-lease is safer than --force when overwriting remote' },
        { label: 'fetch', language: 'bash', code: `git fetch origin               # fetch all\ngit fetch origin main          # fetch specific branch\ngit fetch --all                # fetch all remotes\ngit fetch --prune              # remove deleted remote refs\n\n# Fetch then compare\ngit fetch origin\ngit diff HEAD origin/main      # local vs remote\ngit log HEAD..origin/main      # commits ahead on remote` },
        { label: 'Syncing with upstream', language: 'bash', code: `# Fork workflow\ngit remote add upstream https://github.com/original/repo\ngit fetch upstream\ngit switch main\ngit merge upstream/main\ngit push origin main` },
        { label: 'Tags', language: 'bash', code: `# Create\ngit tag v1.0.0                       # lightweight\ngit tag -a v1.0.0 -m "Release 1.0"   # annotated\ngit tag -a v1.0.0 abc1234            # tag specific commit\n\n# Push\ngit push origin v1.0.0\ngit push origin --tags\n\n# List and delete\ngit tag\ngit tag -d v0.9.0\ngit push origin :refs/tags/v0.9.0` },
      ]
    },
    {
      title: 'Undoing Changes',
      items: [
        { label: 'git restore (unstage/discard)', language: 'bash', code: `# Discard unstaged changes in working tree\ngit restore file.txt\ngit restore .               # discard all\n\n# Unstage (move from staging back to working tree)\ngit restore --staged file.txt\ngit restore --staged .` },
        { label: 'git reset', language: 'bash', code: `# Move HEAD + keep changes staged\ngit reset --soft HEAD~1\n\n# Move HEAD + unstage changes (default)\ngit reset HEAD~1\ngit reset --mixed HEAD~1\n\n# Move HEAD + discard all changes\ngit reset --hard HEAD~1\n\n# Reset single file from commit\ngit reset HEAD~1 -- file.txt`, note: '--hard destroys uncommitted work; ensure nothing important is lost' },
        { label: 'git revert', language: 'bash', code: `# Create new commit that undoes a previous commit\ngit revert abc1234\ngit revert HEAD              # undo last commit\ngit revert HEAD~3..HEAD      # undo last 3 commits\n\n# Revert without auto-committing\ngit revert -n abc1234\ngit commit -m "Revert feature X"`, note: 'Revert is safe for shared branches — it adds history instead of rewriting it' },
        { label: 'git reflog', language: 'bash', code: `# Recovery tool — all HEAD movements\ngit reflog\ngit reflog show feature/branch\n\n# Recover lost commit\ngit reflog                   # find commit hash\ngit checkout -b recovery abc1234\n\n# Recover from bad reset --hard\ngit reflog\ngit reset --hard HEAD@{3}`, note: 'reflog entries expire after 90 days by default' },
        { label: 'Amend and fixup', language: 'bash', code: `# Change last commit message\ngit commit --amend -m "Better message"\n\n# Add forgotten file to last commit\ngit add forgotten.txt\ngit commit --amend --no-edit\n\n# Fixup older commit with rebase\ngit add file.txt\ngit commit --fixup=abc1234\ngit rebase -i --autosquash HEAD~5` },
      ]
    },
    {
      title: 'Stashing',
      items: [
        { label: 'Stash and pop', language: 'bash', code: `git stash                   # stash tracked changes\ngit stash -u                # include untracked files\ngit stash -a                # include ignored files too\ngit stash pop               # apply latest + remove stash\ngit stash apply             # apply latest, keep in stash` },
        { label: 'Manage stashes', language: 'bash', code: `git stash list\n# stash@{0}: WIP on main: abc123 commit msg\n# stash@{1}: On feature: def456 ...\n\ngit stash show stash@{1}    # diff summary\ngit stash show -p stash@{1} # full diff\ngit stash apply stash@{1}   # apply specific stash\ngit stash drop stash@{1}    # delete specific stash\ngit stash clear             # delete all stashes` },
        { label: 'Named stashes', language: 'bash', code: `git stash push -m "WIP: refactor auth module"\ngit stash push -m "half-done login form" src/Login.jsx\n\n# Stash to a branch\ngit stash branch new-branch stash@{0}  # creates branch + applies` },
        { label: 'Partial stash', language: 'bash', code: `# Interactive — choose which hunks to stash\ngit stash -p\n\n# Stash specific files only\ngit stash push -m "only these" -- src/a.js src/b.js\n\n# Keep staged changes out of stash\ngit stash --keep-index` },
      ]
    },
    {
      title: '.gitignore Patterns',
      items: [
        { label: 'Basic patterns', language: 'bash', code: `# Ignore by name (any level)\nnode_modules\n.DS_Store\nThumbs.db\n\n# Ignore by extension\n*.log\n*.env\n*.pyc\n\n# Ignore specific file\n/secrets.json\nconfig/local.py\n\n# Ignore directory\nbuild/\ndist/\n.venv/\n__pycache__/` },
        { label: 'Wildcards', language: 'bash', code: `# * matches anything except /\n*.log\nsrc/*.test.js\n\n# ** matches any path\n**/node_modules\nlogs/**/*.log\n\n# ? matches any single character\ndoc?.txt    # doc1.txt, docA.txt, etc.\n\n# [abc] character class\n*.[oa]     # .o or .a files` },
        { label: 'Negation patterns', language: 'bash', code: `# ! negates a pattern — include despite earlier exclusion\n*.log\n!important.log\n\n# Include specific file in ignored directory\nbuild/\n!build/index.html\n\n# Note: can't re-include if parent dir is ignored\n# This does NOT work:\nbuild/\n!build/index.html  # won't work, build/ ignored entirely\n\n# Fix: ignore contents, not directory\nbuild/*\n!build/index.html  # this works` },
        { label: 'Scope and precedence', language: 'bash', code: `# .gitignore applies from its directory downward\n\n# Global gitignore (all repos)\ngit config --global core.excludesfile ~/.gitignore_global\n\n# ~/.gitignore_global\n.DS_Store\n*.swp\n.idea/\n.vscode/settings.json\n\n# Ignore already-tracked file\ngit rm --cached file.txt\n# then add to .gitignore\n\n# Check why a file is ignored\ngit check-ignore -v filename` },
        { label: 'Common .gitignore templates', language: 'bash', code: `# Node.js\nnode_modules/\nnpm-debug.log\n.env\n.env.local\ndist/\nbuild/\n\n# Python\n__pycache__/\n*.py[cod]\n.venv/\n*.egg-info/\ndist/\n.pytest_cache/\n\n# Editor\n.vscode/\n.idea/\n*.swp\n*.swo\n\n# OS\n.DS_Store\nThumbs.db` },
      ]
    },
  ]
}

const cheatsheets = [html, css, javascript, python, cloud, git]

export default cheatsheets
