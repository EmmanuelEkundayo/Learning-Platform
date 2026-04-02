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
