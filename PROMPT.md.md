# AlgoLens — Full Build Prompt

## Product Vision

Build **AlgoLens**, a fast-acquisition learning platform for developers who can already read code but want to deeply understand CS and ML concepts through visual intuition and targeted micro-exercises. The target user is an intermediate-to-advanced developer who finds traditional learning platforms (LeetCode, Coursera, Khan Academy) too slow, too shallow, or too disconnected from actual implementation.

The platform must support **200+ concepts** across Data Structures & Algorithms (DSA) and Machine Learning (ML), structured for speed — each concept should be graspable in under 5 minutes.

---

## Core Learning Loop (Per Concept)

Every concept follows this exact 3-step loop. Do not deviate.

```
1. CARD      → Instant intuition: one-line summary, complexity, when-to-use
2. VISUAL    → Interactive step-through visualization with annotations
3. EXERCISE  → One micro-exercise: fill-in, identify, or spot-the-bug. Max 2 min.
```

There is no step 4. No long-form reading. No videos. No 10-question quizzes.

---

## Tech Stack

### Frontend
- **Framework**: React (Vite)
- **Styling**: Tailwind CSS
- **Animations & Visualizations**: D3.js (primary) + Framer Motion (UI transitions)
- **Code Editor**: Monaco Editor (same as VS Code)
- **Code Execution**: Pyodide (Python in WASM) + Judge0 API fallback for multi-language
- **Routing**: React Router v6
- **State**: Zustand

### Backend (optional for v1, use JSON files first)
- **API**: FastAPI or Next.js API routes
- **Database**: SQLite (local) → PostgreSQL (production)
- **Auth**: Clerk or Supabase Auth

### AI Layer (optional, activate per concept)
- **Hint engine**: Anthropic Claude API (claude-sonnet-4-20250514)
- Triggered only when user requests a hint or fails an exercise twice

---

## Data Model

### Concept Schema

Every concept is a JSON object with this shape:

```json
{
  "id": "bfs-01",
  "slug": "breadth-first-search",
  "title": "Breadth-First Search",
  "domain": "DSA",
  "category": "Graph Traversal",
  "difficulty": "intermediate",
  "card": {
    "intuition": "Explore all neighbors before going deeper — like ripples in water.",
    "analogy": "You're searching a building floor-by-floor, not room-by-room.",
    "time_complexity": "O(V + E)",
    "space_complexity": "O(V)",
    "when_to_use": ["Shortest path in unweighted graph", "Level-order traversal", "Connected components"],
    "gotchas": ["Requires a visited set to avoid infinite loops", "Not suitable for weighted graphs — use Dijkstra instead"]
  },
  "visualization": {
    "type": "graph-traversal",
    "config": {
      "nodes": 8,
      "directed": false,
      "weighted": false,
      "step_annotations": true
    }
  },
  "exercise": {
    "type": "fill-in-the-blank",
    "prompt": "Complete the BFS implementation below:",
    "starter_code": "from collections import deque\n\ndef bfs(graph, start):\n    visited = set()\n    queue = deque([start])\n    visited.add(start)\n    while queue:\n        node = ___________\n        for neighbor in graph[node]:\n            if neighbor not in visited:\n                ___________\n                ___________",
    "solution": "node = queue.popleft()\n# inside loop:\nvisited.add(neighbor)\nqueue.append(neighbor)",
    "hints": ["A queue is FIFO — use popleft(), not pop()", "Mark visited BEFORE adding to queue, not after"]
  },
  "related": ["dfs-01", "dijkstra-01", "topological-sort-01"],
  "tags": ["graph", "traversal", "queue", "BFS"]
}
```

### Domain Structure

Organize all 200+ concepts into this hierarchy:

