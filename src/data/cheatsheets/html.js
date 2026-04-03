const html = {
  id: 'html', title: 'HTML', color: 'orange',
  category: 'Frontend',
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

export default html
