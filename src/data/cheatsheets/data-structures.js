const dataStructures = {
  id: 'data-structures',
  title: 'Data Structures',
  color: 'violet',
  category: 'Algorithms',
  description: 'Arrays, linked lists, trees, graphs, heaps, and complexity comparison',
  sections: [
    {
      title: 'Arrays',
      items: [
        {
          label: 'Declare and initialize',
          language: 'python',
          code: `# Python
arr = [1, 2, 3, 4, 5]
matrix = [[0] * 3 for _ in range(3)]  # 3x3 grid of zeros`,
        },
        {
          label: 'Access O(1)',
          language: 'python',
          code: `arr = [10, 20, 30, 40]
first = arr[0]   # 10
last  = arr[-1]  # 40  (Python negative index)
arr[2] = 99      # direct write O(1)`,
          note: 'Random access is O(1) because elements are stored in contiguous memory'
        },
        {
          label: 'Insert at end O(1) amortized',
          language: 'python',
          code: `arr = []
arr.append(1)  # O(1) amortized
arr.append(2)
arr.append(3)
# occasional O(n) resize when capacity doubles`,
          note: 'Dynamic arrays double capacity on resize making append O(1) amortized over many calls'
        },
        {
          label: 'Insert in middle O(n)',
          language: 'python',
          code: `arr = [1, 2, 4, 5]
arr.insert(2, 3)  # insert 3 at index 2 - shifts elements right
# [1, 2, 3, 4, 5]
# cost: O(n) because up to n elements must shift`,
        },
        {
          label: 'Delete O(n)',
          language: 'python',
          code: `arr = [1, 2, 3, 4, 5]
arr.pop()      # remove last: O(1)
arr.pop(1)     # remove at index 1: O(n) - shifts elements left
arr.remove(3)  # remove first occurrence of value 3: O(n)`,
        },
        {
          label: 'Search - unsorted O(n) and sorted O(log n)',
          language: 'python',
          code: `import bisect

# unsorted - linear search O(n)
arr = [5, 1, 4, 2, 3]
idx = arr.index(4)  # 2

# sorted - binary search O(log n)
sorted_arr = [1, 2, 3, 4, 5]
pos = bisect.bisect_left(sorted_arr, 4)  # 3`,
        },
        {
          label: '2D array access',
          language: 'python',
          code: `matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]

val = matrix[1][2]  # row 1, col 2 -> 6

# iterate all cells
for row in range(len(matrix)):
  for col in range(len(matrix[0])):
    print(matrix[row][col])`,
        },
      ]
    },
    {
      title: 'Linked Lists',
      items: [
        {
          label: 'Singly linked list node',
          language: 'python',
          code: `class ListNode:
  def __init__(self, val=0, next=None):
    self.val = val
    self.next = next

# build: 1 -> 2 -> 3
head = ListNode(1)
head.next = ListNode(2)
head.next.next = ListNode(3)`,
        },
        {
          label: 'Append and prepend',
          language: 'python',
          code: `# prepend O(1)
def prepend(head, val):
  node = ListNode(val)
  node.next = head
  return node  # new head

# append O(n) - must traverse to tail
def append(head, val):
  if not head:
    return ListNode(val)
  curr = head
  while curr.next:
    curr = curr.next
  curr.next = ListNode(val)
  return head`,
        },
        {
          label: 'Delete a node',
          language: 'python',
          code: `def delete(head, target):
  dummy = ListNode(0)
  dummy.next = head
  prev, curr = dummy, head
  while curr:
    if curr.val == target:
      prev.next = curr.next
      break
    prev, curr = curr, curr.next
  return dummy.next`,
          note: 'Dummy/sentinel node simplifies edge cases like deleting the head'
        },
        {
          label: 'Doubly linked node',
          language: 'python',
          code: `class DListNode:
  def __init__(self, val=0):
    self.val  = val
    self.prev = None
    self.next = None

# insert after a node - O(1)
def insert_after(node, val):
  new_node = DListNode(val)
  new_node.prev = node
  new_node.next = node.next
  if node.next:
    node.next.prev = new_node
  node.next = new_node`,
          note: 'Doubly linked lists allow O(1) delete when you have a reference to the node'
        },
        {
          label: 'Traverse and find O(n)',
          language: 'python',
          code: `def traverse(head):
  curr = head
  while curr:
    print(curr.val)
    curr = curr.next

def find(head, target):
  curr = head
  while curr:
    if curr.val == target:
      return curr
    curr = curr.next
  return None`,
        },
        {
          label: 'Circular linked list detect cycle',
          language: 'python',
          code: `# Floyd's cycle detection - two pointers
def has_cycle(head):
  slow = fast = head
  while fast and fast.next:
    slow = slow.next
    fast = fast.next.next
    if slow is fast:
      return True
  return False`,
          note: "Floyd's tortoise and hare: slow moves 1 step, fast moves 2 - they meet iff cycle exists"
        },
      ]
    },
    {
      title: 'Stacks and Queues',
      items: [
        {
          label: 'Stack - LIFO using list',
          language: 'python',
          code: `stack = []
stack.append(1)   # push O(1)
stack.append(2)
stack.append(3)
top = stack[-1]   # peek O(1)
val = stack.pop() # pop  O(1) -> 3`,
          note: 'Python list append/pop from end is O(1); never pop from index 0 (that is O(n))'
        },
        {
          label: 'Queue - FIFO using deque',
          language: 'python',
          code: `from collections import deque

queue = deque()
queue.append(1)     # enqueue O(1)
queue.append(2)
queue.append(3)
front = queue[0]    # peek O(1)
val   = queue.popleft() # dequeue O(1) -> 1`,
          note: 'Use collections.deque for queues; list.pop(0) is O(n) and should be avoided'
        },
        {
          label: 'Deque - double ended',
          language: 'python',
          code: `from collections import deque

d = deque()
d.appendleft(1)  # push front O(1)
d.append(2)      # push back  O(1)
d.popleft()      # pop front  O(1)
d.pop()          # pop back   O(1)
d.appendleft(0)
d.rotate(1)      # rotate right by 1`,
        },
        {
          label: 'Monotonic stack pattern',
          language: 'python',
          code: `# Next Greater Element pattern
def next_greater(nums):
  result = [-1] * len(nums)
  stack = []  # stores indices
  for i, val in enumerate(nums):
    while stack and nums[stack[-1]] < val:
      idx = stack.pop()
      result[idx] = val
    stack.append(i)
  return result

# [2,1,2,4,3] -> [4,2,4,-1,-1]`,
          note: 'Monotonic stack maintains elements in sorted order; solves next/prev greater/smaller problems'
        },
        {
          label: 'BFS uses queue, DFS uses stack',
          language: 'python',
          code: `from collections import deque

# BFS - level order traversal
def bfs(graph, start):
  visited = {start}
  queue = deque([start])
  while queue:
    node = queue.popleft()
    for neighbor in graph[node]:
      if neighbor not in visited:
        visited.add(neighbor)
        queue.append(neighbor)

# DFS - depth first
def dfs(graph, start, visited=None):
  if visited is None: visited = set()
  visited.add(start)
  for neighbor in graph[start]:
    if neighbor not in visited:
      dfs(graph, neighbor, visited)`,
        },
        {
          label: 'Circular queue (ring buffer)',
          language: 'python',
          code: `class CircularQueue:
  def __init__(self, k):
    self.data  = [0] * k
    self.head  = 0
    self.tail  = -1
    self.size  = 0
    self.cap   = k

  def enqueue(self, val):
    if self.size == self.cap: return False
    self.tail = (self.tail + 1) % self.cap
    self.data[self.tail] = val
    self.size += 1
    return True

  def dequeue(self):
    if self.size == 0: return False
    self.head = (self.head + 1) % self.cap
    self.size -= 1
    return True`,
          note: 'Circular queue avoids O(n) shifts by wrapping indices with modulo arithmetic'
        },
      ]
    },
    {
      title: 'Hash Maps',
      items: [
        {
          label: 'Python dict and JS Map basics',
          language: 'python',
          code: `# Python dict
freq = {}
freq["apple"] = freq.get("apple", 0) + 1
del freq["apple"]
"apple" in freq  # containment check O(1) avg`,
        },
        {
          label: 'JavaScript Map',
          language: 'javascript',
          code: `const map = new Map();
map.set("key", 42);
map.get("key");          // 42
map.has("key");          // true
map.delete("key");
map.size;                // current count

// iterate entries
for (const [key, val] of map) {
  console.log(key, val);
}`,
          note: 'JS Map preserves insertion order and allows any value as a key (not just strings)'
        },
        {
          label: 'Hash function and separate chaining (concept)',
          language: 'python',
          code: `class HashMap:
  def __init__(self, capacity=16):
    self.capacity = capacity
    self.buckets  = [[] for _ in range(capacity)]

  def _hash(self, key):
    return hash(key) % self.capacity

  def put(self, key, val):
    b = self.buckets[self._hash(key)]
    for i, (k, v) in enumerate(b):
      if k == key:
        b[i] = (key, val)
        return
    b.append((key, val))  # chain via list`,
          note: 'Separate chaining stores collisions in a linked list or array at each bucket'
        },
        {
          label: 'Open addressing - linear probing (concept)',
          language: 'python',
          code: `class OpenHashMap:
  def __init__(self, capacity=16):
    self.capacity = capacity
    self.keys   = [None] * capacity
    self.values = [None] * capacity

  def put(self, key, val):
    idx = hash(key) % self.capacity
    while self.keys[idx] is not None and self.keys[idx] != key:
      idx = (idx + 1) % self.capacity  # probe next slot
    self.keys[idx]   = key
    self.values[idx] = val`,
          note: 'Linear probing finds the next open slot; causes clustering at high load factors'
        },
        {
          label: 'Load factor and resize',
          language: 'python',
          code: `# load factor = n / capacity
# Python dict resizes at ~2/3 load (approx 0.67)
# Java HashMap resizes at 0.75 load factor

# When load factor is exceeded:
# 1. Allocate new array (typically 2x size)
# 2. Rehash all existing keys into new array
# Resize is O(n) but amortized O(1) per insertion`,
          note: 'Higher load factor saves memory but increases collision probability and lookup time'
        },
        {
          label: 'Common patterns using hash map',
          language: 'python',
          code: `# frequency count
from collections import Counter
freq = Counter(["a", "b", "a", "c", "b", "a"])
# Counter({'a': 3, 'b': 2, 'c': 1})

# two-sum O(n)
def two_sum(nums, target):
  seen = {}
  for i, n in enumerate(nums):
    complement = target - n
    if complement in seen:
      return [seen[complement], i]
    seen[n] = i`,
        },
      ]
    },
    {
      title: 'Trees',
      items: [
        {
          label: 'Tree terminology',
          language: 'python',
          code: `# root     : top node with no parent
# leaf     : node with no children
# height   : longest path from node to a leaf
# depth    : distance from root to node
# BST      : left child < parent < right child

class TreeNode:
  def __init__(self, val=0, left=None, right=None):
    self.val   = val
    self.left  = left
    self.right = right`,
        },
        {
          label: 'BST insert and search',
          language: 'python',
          code: `def bst_insert(root, val):
  if not root:
    return TreeNode(val)
  if val < root.val:
    root.left  = bst_insert(root.left, val)
  else:
    root.right = bst_insert(root.right, val)
  return root

def bst_search(root, val):
  if not root or root.val == val:
    return root
  if val < root.val:
    return bst_search(root.left, val)
  return bst_search(root.right, val)`,
          note: 'BST search/insert is O(log n) on a balanced tree but degrades to O(n) when skewed'
        },
        {
          label: 'Inorder, preorder, postorder traversal',
          language: 'python',
          code: `def inorder(root):    # left -> root -> right  (sorted order for BST)
  if not root: return []
  return inorder(root.left) + [root.val] + inorder(root.right)

def preorder(root):   # root -> left -> right  (copy tree)
  if not root: return []
  return [root.val] + preorder(root.left) + preorder(root.right)

def postorder(root):  # left -> right -> root  (delete tree)
  if not root: return []
  return postorder(root.left) + postorder(root.right) + [root.val]`,
        },
        {
          label: 'BFS level order traversal',
          language: 'python',
          code: `from collections import deque

def level_order(root):
  if not root: return []
  result, queue = [], deque([root])
  while queue:
    level = []
    for _ in range(len(queue)):
      node = queue.popleft()
      level.append(node.val)
      if node.left:  queue.append(node.left)
      if node.right: queue.append(node.right)
    result.append(level)
  return result`,
        },
        {
          label: 'Check if tree is balanced',
          language: 'python',
          code: `def is_balanced(root):
  def height(node):
    if not node: return 0
    lh = height(node.left)
    rh = height(node.right)
    if lh == -1 or rh == -1 or abs(lh - rh) > 1:
      return -1  # signal unbalanced
    return 1 + max(lh, rh)
  return height(root) != -1`,
          note: 'A balanced tree has height O(log n) which keeps BST operations at O(log n)'
        },
        {
          label: 'AVL rotations concept',
          language: 'python',
          code: `# AVL trees self-balance by rotating after insert/delete
# Balance factor = height(left) - height(right)
# Rebalance when balance factor is not in {-1, 0, 1}

# Right rotation (fixes left-heavy)
def rotate_right(y):
  x   = y.left
  T2  = x.right
  x.right = y
  y.left  = T2
  return x  # new root

# Left rotation (fixes right-heavy)
def rotate_left(x):
  y   = x.right
  T2  = y.left
  y.left  = x
  x.right = T2
  return y  # new root`,
          note: 'AVL guarantees O(log n) for all operations; Red-Black trees are used in most language stdlib implementations'
        },
      ]
    },
    {
      title: 'Heaps',
      items: [
        {
          label: 'Min-heap and max-heap property',
          language: 'python',
          code: `# Min-heap: parent <= children  (root = smallest)
# Max-heap: parent >= children  (root = largest)
# Stored as array: parent of i is (i-1)//2
#                  children of i are 2*i+1 and 2*i+2

import heapq

# Python heapq is a MIN-heap
heap = []
heapq.heappush(heap, 3)
heapq.heappush(heap, 1)
heapq.heappush(heap, 2)
heap[0]  # peek min: 1 (no pop)`,
        },
        {
          label: 'heappush and heappop O(log n)',
          language: 'python',
          code: `import heapq

heap = []
heapq.heappush(heap, 5)
heapq.heappush(heap, 1)
heapq.heappush(heap, 3)

min_val = heapq.heappop(heap)   # 1
min_val = heapq.heappop(heap)   # 3

# push and pop in one call (more efficient)
heapq.heappushpop(heap, 0)      # push 0, pop and return min`,
        },
        {
          label: 'heapify O(n)',
          language: 'python',
          code: `import heapq

nums = [5, 3, 8, 1, 4, 2]
heapq.heapify(nums)  # transforms list into heap in-place O(n)
# nums is now a valid heap: [1, 3, 2, 5, 4, 8]`,
          note: 'heapify is O(n) - faster than pushing n elements one by one which is O(n log n)'
        },
        {
          label: 'Max-heap using negation',
          language: 'python',
          code: `import heapq

nums = [5, 3, 8, 1, 4]
max_heap = [-n for n in nums]
heapq.heapify(max_heap)

max_val = -heapq.heappop(max_heap)  # 8
heapq.heappush(max_heap, -10)       # push 10
max_val = -max_heap[0]              # peek: 10`,
          note: 'Python has no built-in max-heap; negate values to simulate one with heapq'
        },
        {
          label: 'K-th largest element pattern',
          language: 'python',
          code: `import heapq

def find_kth_largest(nums, k):
  # maintain a min-heap of size k
  heap = nums[:k]
  heapq.heapify(heap)
  for n in nums[k:]:
    if n > heap[0]:
      heapq.heapreplace(heap, n)  # pop min, push n
  return heap[0]  # kth largest

# find_kth_largest([3,2,1,5,6,4], 2) -> 5`,
          note: 'Min-heap of size k keeps track of top-k elements; root is always the kth largest'
        },
        {
          label: 'Heap sort',
          language: 'python',
          code: `import heapq

def heap_sort(arr):
  heapq.heapify(arr)           # O(n)
  return [heapq.heappop(arr)   # O(log n) each
          for _ in range(len(arr))]  # total O(n log n)

# heap_sort([3,1,4,1,5,9,2]) -> [1,1,2,3,4,5,9]`,
        },
      ]
    },
    {
      title: 'Graphs',
      items: [
        {
          label: 'Adjacency list vs adjacency matrix',
          language: 'python',
          code: `# Adjacency list - preferred for sparse graphs
graph = {
  0: [1, 2],
  1: [0, 3],
  2: [0],
  3: [1]
}
# Space: O(V + E)  |  Edge check: O(degree)

# Adjacency matrix - preferred for dense graphs
# V=4 nodes
matrix = [
  [0, 1, 1, 0],  # node 0 connects to 1, 2
  [1, 0, 0, 1],  # node 1 connects to 0, 3
  [1, 0, 0, 0],
  [0, 1, 0, 0],
]
# Space: O(V^2)  |  Edge check: O(1)`,
        },
        {
          label: 'BFS shortest path (unweighted)',
          language: 'python',
          code: `from collections import deque

def bfs_shortest_path(graph, start, end):
  queue   = deque([(start, [start])])
  visited = {start}
  while queue:
    node, path = queue.popleft()
    if node == end:
      return path
    for neighbor in graph[node]:
      if neighbor not in visited:
        visited.add(neighbor)
        queue.append((neighbor, path + [neighbor]))
  return None  # no path found`,
          note: 'BFS guarantees shortest path in unweighted graphs because it explores level by level'
        },
        {
          label: 'DFS with visited set',
          language: 'python',
          code: `def dfs(graph, node, visited=None):
  if visited is None:
    visited = set()
  visited.add(node)
  print(node)
  for neighbor in graph[node]:
    if neighbor not in visited:
      dfs(graph, neighbor, visited)
  return visited`,
        },
        {
          label: 'Cycle detection (directed graph)',
          language: 'python',
          code: `def has_cycle(graph, n):
  WHITE, GRAY, BLACK = 0, 1, 2
  color = [WHITE] * n

  def dfs(node):
    color[node] = GRAY  # in current path
    for neighbor in graph.get(node, []):
      if color[neighbor] == GRAY:   # back edge = cycle
        return True
      if color[neighbor] == WHITE and dfs(neighbor):
        return True
    color[node] = BLACK  # fully processed
    return False

  return any(dfs(i) for i in range(n) if color[i] == WHITE)`,
          note: 'GRAY means node is in the current DFS path; a back edge to GRAY node means cycle'
        },
        {
          label: 'Topological sort (Kahn\'s BFS)',
          language: 'python',
          code: `from collections import deque

def topo_sort(n, edges):
  graph   = [[] for _ in range(n)]
  in_deg  = [0] * n
  for u, v in edges:
    graph[u].append(v)
    in_deg[v] += 1

  queue  = deque(i for i in range(n) if in_deg[i] == 0)
  order  = []
  while queue:
    node = queue.popleft()
    order.append(node)
    for neighbor in graph[node]:
      in_deg[neighbor] -= 1
      if in_deg[neighbor] == 0:
        queue.append(neighbor)
  return order if len(order) == n else []  # empty = cycle`,
          note: 'Topological sort only exists for Directed Acyclic Graphs (DAGs)'
        },
        {
          label: 'Union-Find (Disjoint Set Union)',
          language: 'python',
          code: `class UnionFind:
  def __init__(self, n):
    self.parent = list(range(n))
    self.rank   = [0] * n

  def find(self, x):          # path compression
    if self.parent[x] != x:
      self.parent[x] = self.find(self.parent[x])
    return self.parent[x]

  def union(self, x, y):      # union by rank
    px, py = self.find(x), self.find(y)
    if px == py: return False
    if self.rank[px] < self.rank[py]: px, py = py, px
    self.parent[py] = px
    if self.rank[px] == self.rank[py]: self.rank[px] += 1
    return True`,
          note: 'With path compression and union by rank, find/union is nearly O(1) amortized'
        },
      ]
    },
    {
      title: 'Tries',
      items: [
        {
          label: 'Trie node and structure',
          language: 'python',
          code: `class TrieNode:
  def __init__(self):
    self.children = {}   # char -> TrieNode
    self.is_end   = False

class Trie:
  def __init__(self):
    self.root = TrieNode()`,
          note: 'Each node stores a dict of children; is_end marks a complete word boundary'
        },
        {
          label: 'Insert O(m)',
          language: 'python',
          code: `def insert(self, word):
  node = self.root
  for char in word:
    if char not in node.children:
      node.children[char] = TrieNode()
    node = node.children[char]
  node.is_end = True

# trie.insert("apple")
# trie.insert("app")`,
          note: 'm is the length of the word; each character creates or traverses one node'
        },
        {
          label: 'Search O(m)',
          language: 'python',
          code: `def search(self, word):
  node = self.root
  for char in word:
    if char not in node.children:
      return False
    node = node.children[char]
  return node.is_end  # must be complete word

def starts_with(self, prefix):
  node = self.root
  for char in prefix:
    if char not in node.children:
      return False
    node = node.children[char]
  return True`,
        },
        {
          label: 'Use cases',
          language: 'python',
          code: `# Autocomplete: find all words with a given prefix
# Spell checking: check if word exists in dictionary
# IP routing: longest prefix matching
# Word games: Boggle, word search
# Search engine indexing

# Example: collect all words with prefix
def autocomplete(self, prefix):
  node = self.root
  for char in prefix:
    if char not in node.children: return []
    node = node.children[char]
  results = []
  self._dfs(node, prefix, results)
  return results

def _dfs(self, node, current, results):
  if node.is_end: results.append(current)
  for char, child in node.children.items():
    self._dfs(child, current + char, results)`,
        },
        {
          label: 'Compressed trie (space optimization)',
          language: 'python',
          code: `# Standard trie: one node per character
# Compressed trie (Patricia/Radix trie): merge single-child chains

class CompressedNode:
  def __init__(self):
    self.children = {}   # string -> CompressedNode (not just char)
    self.is_end   = False

# "flower", "flow", "flight" stored compactly:
# root -> "fl" -> "ow" -> (is_end=True, "er" -> is_end=True)
#              -> "ight" -> is_end=True
# Reduces node count from O(total chars) to O(words)`,
          note: 'Compressed tries reduce memory from O(alphabet * total_chars) to O(alphabet * words)'
        },
        {
          label: 'Word search on grid using trie',
          language: 'python',
          code: `# Given a board and list of words, find all words present
# Build trie from word list, then DFS on board

def find_words(board, words):
  trie = Trie()
  for w in words: trie.insert(w)

  rows, cols = len(board), len(board[0])
  found = set()

  def dfs(node, r, c, path):
    ch = board[r][c]
    if ch not in node.children: return
    next_node = node.children[ch]
    path += ch
    if next_node.is_end: found.add(path)
    board[r][c] = "#"  # mark visited
    for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:
      nr, nc = r+dr, c+dc
      if 0 <= nr < rows and 0 <= nc < cols:
        dfs(next_node, nr, nc, path)
    board[r][c] = ch  # restore

  for r in range(rows):
    for c in range(cols):
      dfs(trie.root, r, c, "")
  return list(found)`,
        },
      ]
    },
    {
      title: 'Complexity Comparison',
      items: [
        {
          label: 'Big-O complexity table',
          language: 'python',
          code: `# Data Structure  | Access   | Search   | Insert   | Delete
# ----------------+-----------+----------+----------+-----------
# Array           | O(1)      | O(n)     | O(n)     | O(n)
# Dynamic Array   | O(1)      | O(n)     | O(1)*    | O(n)
# Linked List     | O(n)      | O(n)     | O(1)**   | O(1)**
# Stack           | O(n)      | O(n)     | O(1)     | O(1)
# Queue           | O(n)      | O(n)     | O(1)     | O(1)
# Hash Map        | N/A       | O(1)avg  | O(1)avg  | O(1)avg
# BST (balanced)  | O(log n)  | O(log n) | O(log n) | O(log n)
# Heap            | O(n)***   | O(n)     | O(log n) | O(log n)
# Trie            | O(m)      | O(m)     | O(m)     | O(m)
#
# * amortized  ** with reference to node  *** O(1) for min/max only
# m = length of string/key`,
        },
        {
          label: 'Space complexity comparison',
          language: 'python',
          code: `# Data Structure  | Space
# ----------------+------------------
# Array           | O(n)
# Linked List     | O(n) + pointer overhead
# Hash Map        | O(n) - degrades with collisions
# BST             | O(n)
# Heap            | O(n) - array-backed
# Trie            | O(alphabet * total_chars) worst case
# Graph adj list  | O(V + E)
# Graph adj matrix| O(V^2)`,
        },
        {
          label: 'Sorting algorithm complexity',
          language: 'python',
          code: `# Algorithm    | Best     | Average  | Worst    | Space  | Stable
# -------------+----------+----------+----------+--------+-------
# Bubble Sort  | O(n)     | O(n^2)   | O(n^2)   | O(1)   | Yes
# Selection    | O(n^2)   | O(n^2)   | O(n^2)   | O(1)   | No
# Insertion    | O(n)     | O(n^2)   | O(n^2)   | O(1)   | Yes
# Merge Sort   | O(nlogn) | O(nlogn) | O(nlogn) | O(n)   | Yes
# Quick Sort   | O(nlogn) | O(nlogn) | O(n^2)   | O(logn)| No
# Heap Sort    | O(nlogn) | O(nlogn) | O(nlogn) | O(1)   | No
# Counting Sort| O(n+k)   | O(n+k)   | O(n+k)   | O(k)   | Yes
# Radix Sort   | O(nk)    | O(nk)    | O(nk)    | O(n+k) | Yes`,
        },
      ]
    },
    {
      title: 'When To Use What',
      items: [
        {
          label: 'Fast lookup by key',
          language: 'python',
          code: `# Use: Hash Map (dict / Map)
# O(1) average get/set/delete
# Examples: word frequency, two-sum, caching, grouping

freq = {}
for word in text.split():
  freq[word] = freq.get(word, 0) + 1`,
          note: 'Default choice when you need key-value lookup; fall back to sorted map only when order matters'
        },
        {
          label: 'Ordered / sorted data',
          language: 'python',
          code: `# Use: Sorted Array (for static data) or BST (for dynamic)
# Sorted array: O(log n) search via binary search, O(n) insert
# BST/SortedList: O(log n) insert/search/delete

import bisect
arr = [1, 3, 5, 7, 9]
bisect.insort(arr, 4)  # [1, 3, 4, 5, 7, 9] - maintains sorted order`,
        },
        {
          label: 'LIFO - last in first out',
          language: 'python',
          code: `# Use: Stack (list or deque)
# Problems: balanced parentheses, undo/redo, DFS, backtracking,
#           monotonic stack (next greater element), call stack simulation

stack = []
for ch in "(()())":
  if ch == "(":
    stack.append(ch)
  elif stack:
    stack.pop()
is_balanced = len(stack) == 0`,
        },
        {
          label: 'FIFO - first in first out',
          language: 'python',
          code: `# Use: Queue (collections.deque)
# Problems: BFS shortest path, level order traversal, task scheduling,
#           sliding window, producer-consumer

from collections import deque
queue = deque()
# BFS skeleton
queue.append(start_node)
while queue:
  node = queue.popleft()
  for neighbor in graph[node]:
    queue.append(neighbor)`,
        },
        {
          label: 'Prefix matching / autocomplete',
          language: 'python',
          code: `# Use: Trie
# Problems: autocomplete, spell check, word search,
#           IP routing (longest prefix match)

# Alternative: sorted list + binary search for simple prefix checks
import bisect
words = sorted(["apple", "app", "application", "apt"])
prefix = "app"
lo = bisect.bisect_left(words, prefix)
hi = bisect.bisect_left(words, prefix[:-1] + chr(ord(prefix[-1])+1))
matches = words[lo:hi]  # ["app", "apple", "application"]`,
        },
        {
          label: 'Priority / scheduling',
          language: 'python',
          code: `# Use: Heap (heapq) / Priority Queue
# Problems: k-th largest/smallest, merge k sorted lists,
#           task scheduling, Dijkstra's algorithm, Huffman coding

import heapq

# Always process shortest job next
tasks = [(3, "long"), (1, "quick"), (2, "medium")]
heapq.heapify(tasks)
while tasks:
  duration, name = heapq.heappop(tasks)
  print(f"Processing: {name} ({duration}s)")`,
          note: 'Use a heap any time you need the min or max element after each insert or delete'
        },
        {
          label: 'Graph connectivity',
          language: 'python',
          code: `# Adjacency list for most graph problems
# Union-Find for dynamic connectivity / number of components

# When to use each:
# BFS/DFS on adj list : path existence, shortest path, cycle detection
# Dijkstra on adj list : weighted shortest path (non-negative)
# Union-Find           : number of connected components, detect cycle in undirected
# Topological sort     : ordering with dependencies (course schedule, build order)`,
        },
      ]
    },
  ]
}

export default dataStructures