```
DSA (120+ concepts)
├── Arrays & Strings (15)
│   ├── Two Pointers, Sliding Window, Prefix Sum, Kadane's Algorithm,
│       Boyer-Moore Voting, Dutch National Flag, Rabin-Karp, Z-Algorithm,
│       KMP, Manacher's, String Hashing, Trie, Suffix Array, Suffix Tree,
│       Aho-Corasick
│
├── Linked Lists (8)
│   ├── Fast & Slow Pointers, Reverse, Merge, Cycle Detection,
│       LRU Cache, Skip List, XOR Linked List, Doubly Linked List
│
├── Stacks & Queues (8)
│   ├── Monotonic Stack, Monotonic Queue, Min Stack, Deque,
│       Expression Evaluation, Next Greater Element, Sliding Window Max,
│       Priority Queue
│
├── Trees (18)
│   ├── BFS, DFS (pre/in/post), Morris Traversal, BST Operations,
│       AVL Tree, Red-Black Tree, Segment Tree, Fenwick Tree (BIT),
│       Trie, B-Tree, Lowest Common Ancestor, Diameter, Tree DP,
│       Euler Tour, Heavy-Light Decomposition, Centroid Decomposition,
│       Treap, Splay Tree
│
├── Graphs (20)
│   ├── BFS, DFS, Dijkstra, Bellman-Ford, Floyd-Warshall, A*,
│       Prim's, Kruskal's, Union-Find (DSU), Topological Sort (Kahn's + DFS),
│       Tarjan's SCC, Kosaraju's, Bridges & Articulation Points,
│       Bipartite Check, Cycle Detection (directed/undirected),
│       Euler Path/Circuit, Hamilton Path, Network Flow (Ford-Fulkerson),
│       Bipartite Matching, Johnson's Algorithm
│
├── Sorting & Searching (12)
│   ├── Bubble, Selection, Insertion, Merge, Quick, Heap, Counting,
│       Radix, Bucket, Tim Sort, Binary Search (variants), Ternary Search
│
├── Dynamic Programming (20)
│   ├── Memoization vs Tabulation, Knapsack (0/1, unbounded, fractional),
│       LCS, LIS, Edit Distance, Matrix Chain, Coin Change,
│       Subset Sum, Palindrome DP, Bitmask DP, Digit DP,
│       Interval DP, Tree DP, DP on Graphs, Divide & Conquer DP,
│       Convex Hull Trick, SOS DP, Profile DP, Broken Profile DP,
│       Sprague-Grundy
│
├── Hashing (6)
│   ├── Hash Table Internals, Open Addressing, Chaining,
│       Rolling Hash, Consistent Hashing, Bloom Filter
│
├── Heaps (5)
│   ├── Max/Min Heap, Heap Operations, Heapify, k-way Merge,
│       Fibonacci Heap
│
└── Advanced (8)
    ├── Disjoint Set Union (DSU), Sparse Table, Square Root Decomposition,
        Mo's Algorithm, CDQ Divide & Conquer, Persistent Segment Tree,
        Li Chao Tree, Kinetic Heaps

ML (80+ concepts)
├── Foundations (10)
│   ├── Gradient Descent (batch/mini/stochastic), Backpropagation,
│       Chain Rule in ML, Loss Functions, Regularization (L1/L2),
│       Bias-Variance Tradeoff, Cross-Validation, Overfitting/Underfitting,
│       Feature Scaling, Learning Rate Scheduling
│
├── Classical ML (20)
│   ├── Linear Regression, Logistic Regression, SVM (linear + kernel),
│       Decision Tree (ID3/CART), Random Forest, Gradient Boosting (GBM),
│       XGBoost, LightGBM, AdaBoost, Naive Bayes, k-NN,
│       k-Means, DBSCAN, Hierarchical Clustering, GMM + EM,
│       PCA, t-SNE, UMAP, Isolation Forest, One-Class SVM
│
├── Neural Networks (20)
│   ├── Perceptron, MLP, Activation Functions, Weight Init,
│       Batch Norm, Dropout, CNN (conv, pooling, stride, padding),
│       RNN, LSTM, GRU, Seq2Seq, Attention Mechanism,
│       Transformer (self-attention, positional encoding, encoder/decoder),
│       BERT (masked LM, NSP), GPT (causal LM), Embeddings,
│       Word2Vec (CBOW + Skip-gram), GAN, VAE, Diffusion Models
│
├── Reinforcement Learning (10)
│   ├── Markov Decision Process, Bellman Equation, Q-Learning,
│       Deep Q-Network, Policy Gradient, Actor-Critic, PPO,
│       Monte Carlo Tree Search, Multi-armed Bandit, Thompson Sampling
│
├── Optimization & Theory (10)
│   ├── SGD Variants (Adam, RMSProp, AdaGrad, Nadam),
│       Convex vs Non-Convex, Saddle Points, Vanishing/Exploding Gradients,
│       Curse of Dimensionality, No Free Lunch Theorem,
│       VC Dimension, PAC Learning, Information Gain, Entropy
│
└── Applied ML (10)
    ├── RAG (Retrieval-Augmented Generation), Vector Embeddings & FAISS,
        Fine-tuning vs Prompting, RLHF, Mixture of Experts,
        Knowledge Distillation, Quantization, Pruning,
        Transfer Learning, Few-shot vs Zero-shot
```

