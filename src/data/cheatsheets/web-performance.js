const webPerformance = {
  id: 'web-performance',
  title: 'Web Performance',
  color: 'emerald',
  category: 'Frontend',
  description: 'Core Web Vitals, asset optimization, rendering patterns, and network performance',
  sections: [
    {
      title: 'Core Web Vitals',
      items: [
        { label: 'LCP - Largest Contentful Paint', language: 'text', code: `Measure when the main content finishes loading\nGood: < 2.5s\nPoor: > 4.0s`, note: 'Focus on optimizing hero images and main text blocks' },
        { label: 'FID - First Input Delay', language: 'text', code: `Measure the time from the first user interaction to the browser's response\nGood: < 100ms\nPoor: > 300ms`, note: 'Replaced by INP (Interaction to Next Paint) in 2024' },
        { label: 'CLS - Cumulative Layout Shift', language: 'text', code: `Measure the physical stability of the page while loading\nGood: < 0.1\nPoor: > 0.25`, note: 'Avoid shifts by setting dimensions on images and using min-height' },
        { label: 'INP - Interaction to Next Paint', language: 'text', code: `Measure overall responsiveness of user interactions\nGood: < 200ms\nPoor: > 500ms`, note: 'Focus on reducing long tasks in JS' }
      ]
    },
    {
      title: 'Image Optimization',
      items: [
        { label: 'Modern Formats', language: 'text', code: `WebP (30% smaller than JPEG)\nAVIF (50% smaller than JPEG)`, note: 'Use <picture> to serve the best format with fallback' },
        { label: 'Responsive Images', language: 'html', code: `<img src="small.jpg" srcset="med.jpg 800w, large.jpg 1200w" sizes="(max-width: 600px) 480px, 800px">`, note: 'Server the right size for the right screen' },
        { label: 'Lazy Loading', language: 'html', code: `<img src="..." loading="lazy">`, note: 'Native lazy loading prevents off-screen images from loading until needed' },
        { label: 'Dimensions', language: 'html', code: `<img width="600" height="400">`, note: 'Always include width and height to prevent CLS' }
      ]
    },
    {
      title: 'Resource Loading',
      items: [
        { label: 'Async vs Defer', language: 'html', code: `<script async src="...">   -- executes as soon as it's ready\n<script defer src="...">   -- executes after HTML is parsed (ordered)`, note: 'Use defer for most scripts to keep parsing smooth' },
        { label: 'Pre-loading', language: 'html', code: `<link rel="preload" href="..." as="font" crossorigin>\n<link rel="prefetch" href="...">`, note: 'Preload for critical resources (fonts/hero); prefetch for future page navigation' },
        { label: 'Critical Path CSS', language: 'html', code: `<style>/* inline critical styles */</style>\n<link rel="preload" href="full.css" as="style">`, note: 'Inline small, critical CSS into the <head> to speed up first paint' }
      ]
    },
    {
      title: 'Code Splitting',
      items: [
        { label: 'Dynamic Import', language: 'javascript', code: `const Module = await import('./module.js');`, note: 'Only load code when it is actually needed' },
        { label: 'React.lazy', language: 'jsx', code: `const Heavy = React.lazy(() => import('./Heavy'));\n<Suspense fallback={<Loader />}><Heavy /></Suspense>`, note: 'Split route-level components to reduce the initial bundle size' },
        { label: 'Tree Shaking', language: 'text', code: `Dead-code elimination - removal of unused exports`, note: 'Ensure your app is using ES Modules (import/export)' }
      ]
    },
    {
      title: 'Caching Strategies',
      items: [
        { label: 'Cache-Control', language: 'text', code: `max-age: 31536000 (1 year)\nno-cache (check with server if entry up to date)\nno-store (do not cache at all)` },
        { label: 'ETag', language: 'text', code: `Unique identifier for a resource version; server returns 304 if unchanged`, note: 'Saves bandwidth by avoiding duplicate data transfer' },
        { label: 'Service Workers', language: 'javascript', code: `self.addEventListener('fetch', (e) => { e.respondWith(cache.match(e.request)); });`, note: 'Enables offline support and custom caching strategies' },
        { label: 'Stale-While-Revalidate', language: 'text', code: `Serve from cache immediately; update in background`, note: 'Ideal for frequently updated but non-critical content' }
      ]
    },
    {
      title: 'Rendering Patterns',
      items: [
        { label: 'CSR (Client-Side)', language: 'text', code: `JavaScript builds the entire UI in the browser`, note: 'Fast interaction once loaded; slow initial load (TBT)' },
        { label: 'SSR (Server-Side)', language: 'text', code: `Server renders full HTML per request`, note: 'Faster FCP; better for SEO' },
        { label: 'SSG (Static Generation)', language: 'text', code: `Generate HTML at build time`, note: 'Fastest delivery via CDN; good for blogs/docs' },
        { label: 'ISR (Incremental Static)', language: 'text', code: `Background re-generation of static pages`, note: 'Combines the speed of SSG with the freshness of SSR (Next.js)' }
      ]
    },
    {
      title: 'Network Optimization',
      items: [
        { label: 'HTTP/2 & HTTP/3', language: 'text', code: `Multiplexing (many requests on one connection)\nServer Push\nHeader Compression (HPACK)`, note: 'Reduces the overhead of multiple requests' },
        { label: 'Compression', language: 'text', code: `Brotli (superior to Gzip)\nGzip (standard compression)`, note: 'Always compress text assets (HTML, CSS, JS)' },
        { label: 'CDN (Content Delivery Network)', language: 'text', code: `Distribute assets to servers physically closer to users`, note: 'Significantly reduces latency (TTFB)' }
      ]
    },
    {
      title: 'JavaScript Optimization',
      items: [
        { label: 'Debounce', language: 'javascript', code: `const d = debounce(() => fn(), 300);`, note: 'Delay execution until the user stops an action (e.g., typing)' },
        { label: 'Throttle', language: 'javascript', code: `const t = throttle(() => fn(), 300);`, note: 'Enforce a maximum number of executions per second (e.g., scroll/resize)' },
        { label: 'Web Workers', language: 'javascript', code: `const w = new Worker('heavy.js');`, note: 'Move heavy computations to a background thread to keep UI fluid' },
        { label: 'requestAnimationFrame', language: 'javascript', code: `const step = () => { ...; requestAnimationFrame(step); };`, note: 'Use for smooth 60fps animations' }
      ]
    }
  ]
}

export default webPerformance
