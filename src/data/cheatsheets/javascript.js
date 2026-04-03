const javascript = {
  id: 'javascript', title: 'JavaScript', color: 'yellow',
  category: 'Languages',
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
        { label: 'Private methods', language: 'javascript', code: `class User {\n  #validate(password) {\n    return password.length > 8;\n  }\n\n  login(password) {\n    if (this.#validate(password)) {\n      this.authenticated = true;\n    }\n  }\n}`, note: 'Private methods start with # and are inaccessible outside the class' },
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

export default javascript