---

## Visualization Engine

### Visualization Types

Build these visualization primitives. Each is a reusable React component.

| Type | Used For |
|------|----------|
| `GraphCanvas` | BFS, DFS, Dijkstra, all graph algorithms |
| `ArrayBars` | Sorting algorithms — animated bar chart |
| `ArrayPointers` | Two pointers, sliding window, binary search |
| `TreeCanvas` | Binary trees, BST, heaps, tries |
| `MatrixGrid` | DP tables, grid problems, Floyd-Warshall |
| `LossLandscape` | Gradient descent, loss surface in 3D (Three.js) |
| `DecisionBoundary` | SVM, logistic regression, k-NN |
| `ClusterPlot` | k-Means, DBSCAN, GMM |
| `NeuralNetDiagram` | MLP layers, attention heads, transformer blocks |
| `HeatmapGrid` | Confusion matrix, attention weights, correlation |
| `TimelineStep` | Sequential algorithms (RNN unrolled, backprop chain) |
| `VectorSpace` | Embeddings, PCA, t-SNE (2D/3D scatter) |

### Visualization Requirements

Every visualization MUST:
- Have a **step-through control** (Prev / Play / Next / Speed slider)
- Show **step annotations** — text that explains what just happened at each step
- Allow **custom input** — user can modify the input and re-run
- Highlight the **active element** at each step (node, array index, neuron, etc.)
- Show **auxiliary state** (queue contents, visited set, DP table filling, etc.)
- Be **pauseable** at any step

---

## Exercise Types

Build these 5 exercise types as reusable components:

### 1. Fill-in-the-Blank
Monaco Editor with blanks (`___________`) highlighted. User fills in, clicks Run, sees pass/fail.

### 2. Spot-the-Bug
Broken implementation shown. User identifies the bug line(s), selects from dropdown or clicks the line. Instant feedback.

### 3. Trace-the-Output
Given an algorithm and input, what does it output? Multiple choice or free text. Optionally show the visualization after answering.

### 4. Order-the-Steps
Drag-and-drop scrambled pseudocode lines into the correct order.

### 5. Complexity Quiz
Show a code block. User selects the correct time/space complexity from options. Explanation shown after.

---

## UI Layout

### Pages

```
/                        → Home (search, domain filter, progress ring)
/concept/:slug           → Concept page (Card → Visual → Exercise)
/browse                  → All concepts grid, filterable by domain/category/difficulty
/review                  → Weak concepts queue (based on exercise history)
/playground              → Open code sandbox, any language, no concept attached
```

### Concept Page Layout

