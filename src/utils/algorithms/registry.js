import { generateQuicksortSteps, DEFAULT_SORT_ARRAY } from './quicksortSteps.js'
import { generateBubbleSortSteps, generateSelectionSortSteps, generateInsertionSortSteps } from './sorting.js'
import {
  generateBfsSteps,
  DEFAULT_GRAPH_NODES,
  DEFAULT_GRAPH_EDGES,
  DEFAULT_GRAPH_ADJACENCY,
} from './bfsSteps.js'
import { generateDfsSteps, generateDijkstraSteps } from './graphAlgorithms.js'
import { generateBinarySearchSteps, generateLinearSearchSteps } from './searchAlgorithms.js'
import { generateKnapsackSteps, DEFAULT_KNAPSACK } from './knapsackSteps.js'

/**
 * Central registry for algorithm step generators.
 */

const GENERATORS = {
  sorting: {
    'bubble-sort':    generateBubbleSortSteps,
    'selection-sort': generateSelectionSortSteps,
    'insertion-sort': generateInsertionSortSteps,
    'quicksort':      generateQuicksortSteps,
    default:          generateQuicksortSteps,
  },
  graph: {
    'bfs':      generateBfsSteps,
    'dfs':      generateDfsSteps,
    'dijkstra': generateDijkstraSteps,
    default:    generateBfsSteps,
  },
  search: {
    'binary-search': generateBinarySearchSteps,
    'linear-search': generateLinearSearchSteps,
    default:         generateBinarySearchSteps,
  },
  dp: {
    'knapsack': generateKnapsackSteps,
    default:    generateKnapsackSteps,
  }
}

// ─── Mode-specific sort arrays ────────────────────────────────────────────────
// Each array is designed to make the algorithm's behaviour clearly visible.

const SORT_ARRAYS = {
  // Bubble: adjacent pairs out of order → many local swaps visible
  'bubble-sort':    [3, 1, 4, 2, 6, 5, 8, 7, 10, 9],
  // Insertion: large values sit early → each new element travels far left
  'insertion-sort': [9, 1, 8, 2, 7, 3, 6, 4, 10, 5],
  // Selection: highlight finding the minimum on each pass
  'selection-sort': [8, 3, 6, 1, 9, 4, 7, 2, 10, 5],
  // Quicksort: mixed, pivot partitioning clearly visible
  'quicksort':      DEFAULT_SORT_ARRAY,
}

export function getDefaultSortArray(mode) {
  return SORT_ARRAYS[mode] ?? DEFAULT_SORT_ARRAY
}

// ─── Mode-specific graph data ─────────────────────────────────────────────────

function makeGraph(edges, n) {
  const nodes = Array.from({ length: n }, (_, id) => ({ id }))
  const adjacency = {}
  for (let i = 0; i < n; i++) adjacency[i] = []
  for (const { source, target } of edges) {
    adjacency[source].push(target)
    adjacency[target].push(source)
  }
  return { nodes, edges, adjacency }
}

// BFS: wide, shallow, tree-like — shows level-by-level expansion clearly
//         0
//        / \
//       1   2
//      /|   |\
//     3  4  5  6
//     |
//     7
const BFS_GRAPH = makeGraph([
  { source: 0, target: 1 }, { source: 0, target: 2 },
  { source: 1, target: 3 }, { source: 1, target: 4 },
  { source: 2, target: 5 }, { source: 2, target: 6 },
  { source: 3, target: 7 },
], 8)

// DFS: deep chain with side branches — shows backtracking behaviour
//   0 — 1 — 2 — 3
//   |       |
//   4       5 — 6 — 7
const DFS_GRAPH = makeGraph([
  { source: 0, target: 1 }, { source: 0, target: 4 },
  { source: 1, target: 2 },
  { source: 2, target: 3 }, { source: 2, target: 5 },
  { source: 5, target: 6 },
  { source: 6, target: 7 },
], 8)

// Dijkstra: dense, multiple paths of different lengths to the same destination
//   0 — 1 — 4
//   |\ /|   |
//   | X |   |
//   |/ \|   |
//   2 — 3 — 5
//       |
//       6 — 7
const DIJKSTRA_GRAPH = makeGraph([
  { source: 0, target: 1 }, { source: 0, target: 2 },
  { source: 1, target: 2 }, { source: 1, target: 3 }, { source: 1, target: 4 },
  { source: 2, target: 3 },
  { source: 3, target: 5 }, { source: 3, target: 6 },
  { source: 4, target: 5 },
  { source: 6, target: 7 },
], 8)

const GRAPH_DATA = {
  'bfs':      BFS_GRAPH,
  'dfs':      DFS_GRAPH,
  'dijkstra': DIJKSTRA_GRAPH,
}

export function getDefaultGraphData(mode) {
  const g = GRAPH_DATA[mode]
  if (g) return g
  return { nodes: DEFAULT_GRAPH_NODES, edges: DEFAULT_GRAPH_EDGES, adjacency: DEFAULT_GRAPH_ADJACENCY }
}

// ─── Step generator ───────────────────────────────────────────────────────────

export function getSteps(type, mode, ...args) {
  const category = GENERATORS[type]
  if (!category) return []

  const generator = category[mode] || category.default
  return generator(...args)
}

export {
  DEFAULT_SORT_ARRAY,
  DEFAULT_GRAPH_NODES,
  DEFAULT_GRAPH_EDGES,
  DEFAULT_GRAPH_ADJACENCY,
  DEFAULT_KNAPSACK
}
