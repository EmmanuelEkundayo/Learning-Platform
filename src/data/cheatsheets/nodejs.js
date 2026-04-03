const nodejs = {
  id: 'nodejs',
  title: 'Node.js',
  color: 'lime',
  category: 'Languages',
  description: 'Core modules, file system, HTTP server, Express, streams, and async patterns',
  sections: [
    {
      title: 'Core Modules',
      items: [
        {
          label: 'require built-in modules',
          language: 'javascript',
          code: `const fs = require('fs')
const path = require('path')
const os = require('os')
const crypto = require('crypto')
const events = require('events')
const stream = require('stream')
const util = require('util')`,
          note: 'Built-in modules do not need npm install'
        },
        {
          label: '__dirname and __filename',
          language: 'javascript',
          code: `console.log(__dirname)   // absolute path of current directory
console.log(__filename)  // absolute path of current file

// Build a path relative to the current file
const filePath = path.join(__dirname, 'data', 'users.json')`,
          note: '__dirname and __filename are not available inside ES modules (import/export)'
        },
        {
          label: 'path module',
          language: 'javascript',
          code: `const path = require('path')

path.join('/home', 'user', 'file.txt')   // '/home/user/file.txt'
path.resolve('src', 'index.js')          // absolute path from cwd
path.basename('/home/user/file.txt')     // 'file.txt'
path.dirname('/home/user/file.txt')      // '/home/user'
path.extname('app.min.js')              // '.js'
path.parse('/home/user/file.txt')
// { root, dir, base, ext, name }`
        },
        {
          label: 'os module',
          language: 'javascript',
          code: `const os = require('os')

os.platform()      // 'linux', 'darwin', 'win32'
os.arch()          // 'x64', 'arm64'
os.cpus()          // array of CPU info objects
os.totalmem()      // total RAM in bytes
os.freemem()       // free RAM in bytes
os.homedir()       // '/home/username'
os.tmpdir()        // system temp directory
os.hostname()      // machine hostname`
        },
        {
          label: 'crypto module',
          language: 'javascript',
          code: `const crypto = require('crypto')

// Hash a string
const hash = crypto.createHash('sha256').update('hello').digest('hex')

// Generate random bytes
const token = crypto.randomBytes(32).toString('hex')

// HMAC
const hmac = crypto.createHmac('sha256', 'secret')
  .update('message')
  .digest('hex')

// UUID-like random value
const id = crypto.randomUUID()`,
          note: 'randomUUID() available in Node 14.17+'
        },
        {
          label: 'util module',
          language: 'javascript',
          code: `const util = require('util')

// Convert callback-based function to promise
const sleep = util.promisify(setTimeout)
await sleep(1000)

// Deep inspection of objects
console.log(util.inspect({ a: 1, b: [2, 3] }, { depth: null, colors: true }))

// Format strings (like printf)
util.format('Hello %s, you are %d years old', 'Alice', 30)`,
          note: 'util.promisify is essential for converting older Node APIs to async/await'
        },
        {
          label: 'events module',
          language: 'javascript',
          code: `const EventEmitter = require('events')

const emitter = new EventEmitter()

emitter.on('data', (chunk) => console.log('received:', chunk))
emitter.emit('data', 'hello world')

// Set max listeners to suppress warning
emitter.setMaxListeners(20)`
        },
        {
          label: 'stream module',
          language: 'javascript',
          code: `const { Readable, Writable, Transform, pipeline } = require('stream')
const { promisify } = require('util')

const pipelineAsync = promisify(pipeline)

// Use pipeline to safely connect streams with error handling
await pipelineAsync(
  readableStream,
  transformStream,
  writableStream
)`
        }
      ]
    },
    {
      title: 'File System',
      items: [
        {
          label: 'fs.readFile - async with callback',
          language: 'javascript',
          code: `const fs = require('fs')

fs.readFile('data.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err)
    return
  }
  const parsed = JSON.parse(data)
  console.log(parsed)
})`,
          note: 'Always check err before using data'
        },
        {
          label: 'fs.readFileSync - synchronous',
          language: 'javascript',
          code: `const fs = require('fs')

try {
  const data = fs.readFileSync('config.json', 'utf8')
  const config = JSON.parse(data)
  console.log(config)
} catch (err) {
  console.error('Failed to read file:', err)
}`,
          note: 'Blocks the event loop - only use at startup, not in request handlers'
        },
        {
          label: 'fs.writeFile and fs.appendFile',
          language: 'javascript',
          code: `const fs = require('fs')

// Overwrite or create file
fs.writeFile('output.txt', 'Hello World', 'utf8', (err) => {
  if (err) throw err
  console.log('File written')
})

// Append to file (creates if not exists)
fs.appendFile('log.txt', 'New log entry\n', (err) => {
  if (err) throw err
})`
        },
        {
          label: 'fs.mkdir and fs.readdir',
          language: 'javascript',
          code: `const fs = require('fs')

// Create directory recursively
fs.mkdir('dist/assets/images', { recursive: true }, (err) => {
  if (err) throw err
})

// Read directory contents
fs.readdir('./src', (err, files) => {
  if (err) throw err
  files.forEach(file => console.log(file))
})`
        },
        {
          label: 'fs.stat - file metadata',
          language: 'javascript',
          code: `const fs = require('fs')

fs.stat('app.js', (err, stats) => {
  if (err) throw err
  console.log(stats.isFile())       // true
  console.log(stats.isDirectory())  // false
  console.log(stats.size)           // bytes
  console.log(stats.mtime)          // last modified date
})`
        },
        {
          label: 'fs.promises - async/await API',
          language: 'javascript',
          code: `const fs = require('fs').promises
// or: const { readFile, writeFile, readdir } = require('fs/promises')

async function processFile() {
  try {
    const data = await fs.readFile('data.json', 'utf8')
    const parsed = JSON.parse(data)

    parsed.updatedAt = new Date().toISOString()
    await fs.writeFile('data.json', JSON.stringify(parsed, null, 2))

    const files = await fs.readdir('./src')
    console.log(files)
  } catch (err) {
    console.error(err)
  }
}`,
          note: 'Prefer fs.promises for cleaner async code in modern Node'
        },
        {
          label: 'fs.watch - watch for changes',
          language: 'javascript',
          code: `const fs = require('fs')

fs.watch('src/', { recursive: true }, (eventType, filename) => {
  console.log(\`\${eventType}: \${filename}\`)
})`,
          note: 'eventType is "rename" or "change"; recursive not supported on all platforms'
        },
        {
          label: 'fs.unlink and fs.rename',
          language: 'javascript',
          code: `const fs = require('fs').promises

// Delete a file
await fs.unlink('temp.txt')

// Rename or move a file
await fs.rename('old-name.txt', 'new-name.txt')

// Copy a file
await fs.copyFile('source.txt', 'destination.txt')`
        }
      ]
    },
    {
      title: 'HTTP Module',
      items: [
        {
          label: 'http.createServer',
          language: 'javascript',
          code: `const http = require('http')

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Hello World')
})

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000')
})`
        },
        {
          label: 'req.method and req.url',
          language: 'javascript',
          code: `const http = require('http')

const server = http.createServer((req, res) => {
  console.log(req.method)   // 'GET', 'POST', 'PUT', 'DELETE'
  console.log(req.url)      // '/api/users?page=1'
  console.log(req.headers)  // object of request headers

  const url = new URL(req.url, \`http://\${req.headers.host}\`)
  console.log(url.pathname)  // '/api/users'
  console.log(url.searchParams.get('page'))  // '1'
})`
        },
        {
          label: 'res.writeHead and res.end',
          language: 'javascript',
          code: `// Send JSON response
res.writeHead(200, {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
})
res.end(JSON.stringify({ success: true, data: [] }))

// Send error
res.writeHead(404, { 'Content-Type': 'application/json' })
res.end(JSON.stringify({ error: 'Not found' }))`
        },
        {
          label: 'Read request body with req.on',
          language: 'javascript',
          code: `const http = require('http')

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = ''

    req.on('data', (chunk) => {
      body += chunk.toString()
    })

    req.on('end', () => {
      const data = JSON.parse(body)
      console.log(data)
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ received: data }))
    })
  }
})`,
          note: 'Data arrives in chunks; concatenate and parse only after the "end" event'
        },
        {
          label: 'Simple request router',
          language: 'javascript',
          code: `const http = require('http')

const server = http.createServer((req, res) => {
  const url = new URL(req.url, \`http://\${req.headers.host}\`)

  if (req.method === 'GET' && url.pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end('<h1>Home</h1>')
  } else if (req.method === 'GET' && url.pathname === '/api/users') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify([{ id: 1, name: 'Alice' }]))
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Not found' }))
  }
})`
        },
        {
          label: 'https module (TLS server)',
          language: 'javascript',
          code: `const https = require('https')
const fs = require('fs')

const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}

https.createServer(options, (req, res) => {
  res.writeHead(200)
  res.end('Secure Hello')
}).listen(443)`,
          note: 'For local dev certs use mkcert; in production use a reverse proxy like nginx'
        },
        {
          label: 'http.get - make outgoing request',
          language: 'javascript',
          code: `const http = require('http')

http.get('http://api.example.com/data', (res) => {
  let body = ''
  res.on('data', (chunk) => body += chunk)
  res.on('end', () => {
    const data = JSON.parse(body)
    console.log(data)
  })
}).on('error', (err) => {
  console.error('Request error:', err)
})`,
          note: 'For modern code prefer the built-in fetch() available in Node 18+'
        }
      ]
    },
    {
      title: 'Express Basics',
      items: [
        {
          label: 'Create Express app',
          language: 'javascript',
          code: `const express = require('express')
const app = express()

// Parse JSON and URL-encoded bodies
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(3000, () => console.log('Server running on port 3000'))`,
          note: 'express.json() replaces the deprecated body-parser package'
        },
        {
          label: 'Route methods',
          language: 'javascript',
          code: `app.get('/users', (req, res) => {
  res.json([{ id: 1, name: 'Alice' }])
})

app.post('/users', (req, res) => {
  const user = req.body
  res.status(201).json({ created: user })
})

app.put('/users/:id', (req, res) => {
  res.json({ updated: req.params.id })
})

app.delete('/users/:id', (req, res) => {
  res.status(204).send()
})`
        },
        {
          label: 'req.params, req.query, req.body',
          language: 'javascript',
          code: `// GET /users/42?include=posts
app.get('/users/:id', (req, res) => {
  console.log(req.params.id)              // '42'
  console.log(req.query.include)          // 'posts'
  console.log(req.headers.authorization)  // Bearer token
})

// POST /users with JSON body
app.post('/users', (req, res) => {
  console.log(req.body.name)  // from request JSON
})`
        },
        {
          label: 'Middleware with app.use and next()',
          language: 'javascript',
          code: `// Logger middleware
app.use((req, res, next) => {
  console.log(\`\${req.method} \${req.url} \${Date.now()}\`)
  next()  // must call next() to pass control to the next handler
})

// Auth middleware
function requireAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  next()
}

app.get('/protected', requireAuth, (req, res) => {
  res.json({ secret: 'data' })
})`,
          note: 'Middleware runs in order; call next() to continue or send a response to stop'
        },
        {
          label: 'Express Router',
          language: 'javascript',
          code: `// routes/users.js
const router = require('express').Router()

router.get('/', (req, res) => res.json([]))
router.post('/', (req, res) => res.status(201).json(req.body))
router.get('/:id', (req, res) => res.json({ id: req.params.id }))

module.exports = router

// app.js
const usersRouter = require('./routes/users')
app.use('/api/users', usersRouter)`,
          note: 'Routers let you split routes into separate files'
        },
        {
          label: 'Error handling middleware',
          language: 'javascript',
          code: `// Must have 4 parameters to be treated as error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  })
})

// Throw errors in route handlers
app.get('/data', async (req, res, next) => {
  try {
    const data = await fetchData()
    res.json(data)
  } catch (err) {
    next(err)  // pass to error handler
  }
})`
        },
        {
          label: 'Serve static files',
          language: 'javascript',
          code: `const path = require('path')

// Serve everything in the "public" folder
app.use(express.static(path.join(__dirname, 'public')))

// Serve at a specific URL prefix
app.use('/static', express.static('public'))

// Serve a single-page app (fallback to index.html)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})`
        }
      ]
    },
    {
      title: 'Environment and Config',
      items: [
        {
          label: 'process.env',
          language: 'javascript',
          code: `// Access environment variables
const port = process.env.PORT || 3000
const nodeEnv = process.env.NODE_ENV || 'development'
const dbUrl = process.env.DATABASE_URL

// Check environment
if (process.env.NODE_ENV === 'production') {
  // enable production optimizations
}`,
          note: 'Never hardcode secrets - use environment variables'
        },
        {
          label: 'dotenv',
          language: 'javascript',
          code: `// npm install dotenv
require('dotenv').config()

// .env file:
// PORT=3000
// DATABASE_URL=postgres://localhost/mydb
// JWT_SECRET=supersecret

// Now available:
console.log(process.env.PORT)
console.log(process.env.DATABASE_URL)`,
          note: 'Call dotenv.config() as early as possible, before any other imports that use env vars'
        },
        {
          label: 'Config object pattern',
          language: 'javascript',
          code: `// config/index.js
require('dotenv').config()

module.exports = {
  port: parseInt(process.env.PORT) || 3000,
  env: process.env.NODE_ENV || 'development',
  db: {
    url: process.env.DATABASE_URL,
    poolSize: parseInt(process.env.DB_POOL_SIZE) || 10
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: '7d'
  }
}`,
          note: 'Centralizing config makes it easy to validate all env vars at startup'
        },
        {
          label: 'process.exit and exit codes',
          language: 'javascript',
          code: `// Exit with success
process.exit(0)

// Exit with failure
process.exit(1)

// Graceful shutdown pattern
process.on('SIGINT', async () => {
  console.log('Shutting down...')
  await db.close()
  server.close(() => {
    process.exit(0)
  })
})

process.on('SIGTERM', () => {
  process.exit(0)
})`,
          note: 'SIGINT is Ctrl+C; SIGTERM is sent by process managers like PM2 or Docker'
        },
        {
          label: 'process.argv - command line arguments',
          language: 'javascript',
          code: `// node script.js --port 3000 --env production
const args = process.argv.slice(2)
console.log(args)  // ['--port', '3000', '--env', 'production']

// Simple arg parser
const argMap = {}
for (let i = 0; i < args.length; i += 2) {
  argMap[args[i].replace('--', '')] = args[i + 1]
}
console.log(argMap.port)  // '3000'`,
          note: 'process.argv[0] is node, process.argv[1] is the script path'
        },
        {
          label: 'process info and signals',
          language: 'javascript',
          code: `console.log(process.pid)      // current process ID
console.log(process.version)  // 'v20.11.0'
console.log(process.cwd())    // current working directory
console.log(process.uptime()) // seconds since process started

// Uncaught error handler
process.on('uncaughtException', (err) => {
  console.error('Uncaught:', err)
  process.exit(1)
})

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled rejection:', reason)
  process.exit(1)
})`,
          note: 'Always handle uncaughtException and unhandledRejection in production apps'
        }
      ]
    },
    {
      title: 'NPM Commands',
      items: [
        {
          label: 'Initialize and install',
          language: 'bash',
          code: `npm init -y                     # create package.json with defaults
npm install express             # install and add to dependencies
npm install --save-dev jest     # install and add to devDependencies
npm install                     # install all deps from package.json
npm ci                          # clean install (faster, uses package-lock.json)`,
          note: 'npm ci is preferred in CI/CD pipelines'
        },
        {
          label: 'Running scripts',
          language: 'bash',
          code: `npm run start        # runs "start" script in package.json
npm run build        # runs "build" script
npm test             # shorthand for npm run test
npm start            # shorthand for npm run start

# package.json scripts example:
# "scripts": {
#   "start": "node src/index.js",
#   "dev": "nodemon src/index.js",
#   "build": "tsc",
#   "test": "jest"
# }`
        },
        {
          label: 'Package management',
          language: 'bash',
          code: `npm uninstall express           # remove package
npm update                      # update all packages within semver range
npm outdated                    # list packages with newer versions
npm list                        # list installed packages (flat)
npm list --depth=0              # top-level packages only
npm ls express                  # check if express is installed`
        },
        {
          label: 'Security and audit',
          language: 'bash',
          code: `npm audit                   # scan for vulnerabilities
npm audit fix               # auto-fix vulnerabilities
npm audit fix --force       # upgrade breaking changes too
npm audit --json            # output JSON report`,
          note: 'Run npm audit in CI to catch security issues before deploy'
        },
        {
          label: 'npx - run without installing',
          language: 'bash',
          code: `npx create-react-app my-app     # run package without global install
npx ts-node script.ts           # run TypeScript directly
npx prettier --write .          # format code
npx jest                        # run jest from node_modules/.bin`,
          note: 'npx always uses the local version if available, then downloads temporarily'
        },
        {
          label: 'Publishing packages',
          language: 'bash',
          code: `npm login                       # authenticate with npm registry
npm publish                     # publish to npm registry
npm publish --access public     # for scoped packages (@org/name)
npm version patch               # bump 1.0.0 -> 1.0.1
npm version minor               # bump 1.0.0 -> 1.1.0
npm version major               # bump 1.0.0 -> 2.0.0
npm pack                        # preview what will be published`
        },
        {
          label: 'package.json key fields',
          language: 'json',
          code: `{
  "name": "my-app",
  "version": "1.0.0",
  "main": "src/index.js",
  "type": "module",
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js",
    "test": "jest"
  },
  "engines": { "node": ">=18.0.0" },
  "dependencies": { "express": "^4.18.0" },
  "devDependencies": { "jest": "^29.0.0" }
}`,
          note: 'Set "type": "module" to use ES module import/export syntax'
        }
      ]
    },
    {
      title: 'Streams and Buffers',
      items: [
        {
          label: 'fs.createReadStream and fs.createWriteStream',
          language: 'javascript',
          code: `const fs = require('fs')

const readStream = fs.createReadStream('large-file.txt', {
  encoding: 'utf8',
  highWaterMark: 64 * 1024  // 64KB chunks
})

const writeStream = fs.createWriteStream('output.txt')

readStream.on('data', (chunk) => {
  writeStream.write(chunk)
})

readStream.on('end', () => {
  writeStream.end()
  console.log('Done')
})`,
          note: 'Streams process large files without loading everything into memory'
        },
        {
          label: 'pipe',
          language: 'javascript',
          code: `const fs = require('fs')
const zlib = require('zlib')

// Compress a file
fs.createReadStream('input.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('input.txt.gz'))
  .on('finish', () => console.log('Compressed'))`,
          note: '.pipe() handles backpressure automatically'
        },
        {
          label: 'Transform stream',
          language: 'javascript',
          code: `const { Transform } = require('stream')

const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase())
    callback()
  }
})

process.stdin
  .pipe(upperCaseTransform)
  .pipe(process.stdout)`
        },
        {
          label: 'readline - read line by line',
          language: 'javascript',
          code: `const readline = require('readline')
const fs = require('fs')

const rl = readline.createInterface({
  input: fs.createReadStream('data.csv')
})

rl.on('line', (line) => {
  const fields = line.split(',')
  console.log(fields)
})

rl.on('close', () => {
  console.log('Done reading file')
})`,
          note: 'Efficient for processing large CSV or log files line by line'
        },
        {
          label: 'Buffer',
          language: 'javascript',
          code: `// Create buffers
const buf1 = Buffer.from('Hello World', 'utf8')
const buf2 = Buffer.alloc(10)         // 10 zero bytes
const buf3 = Buffer.allocUnsafe(10)   // faster, uninitialized

// Convert
console.log(buf1.toString('utf8'))    // 'Hello World'
console.log(buf1.toString('hex'))     // hex string
console.log(buf1.toString('base64'))  // base64 string

// Buffer info
console.log(buf1.length)    // 11
console.log(buf1[0])        // 72 (ASCII 'H')`,
          note: 'Use Buffer.alloc() not Buffer.allocUnsafe() unless performance is critical'
        },
        {
          label: 'Stream events: data, end, error',
          language: 'javascript',
          code: `const stream = fs.createReadStream('file.txt')

stream.on('data', (chunk) => {
  // chunk is a Buffer unless encoding is set
  console.log('Got chunk:', chunk.length, 'bytes')
})

stream.on('end', () => {
  console.log('Stream finished')
})

stream.on('error', (err) => {
  console.error('Stream error:', err)
})

// Pause and resume
stream.pause()
setTimeout(() => stream.resume(), 1000)`
        },
        {
          label: 'pipeline utility (safer than pipe)',
          language: 'javascript',
          code: `const { pipeline } = require('stream/promises')
const fs = require('fs')
const zlib = require('zlib')

async function compressFile(input, output) {
  await pipeline(
    fs.createReadStream(input),
    zlib.createGzip(),
    fs.createWriteStream(output)
  )
  console.log('Pipeline done')
}

compressFile('large.txt', 'large.txt.gz').catch(console.error)`,
          note: 'pipeline automatically destroys streams on error, unlike pipe()'
        }
      ]
    },
    {
      title: 'Child Processes',
      items: [
        {
          label: 'exec - run shell command',
          language: 'javascript',
          code: `const { exec } = require('child_process')

exec('ls -la', (err, stdout, stderr) => {
  if (err) {
    console.error('Error:', err)
    return
  }
  console.log('Output:', stdout)
  if (stderr) console.error('Stderr:', stderr)
})`,
          note: 'exec buffers the entire output; use spawn for large outputs or long-running processes'
        },
        {
          label: 'spawn - streaming output',
          language: 'javascript',
          code: `const { spawn } = require('child_process')

const child = spawn('git', ['log', '--oneline', '-10'])

child.stdout.on('data', (data) => {
  process.stdout.write(data)
})

child.stderr.on('data', (data) => {
  process.stderr.write(data)
})

child.on('close', (code) => {
  console.log(\`Exited with code \${code}\`)
})`,
          note: 'spawn is better for long-running processes or streaming large outputs'
        },
        {
          label: 'fork - IPC with child process',
          language: 'javascript',
          code: `// parent.js
const { fork } = require('child_process')

const child = fork('./worker.js')

child.send({ task: 'compute', data: [1, 2, 3, 4, 5] })

child.on('message', (result) => {
  console.log('Result from worker:', result)
  child.kill()
})

// worker.js
process.on('message', ({ task, data }) => {
  const result = data.reduce((a, b) => a + b, 0)
  process.send({ result })
})`,
          note: 'fork() is designed for running other Node.js scripts with IPC channel'
        },
        {
          label: 'execSync and spawnSync',
          language: 'javascript',
          code: `const { execSync, spawnSync } = require('child_process')

// execSync - blocks until done, returns stdout Buffer
const output = execSync('git rev-parse HEAD').toString().trim()
console.log('Current commit:', output)

// spawnSync - synchronous spawn with full result object
const result = spawnSync('node', ['--version'])
console.log(result.stdout.toString())  // 'v20.11.0\n'
console.log(result.status)             // exit code`,
          note: 'Sync versions block the event loop - only use in scripts, not servers'
        },
        {
          label: 'exec with promisify',
          language: 'javascript',
          code: `const { exec } = require('child_process')
const { promisify } = require('util')

const execAsync = promisify(exec)

async function getGitLog() {
  try {
    const { stdout } = await execAsync('git log --oneline -5')
    console.log(stdout)
  } catch (err) {
    console.error('Git error:', err.stderr)
  }
}

getGitLog()`
        },
        {
          label: 'execFile - run a file directly',
          language: 'javascript',
          code: `const { execFile } = require('child_process')

// Safer than exec when using user input (no shell)
execFile('node', ['script.js', '--arg', 'value'], (err, stdout, stderr) => {
  if (err) throw err
  console.log(stdout)
})`,
          note: 'execFile does not spawn a shell, making it safer with untrusted input'
        }
      ]
    },
    {
      title: 'Event Emitter',
      items: [
        {
          label: 'Basic EventEmitter usage',
          language: 'javascript',
          code: `const EventEmitter = require('events')

const emitter = new EventEmitter()

// Register listener
emitter.on('greet', (name) => {
  console.log(\`Hello, \${name}!\`)
})

// Emit event
emitter.emit('greet', 'Alice')  // Hello, Alice!
emitter.emit('greet', 'Bob')    // Hello, Bob!`
        },
        {
          label: 'Extend EventEmitter with a class',
          language: 'javascript',
          code: `const EventEmitter = require('events')

class Database extends EventEmitter {
  constructor() {
    super()
    this.connected = false
  }

  connect(url) {
    // simulate async connection
    setTimeout(() => {
      this.connected = true
      this.emit('connected', url)
    }, 100)
  }

  query(sql) {
    if (!this.connected) {
      this.emit('error', new Error('Not connected'))
      return
    }
    this.emit('query', sql)
  }
}

const db = new Database()
db.on('connected', (url) => console.log('Connected to', url))
db.connect('postgres://localhost/mydb')`,
          note: 'Extending EventEmitter is the standard pattern for Node.js event-driven classes'
        },
        {
          label: 'emitter.once - one-time listener',
          language: 'javascript',
          code: `const EventEmitter = require('events')
const emitter = new EventEmitter()

// Fires only on the first emit, then auto-removed
emitter.once('init', () => {
  console.log('Initialized!')
})

emitter.emit('init')  // fires - 'Initialized!'
emitter.emit('init')  // no output`,
          note: 'Use once() for setup events like "ready" or "connection" that only matter once'
        },
        {
          label: 'removeListener and off',
          language: 'javascript',
          code: `const EventEmitter = require('events')
const emitter = new EventEmitter()

function handleData(data) {
  console.log('received:', data)
}

emitter.on('data', handleData)
emitter.emit('data', 'first')   // fires

// Remove specific listener (must use same function reference)
emitter.removeListener('data', handleData)
// or: emitter.off('data', handleData)

emitter.emit('data', 'second')  // no output`,
          note: 'You must pass the same function reference to removeListener - anonymous functions cannot be removed'
        },
        {
          label: 'Error events and max listeners',
          language: 'javascript',
          code: `const EventEmitter = require('events')
const emitter = new EventEmitter()

// If no "error" listener, Node throws uncaught error
emitter.on('error', (err) => {
  console.error('Emitter error:', err.message)
})

emitter.emit('error', new Error('something went wrong'))

// Increase listener limit (default 10)
emitter.setMaxListeners(50)

// Get listener count
console.log(emitter.listenerCount('data'))`,
          note: 'Always add an error listener - unhandled error events crash the process'
        },
        {
          label: 'emitter.eventNames and listeners',
          language: 'javascript',
          code: `const EventEmitter = require('events')
const emitter = new EventEmitter()

emitter.on('data', () => {})
emitter.on('data', () => {})
emitter.on('end', () => {})

console.log(emitter.eventNames())          // ['data', 'end']
console.log(emitter.listenerCount('data')) // 2
console.log(emitter.listeners('data'))     // [Function, Function]

// Remove all listeners for an event
emitter.removeAllListeners('data')

// Remove all listeners on the emitter
emitter.removeAllListeners()`
        }
      ]
    },
    {
      title: 'Async Patterns',
      items: [
        {
          label: 'Error-first callback pattern',
          language: 'javascript',
          code: `function readConfig(path, callback) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) return callback(err)  // pass error as first arg
    try {
      const config = JSON.parse(data)
      callback(null, config)       // null for error means success
    } catch (parseErr) {
      callback(parseErr)
    }
  })
}

readConfig('config.json', (err, config) => {
  if (err) {
    console.error('Failed:', err)
    return
  }
  console.log(config)
})`,
          note: 'Node.js convention: callback(err, result) - err is always the first argument'
        },
        {
          label: 'Promise',
          language: 'javascript',
          code: `function delay(ms) {
  return new Promise((resolve, reject) => {
    if (ms < 0) return reject(new Error('Delay cannot be negative'))
    setTimeout(resolve, ms)
  })
}

delay(1000)
  .then(() => console.log('1 second passed'))
  .catch((err) => console.error(err))
  .finally(() => console.log('always runs'))`
        },
        {
          label: 'async/await',
          language: 'javascript',
          code: `async function fetchUser(id) {
  try {
    const res = await fetch(\`https://api.example.com/users/\${id}\`)

    if (!res.ok) {
      throw new Error(\`HTTP \${res.status}\`)
    }

    const user = await res.json()
    return user
  } catch (err) {
    console.error('Failed to fetch user:', err)
    throw err  // re-throw so callers can handle
  }
}

// Call an async function
const user = await fetchUser(1)`,
          note: 'await can only be used inside async functions (or at top level in ES modules)'
        },
        {
          label: 'Promise.all - parallel execution',
          language: 'javascript',
          code: `async function loadDashboard(userId) {
  // Run all three in parallel, not sequentially
  const [user, posts, notifications] = await Promise.all([
    fetch(\`/api/users/\${userId}\`).then(r => r.json()),
    fetch(\`/api/posts?userId=\${userId}\`).then(r => r.json()),
    fetch(\`/api/notifications?userId=\${userId}\`).then(r => r.json())
  ])

  return { user, posts, notifications }
}`,
          note: 'Promise.all rejects immediately if any promise rejects (fail-fast)'
        },
        {
          label: 'Promise.allSettled - handle partial failures',
          language: 'javascript',
          code: `const results = await Promise.allSettled([
  fetch('/api/users').then(r => r.json()),
  fetch('/api/broken-endpoint').then(r => r.json()),
  fetch('/api/posts').then(r => r.json())
])

results.forEach((result, i) => {
  if (result.status === 'fulfilled') {
    console.log(\`Request \${i} succeeded:\`, result.value)
  } else {
    console.error(\`Request \${i} failed:\`, result.reason)
  }
})`,
          note: 'allSettled never rejects - use when you want results from all requests even if some fail'
        },
        {
          label: 'util.promisify',
          language: 'javascript',
          code: `const { promisify } = require('util')
const fs = require('fs')

// Convert callback-based to promise-based
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const sleep = promisify(setTimeout)

async function processFile() {
  const data = await readFile('input.txt', 'utf8')
  await sleep(100)
  await writeFile('output.txt', data.toUpperCase())
}`,
          note: 'Works with any function that follows the (err, result) callback convention'
        },
        {
          label: 'Promise.race and Promise.any',
          language: 'javascript',
          code: `// race - resolves/rejects with the first settled promise
const timeout = new Promise((_, reject) =>
  setTimeout(() => reject(new Error('Timeout')), 5000)
)

const result = await Promise.race([fetchData(), timeout])

// any - resolves with first fulfilled, rejects only if all reject
const fastest = await Promise.any([
  fetch('https://server1.example.com/api'),
  fetch('https://server2.example.com/api'),
  fetch('https://server3.example.com/api')
])`,
          note: 'Promise.race rejects on first failure; Promise.any only rejects when ALL fail'
        }
      ]
    }
  ]
}

export default nodejs