```
┌──────────────────────────────────────────────────┐
│  ← Back   BFS  [DSA > Graphs]   Difficulty: Mid  │
├─────────────┬────────────────────────────────────┤
│             │                                    │
│  CARD       │  VISUALIZATION                     │
│  ─────      │  ─────────────                     │
│  Intuition  │  [Interactive Canvas]              │
│  Complexity │  [Step controls]                   │
│  When to    │  [Annotation panel]                │
│  use        │                                    │
│  Gotchas    │                                    │
│             │                                    │
├─────────────┴────────────────────────────────────┤
│  EXERCISE                                        │
│  [Monaco Editor / Drag-drop / MCQ]               │
│  [Run]  [Hint]  [Solution]                       │
├──────────────────────────────────────────────────┤
│  Related: Dijkstra →  DFS →  Topological Sort →  │
└──────────────────────────────────────────────────┘
```

### Design Aesthetic

- Dark theme by default. Dense but breathable — not cramped.
- Monospace font for code, clean sans-serif for UI text.
- Accent color per domain: blue for DSA, amber for ML.
- No carousels. No modals (except hint). Everything visible on one scroll.
- Visualization canvas takes minimum 400px height. Never collapsed by default.

---

## Hint System (AI Layer)

When user clicks **Hint** or fails an exercise twice:

```javascript
const response = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    model: "claude-sonnet-4-20250514",
    max_tokens: 300,
    system: `You are a concise CS tutor. The student is stuck on a coding exercise.
Give ONE targeted hint — not the answer. Max 3 sentences. No preamble.
Concept: ${concept.title}
Exercise type: ${exercise.type}`,
    messages: [
      { role: "user", content: `My current attempt:\n${userCode}\n\nHint please.` }
    ]
  })
});
```

Do not show the full solution when giving a hint. The hint system surfaces one directional clue only.

---

## Progress Tracking

Track per concept:
- `viewed` (boolean)
- `exercise_attempts` (int)
- `exercise_passed` (boolean)
- `last_seen` (timestamp)
- `confidence` (1–3, self-reported after each concept)

Use localStorage for v1. Expose a `/review` page that surfaces:
- Concepts seen but not exercised
- Concepts failed on first attempt
- Concepts not visited in 7+ days

No spaced repetition algorithm required. Simple recency + failure queue is enough.

---

## Build Order

Follow this sequence strictly:

1. **Content schema** — Define the JSON schema and populate 10 seed concepts (5 DSA, 5 ML)
2. **Visualization engine** — Build `GraphCanvas`, `ArrayBars`, `MatrixGrid` first
3. **Concept page layout** — Static, hardcoded data
4. **Card component** — Render intuition, complexity, when-to-use, gotchas
5. **Exercise components** — Fill-in-the-blank + Spot-the-bug first
6. **Monaco + Pyodide integration** — Code execution in browser
7. **Browse page + search/filter**
8. **Progress tracking** (localStorage)
9. **AI hint layer**
10. **Expand concept library to 200+** (content sprint, not engineering)

---

## Content Guidelines (for populating 200+ concepts)

Every concept entry must follow these rules:

- **Intuition line**: One sentence. No jargon. If you need two sentences, rewrite.
- **Analogy**: A physical-world or everyday analogy. Not another CS concept.
- **Gotchas**: The 1–2 things that trip up developers who think they understand it.
- **When-to-use triggers**: Phrased as interview/problem recognition cues ("When the problem asks for shortest path in an unweighted graph…")
- **Exercise**: Must be solvable in under 2 minutes by someone who understands the concept. It is not a challenge — it is a comprehension check.
- **Visualization config**: Every concept must have a visualization. If an obvious visualization doesn't exist, use `TimelineStep` or `HeatmapGrid` as fallback.

---

## Out of Scope (v1)

Do not build these in v1:
- User accounts or cloud sync
- Social/community features
- Spaced repetition scheduling
- Certificate or completion badges
- Mobile app
- Video content of any kind
