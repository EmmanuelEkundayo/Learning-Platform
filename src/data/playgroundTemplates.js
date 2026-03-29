export const playgroundTemplates = {
  python: {
    dsa: [
      {
        id: "binary-search-py",
        name: "Binary Search",
        category: "DSA",
        code: `def binary_search(arr, target):
    low = 0
    high = len(arr) - 1
    
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
            
    return -1

# Example
data = [1, 3, 5, 7, 9, 11]
print(f"Target 7 at index: {binary_search(data, 7)}")`
      },
      {
        id: "bfs-py",
        name: "BFS (Adjacency List)",
        category: "DSA",
        code: `from collections import deque

def bfs(graph, start):
    visited = {start}
    queue = deque([start])
    result = []
    
    while queue:
        node = queue.popleft()
        result.append(node)
        
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    return result

# Example
graph = {
    'A': ['B', 'C'],
    'B': ['D', 'E'],
    'C': ['F'],
    'D': [], 'E': [], 'F': []
}
print(f"BFS Order: {bfs(graph, 'A')}")`
      },
      {
        id: "dfs-py",
        name: "DFS (Recursive)",
        category: "DSA",
        code: `def dfs(graph, node, visited=None):
    if visited is None:
        visited = set()
    
    visited.add(node)
    print(node, end=" ")
    
    for neighbor in graph.get(node, []):
        if neighbor not in visited:
            dfs(graph, neighbor, visited)

# Example
graph = {
    '1': ['2', '3'],
    '2': ['4', '5'],
    '3': [], '4': [], '5': []
}
dfs(graph, '1')`
      },
      {
        id: "merge-sort-py",
        name: "Merge Sort",
        category: "DSA",
        code: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] < right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result

# Example
data = [38, 27, 43, 3, 9, 82, 10]
print(f"Sorted: {merge_sort(data)}")`
      },
      {
        id: "quick-sort-py",
        name: "Quick Sort",
        category: "DSA",
        code: `def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)

# Example
data = [10, 80, 30, 90, 40, 50, 70]
print(f"Sorted: {quick_sort(data)}")`
      },
      {
        id: "dijkstra-py",
        name: "Dijkstra's Algorithm",
        category: "DSA",
        code: `import heapq

def dijkstra(graph, start):
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    pq = [(0, start)]
    
    while pq:
        curr_dist, curr_node = heapq.heappop(pq)
        
        if curr_dist > distances[curr_node]:
            continue
            
        for neighbor, weight in graph[curr_node].items():
            distance = curr_dist + weight
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(pq, (distance, neighbor))
    return distances

# Example
graph = {
    'A': {'B': 1, 'C': 4},
    'B': {'A': 1, 'C': 2, 'D': 5},
    'C': {'A': 4, 'B': 2, 'D': 1},
    'D': {'B': 5, 'C': 1}
}
print(f"Shortest distances from A: {dijkstra(graph, 'A')}")`
      },
      {
        id: "knapsack-py",
        name: "DP Knapsack (0/1)",
        category: "DSA",
        code: `def knapsack(weights, values, capacity):
    n = len(weights)
    dp = [[0 for _ in range(capacity + 1)] for _ in range(n + 1)]
    
    for i in range(1, n + 1):
        for w in range(1, capacity + 1):
            if weights[i-1] <= w:
                dp[i][w] = max(values[i-1] + dp[i-1][w-weights[i-1]], dp[i-1][w])
            else:
                dp[i][w] = dp[i-1][w]
    return dp[n][capacity]

# Example
weights = [1, 2, 3]
values = [10, 15, 40]
cap = 6
print(f"Max Value: {knapsack(weights, values, cap)}")`
      },
      {
        id: "two-pointers-py",
        name: "Two Pointers (Sum)",
        category: "DSA",
        code: `def has_sum(arr, target):
    arr.sort()
    left, right = 0, len(arr) - 1
    
    while left < right:
        curr = arr[left] + arr[right]
        if curr == target:
            return True, (arr[left], arr[right])
        elif curr < target:
            left += 1
        else:
            right -= 1
    return False

# Example
data = [10, 20, 35, 50, 75, 80]
print(f"Sum 85 exists: {has_sum(data, 85)}")`
      },
      {
        id: "sliding-window-py",
        name: "Sliding Window (Max Sum)",
        category: "DSA",
        code: `def max_sum_subarray(arr, k):
    if len(arr) < k:
        return 0
    
    window_sum = sum(arr[:k])
    max_sum = window_sum
    
    for i in range(len(arr) - k):
        window_sum = window_sum - arr[i] + arr[i+k]
        max_sum = max(max_sum, window_sum)
    return max_sum

# Example
data = [2, 1, 5, 1, 3, 2]
print(f"Max sum of window size 3: {max_sum_subarray(data, 3)}")`
      },
      {
        id: "dsu-py",
        name: "Union Find (DSU)",
        category: "DSA",
        code: `class DSU:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n
        
    def find(self, i):
        if self.parent[i] == i:
            return i
        self.parent[i] = self.find(self.parent[i])
        return self.parent[i]
        
    def union(self, i, j):
        root_i = self.find(i)
        root_j = self.find(j)
        if root_i != root_j:
            if self.rank[root_i] < self.rank[root_j]:
                self.parent[root_i] = root_j
            elif self.rank[root_i] > self.rank[root_j]:
                self.parent[root_j] = root_i
            else:
                self.parent[root_i] = root_j
                self.rank[root_j] += 1
            return True
        return False

# Example
dsu = DSU(5)
dsu.union(0, 2)
dsu.union(4, 2)
print(f"0 and 4 connected: {dsu.find(0) == dsu.find(4)}")`
      }
    ],
    ml: [
      {
        id: "lin-reg-py",
        name: "Linear Regression (Scratch)",
        category: "ML",
        code: `import numpy as np

# Simple implementation of Gradient Descent for Linear Regression
X = 2 * np.random.rand(100, 1)
y = 4 + 3 * X + np.random.randn(100, 1)

# Add bias term (x0 = 1)
X_b = np.c_[np.ones((100, 1)), X]

# Hyperparameters
eta = 0.1  # learning rate
n_iterations = 1000
m = 100

theta = np.random.randn(2, 1)  # random init

for iteration in range(n_iterations):
    gradients = 2/m * X_b.T.dot(X_b.dot(theta) - y)
    theta = theta - eta * gradients

print(f"Result (Intercept, Slope):\\n{theta}")`
      },
      {
        id: "kmeans-py",
        name: "K-Means Clustering",
        category: "ML",
        code: `import numpy as np

def kmeans(X, k, max_iters=100):
    # 1. Random centroids
    centroids = X[np.random.choice(X.shape[0], k, replace=False)]
    
    for _ in range(max_iters):
        # 2. Assignment
        distances = np.linalg.norm(X[:, np.newaxis] - centroids, axis=2)
        labels = np.argmin(distances, axis=1)
        
        # 3. Update
        new_centroids = np.array([X[labels == i].mean(axis=0) for i in range(k)])
        
        if np.all(centroids == new_centroids):
            break
        centroids = new_centroids
        
    return centroids, labels

# Generate dummy data
data = np.random.rand(50, 2)
centroids, labels = kmeans(data, 3)
print(f"Centroids:\\n{centroids}")`
      },
      {
        id: "gradient-descent-py",
        name: "Gradient Descent (Basic)",
        category: "ML",
        code: `def gradient_descent(f, df, start, lr=0.1, iters=50):
    x = start
    for i in range(iters):
        x = x - lr * df(x)
        print(f"Iter {i+1}: f({x:.4f}) = {f(x):.4f}")
    return x

# Example: minimize f(x) = x^2
f = lambda x: x**2
df = lambda x: 2*x

gradient_descent(f, df, start=10)`
      },
      {
        id: "neural-net-py",
        name: "NN Forward Pass",
        category: "ML",
        code: `import numpy as np

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

# Simple 3-layer network
input_size = 2
hidden_size = 3
output_size = 1

W1 = np.random.rand(input_size, hidden_size)
B1 = np.zeros(hidden_size)
W2 = np.random.rand(hidden_size, output_size)
B2 = np.zeros(output_size)

def forward(x):
    z1 = x.dot(W1) + B1
    a1 = sigmoid(z1)
    z2 = a1.dot(W2) + B2
    return sigmoid(z2)

x = np.array([0.5, 0.1])
print(f"Output: {forward(x)}")`
      },
      {
        id: "cosine-sim-py",
        name: "Cosine Similarity",
        category: "ML",
        code: `import numpy as np

def cosine_similarity(v1, v2):
    dot_product = np.dot(v1, v2)
    norm_v1 = np.linalg.norm(v1)
    norm_v2 = np.linalg.norm(v2)
    return dot_product / (norm_v1 * norm_v2)

a = np.array([1, 2, 3])
b = np.array([1, 2, 3])
c = np.array([-1, -2, -3])

print(f"Similarity (identical): {cosine_similarity(a, b):.4f}")
print(f"Similarity (opposite): {cosine_similarity(a, c):.4f}")`
      }
    ]
  },
  javascript: {
    dsa: [
      {
        id: "binary-search-js",
        name: "Binary Search",
        category: "DSA",
        code: `function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;
  
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}

const data = [1, 3, 5, 7, 9, 11];
console.log('Target 7 at index:', binarySearch(data, 7));`
      },
      {
        id: "bfs-js",
        name: "BFS (Iterative)",
        category: "DSA",
        code: `function bfs(graph, start) {
  const queue = [start];
  const visited = new Set([start]);
  const result = [];
  
  while (queue.length > 0) {
    const node = queue.shift();
    result.push(node);
    
    for (const neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return result;
}

const graph = {
  'A': ['B', 'C'],
  'B': ['D', 'E'],
  'C': ['F'],
  'D': [], 'E': [], 'F': []
};
console.log('BFS Order:', bfs(graph, 'A'));`
      },
      {
        id: "dfs-js",
        name: "DFS (Recursive)",
        category: "DSA",
        code: `function dfs(graph, node, visited = new Set()) {
  visited.add(node);
  console.log(node);
  
  for (const neighbor of graph[node] || []) {
    if (!visited.has(neighbor)) {
      dfs(graph, neighbor, visited);
    }
  }
}

const graph = {
  '1': ['2', '3'],
  '2': ['4', '5'],
  '3': [], '4': [], '5': []
};
dfs(graph, '1');`
      },
      {
        id: "merge-sort-js",
        name: "Merge Sort",
        category: "DSA",
        code: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}

const data = [38, 27, 43, 3, 9, 82, 10];
console.log('Sorted:', mergeSort(data));`
      }
    ],
    patterns: [
      {
        id: "debounce-js",
        name: "Debounce",
        category: "Patterns",
        code: `function debounce(fn, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

const log = debounce(() => console.log('Debounced!'), 500);
log(); log(); log(); // Only one log after 500ms`
      },
      {
        id: "throttle-js",
        name: "Throttle",
        category: "Patterns",
        code: `function throttle(fn, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

const log = throttle(() => console.log('Throttled!'), 1000);
setInterval(log, 100); // Logs every 1000ms`
      },
      {
        id: "pubsub-js",
        name: "Event Emitter",
        category: "Patterns",
        code: `class EventEmitter {
  constructor() { this.events = {}; }
  on(event, cb) {
    (this.events[event] = this.events[event] || []).push(cb);
  }
  emit(event, data) {
    (this.events[event] || []).forEach(cb => cb(data));
  }
}

const em = new EventEmitter();
em.on('greet', (name) => console.log('Hello', name));
em.emit('greet', 'AlgoLens Layer');`
      },
      {
        id: "lru-js",
        name: "LRU Cache",
        category: "Patterns",
        code: `class LRUCache {
  constructor(limit) {
    this.limit = limit;
    this.cache = new Map();
  }
  get(key) {
    if (!this.cache.has(key)) return -1;
    const v = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, v);
    return v;
  }
  put(key, value) {
    if (this.cache.has(key)) this.cache.delete(key);
    else if (this.cache.size >= this.limit) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }
}

const lru = new LRUCache(2);
lru.put(1, 'A'); lru.put(2, 'B');
console.log(lru.get(1)); // 'A'
lru.put(3, 'C'); // Evicts 2
console.log(lru.get(2)); // -1`
      },
      {
        id: "promise-all-js",
        name: "Promise.all Polyfill",
        category: "Patterns",
        code: `function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;
    
    promises.forEach((p, i) => {
      Promise.resolve(p).then(val => {
        results[i] = val;
        completed++;
        if (completed === promises.length) resolve(results);
      }).catch(reject);
    });
  });
}

const p1 = Promise.resolve(1);
const p2 = new Promise(res => setTimeout(() => res(2), 500));
promiseAll([p1, p2]).then(console.log); // [1, 2]`
      },
      {
        id: "deep-clone-js",
        name: "Deep Clone",
        category: "Patterns",
        code: `function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  const copy = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    copy[key] = deepClone(obj[key]);
  }
  return copy;
}

const a = { x: 1, y: { z: 2 } };
const b = deepClone(a);
b.y.z = 99;
console.log('Original intact:', a.y.z === 2);`
      },
      {
        id: "flatten-js",
        name: "Flatten Array",
        category: "Patterns",
        code: `function flatten(arr) {
  return arr.reduce((acc, val) => 
    Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val), 
  []);
}

const nested = [1, [2, [3, 4], 5], 6];
console.log(flatten(nested)); // [1, 2, 3, 4, 5, 6]`
      }
    ]
  },
  java: {
    dsa: [
      {
        id: "binary-search-java",
        name: "Binary Search",
        category: "DSA",
        code: `public class Solution {
    public static int binarySearch(int[] arr, int target) {
        int low = 0, high = arr.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (arr[mid] == target) return mid;
            if (arr[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }
}`
      },
      {
        id: "bfs-java",
        name: "BFS with Queue",
        category: "DSA",
        code: `import java.util.*;

public class Graph {
    public void bfs(int start, Map<Integer, List<Integer>> adj) {
        Queue<Integer> queue = new LinkedList<>();
        Set<Integer> visited = new HashSet<>();
        
        queue.add(start);
        visited.add(start);
        
        while (!queue.isEmpty()) {
            int curr = queue.poll();
            System.out.println(curr);
            
            for (int neighbor : adj.getOrDefault(curr, new ArrayList<>())) {
                if (!visited.contains(neighbor)) {
                    visited.add(neighbor);
                    queue.add(neighbor);
                }
            }
        }
    }
}`
      },
      {
        id: "merge-sort-java",
        name: "Merge Sort",
        category: "DSA",
        code: `public class MergeSort {
    public void sort(int[] arr, int l, int r) {
        if (l < r) {
            int m = l + (r - l) / 2;
            sort(arr, l, m);
            sort(arr, m + 1, r);
            merge(arr, l, m, r);
        }
    }
    
    private void merge(int[] arr, int l, int m, int r) {
        // Merge implementation here...
    }
}`
      },
      {
        id: "hashmap-java",
        name: "HashMap Patterns",
        category: "Patterns",
        code: `import java.util.*;

public class MapUsage {
    public void freqCounter(int[] nums) {
        Map<Integer, Integer> counts = new HashMap<>();
        for (int x : nums) {
            counts.put(x, counts.getOrDefault(x, 0) + 1);
        }
        
        for (Map.Entry<Integer, Integer> entry : counts.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
    }
}`
      }
    ]
  },
  cpp: {
    dsa: [
      {
        id: "binary-search-cpp",
        name: "Binary Search",
        category: "DSA",
        code: `#include <vector>
#include <iostream>

int binarySearch(std::vector<int>& arr, int target) {
    int low = 0, high = arr.size() - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`
      },
      {
        id: "bfs-cpp",
        name: "BFS (STL)",
        category: "DSA",
        code: `#include <vector>
#include <queue>
#include <unordered_set>
#include <iostream>

void bfs(int start, std::vector<std::vector<int>>& adj) {
    std::queue<int> q;
    std::unordered_set<int> visited;
    
    q.push(start);
    visited.insert(start);
    
    while (!q.empty()) {
        int curr = q.front();
        q.pop();
        std::cout << curr << " ";
        
        for (int neighbor : adj[curr]) {
            if (visited.find(neighbor) == visited.end()) {
                visited.insert(neighbor);
                q.push(neighbor);
            }
        }
    }
}`
      },
      {
        id: "priority-queue-cpp",
        name: "Min Heap (PQ)",
        category: "DSA",
        code: `#include <queue>
#include <vector>
#include <iostream>

void minHeapExample() {
    std::priority_queue<int, std::vector<int>, std::greater<int>> minHeap;
    
    minHeap.push(10);
    minHeap.push(5);
    minHeap.push(20);
    
    while (!minHeap.empty()) {
        std::cout << minHeap.top() << " ";
        minHeap.pop();
    }
}`
      }
    ]
  }
};
