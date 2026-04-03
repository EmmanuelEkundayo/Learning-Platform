const algorithms = {
  id: 'algorithms',
  title: 'Algorithms',
  color: 'emerald',
  category: 'Algorithms',
  description: 'Sorting, searching, graph traversal, dynamic programming, and greedy algorithms',
  sections: [
    {
      title: 'Sorting Algorithms',
      items: [
        { label: 'Bubble Sort (O(n²))', language: 'javascript', code: `function bubbleSort(arr) {\n  for (let i = 0; i < arr.length; i++) {\n    for (let j = 0; j < arr.length - i - 1; j++) {\n      if (arr[j] > arr[j + 1]) {\n        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];\n      }\n    }\n  }\n  return arr;\n}`, note: 'Simple but inefficient for large datasets - only used for educational purposes' },
        { label: 'Selection Sort (O(n²))', language: 'javascript', code: `function selectionSort(arr) {\n  for (let i = 0; i < arr.length; i++) {\n    let min = i;\n    for (let j = i + 1; j < arr.length; j++) {\n      if (arr[j] < arr[min]) min = j;\n    }\n    [arr[i], arr[min]] = [arr[min], arr[i]];\n  }\n  return arr;\n}`, note: 'Performs minimum number of swaps (n swaps at most)' },
        { label: 'Merge Sort (O(n log n))', language: 'javascript', code: `function mergeSort(arr) {\n  if (arr.length <= 1) return arr;\n  const mid = Math.floor(arr.length / 2);\n  const left = mergeSort(arr.slice(0, mid));\n  const right = mergeSort(arr.slice(mid));\n  return merge(left, right);\n}`, note: 'Stable sort with guaranteed O(n log n) time complexity' },
        { label: 'Quick Sort (O(n log n))', language: 'javascript', code: `function quickSort(arr) {\n  if (arr.length <= 1) return arr;\n  const pivot = arr[arr.length - 1];\n  const left = [], right = [];\n  for (let i = 0; i < arr.length - 1; i++) {\n    arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i]);\n  }\n  return [...quickSort(left), pivot, ...quickSort(right)];\n}`, note: 'In-place sorting with O(n log n) average case, but O(n²) worst case' },
        { label: 'Insertion Sort (O(n²))', language: 'javascript', code: `for (let i = 1; i < arr.length; i++) {\n  let curr = arr[i];\n  let j = i - 1;\n  while (j >= 0 && arr[j] > curr) {\n    arr[j + 1] = arr[j];\n    j--;\n  }\n  arr[j + 1] = curr;\n}`, note: 'Efficient for small datasets or nearly sorted arrays' }
      ]
    },
    {
      title: 'Searching Algorithms',
      items: [
        { label: 'Linear Search (O(n))', language: 'javascript', code: `function linearSearch(arr, target) {\n  for (let i = 0; i < arr.length; i++) {\n    if (arr[i] === target) return i;\n  }\n  return -1;\n}`, note: 'Simple search for unsorted arrays' },
        { label: 'Binary Search (O(log n))', language: 'javascript', code: `function binarySearch(arr, target) {\n  let low = 0, high = arr.length - 1;\n  while (low <= high) {\n    const mid = Math.floor((low + high) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) low = mid + 1;\n    else high = mid - 1;\n  }\n  return -1;\n}`, note: 'Array MUST be sorted first - much faster than linear search for large datasets' },
        { label: 'Ternary Search (O(log₃ n))', language: 'javascript', code: `while (l <= r) {\n  m1 = l + (r - l) / 3;\n  m2 = r - (r - l) / 3;\n  if (arr[m1] == target) return m1;\n  if (arr[m2] == target) return m2;\n  if (target < arr[m1]) r = m1 - 1;\n  else if (target > arr[m2]) l = m2 + 1;\n  else { l = m1 + 1; r = m2 - 1; }\n}` }
      ]
    },
    {
      title: 'Graph Traversal',
      items: [
        { label: 'BFS (Breadth-First Search)', language: 'javascript', code: `function bfs(start) {\n  const queue = [start];\n  const visited = new Set([start]);\n  while (queue.length > 0) {\n    const node = queue.shift();\n    for (let neighborhood of adj[node]) {\n      if (!visited.has(neighborhood)) {\n        visited.add(neighborhood);\n        queue.push(neighborhood);\n      }\n    }\n  }\n}`, note: 'Finds the shortest path in an unweighted graph' },
        { label: 'DFS (Depth-First Search)', language: 'javascript', code: `function dfs(node, visited = new Set()) {\n  visited.add(node);\n  for (let neighbor of adj[node]) {\n    if (!visited.has(neighbor)) {\n      dfs(neighbor, visited);\n    }\n  }\n}`, note: 'Uses recursion (stack) and can find connected components or solve puzzles' }
      ]
    },
    {
      title: 'Graph: Shortest Path',
      items: [
        { label: "Dijkstra's (O((V+E) log V))", language: 'javascript', code: `function dijkstra(start) {\n  const dist = {}, pq = new PriorityQueue();\n  dist[start] = 0;\n  pq.push(start, 0);\n  while (!pq.isEmpty()) {\n    const [u, d] = pq.pop();\n    if (d > dist[u]) continue;\n    for (let [v, w] of adj[u]) {\n      if (dist[u] + w < dist[v]) {\n        dist[v] = dist[u] + w;\n        pq.push(v, dist[v]);\n      }\n    }\n  }\n}`, note: 'Finds shortest path in graphs with non-negative weights' },
        { label: 'Bellman-Ford (O(VE))', language: 'javascript', code: `for (let i = 0; i < V - 1; i++) {\n  for (let [u, v, w] of edges) {\n    dist[v] = Math.min(dist[v], dist[u] + w);\n  }\n}`, note: 'Handles negative weights and detects negative cycles' },
        { label: 'Floyd-Warshall (O(V³))', language: 'javascript', code: `for (let k = 0; k < V; k++)\n  for (let i = 0; i < V; i++)\n    for (let j = 0; j < V; j++)\n      dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);`, note: 'All-pairs shortest path algorithm' }
      ]
    },
    {
      title: 'Dynamic Programming',
      items: [
        { label: 'Fibonacci (Memoized)', language: 'javascript', code: `function fib(n, memo = {}) {\n  if (n in memo) return memo[n];\n  if (n <= 2) return 1;\n  memo[n] = fib(n - 1, memo) + fib(n - 2, memo);\n  return memo[n];\n}`, note: 'Reduces O(2ⁿ) to O(n) using caching' },
        { label: '0/1 Knapsack', language: 'javascript', code: `for (let i = 1; i <= n; i++) {\n  for (let w = 1; w <= W; w++) {\n    if (weights[i-1] <= w) {\n      dp[i][w] = Math.max(values[i-1] + dp[i-1][w-weights[i-1]], dp[i-1][w]);\n    } else dp[i][w] = dp[i-1][w];\n  }\n}`, note: 'Standard problem to decide whether to include an item or not' },
        { label: 'Longest Common Subsequence', language: 'javascript', code: `if (a[i] === b[j]) dp[i][j] = 1 + dp[i-1][j-1];\nelse dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);` }
      ]
    },
    {
      title: 'Greedy Algorithms',
      items: [
        { label: 'Fractional Knapsack', language: 'javascript', code: `items.sort((a, b) => (b.val/b.wt) - (a.val/a.wt));\nfor (let item of items) {\n  if (W >= item.wt) { W -= item.wt; totalValue += item.val; }\n  else { totalValue += item.val * (W / item.wt); break; }\n}`, note: 'Locally optimal choice leads to globally optimal solution (unlike 0/1 Knapsack)' },
        { label: "Prim's Algorithm (MST)", language: 'javascript', code: `pq.push(start, 0);\nwhile (!pq.isEmpty()) {\n  u = pq.pop();\n  if (visited[u]) continue;\n  visited[u] = true;\n  for (v, w in adj[u]) if (!visited[v]) pq.push(v, w);\n}`, note: 'Constructs Minimum Spanning Tree' },
        { label: 'Huffman Coding', language: 'javascript', code: `while (nodes.size > 1) {\n  left = pq.pop(); right = pq.pop();\n  pq.push(new Node(left.freq + right.freq, left, right));\n}`, note: 'Used for lossless data compression' }
      ]
    },
    {
      title: 'Recursion & Backtracking',
      items: [
        { label: 'Generating Permutations', language: 'javascript', code: `function permute(arr, current = []) {\n  if (arr.length === 0) console.log(current);\n  for (let i = 0; i < arr.length; i++) {\n    const next = arr.filter((_, idx) => idx !== i);\n    permute(next, [...current, arr[i]]);\n  }\n}` },
        { label: 'N-Queens', language: 'javascript', code: `function solve(row) {\n  if (row === n) return true;\n  for (let col = 0; col < n; col++) {\n    if (isSafe(row, col)) {\n      place(row, col);\n      if (solve(row + 1)) return true;\n      remove(row, col);\n    }\n  }\n  return false;\n}`, note: 'The remove step is the essence of backtracking' }
      ]
    },
    {
      title: 'Bit Manipulation',
      items: [
        { label: 'Check if Even/Odd', language: 'javascript', code: `const isEven = (num & 1) === 0;`, note: 'Much faster than using the modulo operator' },
        { label: 'Swap values', language: 'javascript', code: `a ^= b; b ^= a; a ^= b;`, note: 'Swaps two numbers without using a temporary variable' },
        { label: 'Check Power of 2', language: 'javascript', code: `const isPowerOfTwo = n > 0 && (n & (n - 1)) === 0;` },
        { label: 'Count Set Bits', language: 'javascript', code: `while (n > 0) { n &= (n - 1); count++; }`, note: "Brian Kernighan's algorithm" }
      ]
    },
    {
      title: 'String Algorithms',
      items: [
        { label: 'KMP - Pattern Searching', language: 'javascript', code: `// Knuth-Morris-Pratt O(n + m)\nfunction kmp(text, pattern) {\n  const lps = computeLPS(pattern);\n  // ... search using lps table to skip characters\n}`, note: 'Avoids redundant backtracking during pattern matching' },
        { label: 'Rabin-Karp (Hashing)', language: 'javascript', code: `// Calculate initial hash\n// For each shift, update hash in O(1)\nif (h1 === h2 && text.slice(i, i+m) === pattern) ...`, note: 'Uses rolling hash to match strings' }
      ]
    }
  ]
}

export default algorithms
