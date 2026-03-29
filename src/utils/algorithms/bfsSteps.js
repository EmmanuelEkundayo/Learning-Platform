/**
 * Pre-computes all BFS traversal steps for a given adjacency list.
 * Each step is a snapshot used by GraphCanvas to drive the visualization.
 */
export function generateBfsSteps(adjacency, startNode) {
  const steps = []
  const visited = new Set([startNode])
  const queue = [startNode]
  const visitedOrder = [startNode]

  steps.push({
    type: 'init',
    activeNode: startNode,
    activeEdge: null,
    queue: [...queue],
    visited: new Set(visited),
    visitedOrder: [...visitedOrder],
    annotation: `Initialize: enqueue start node ${startNode} and mark it visited.`,
  })

  while (queue.length > 0) {
    const node = queue.shift()

    steps.push({
      type: 'dequeue',
      activeNode: node,
      activeEdge: null,
      queue: [...queue],
      visited: new Set(visited),
      visitedOrder: [...visitedOrder],
      annotation: `Dequeue ${node}. Queue: [${queue.length ? queue.join(', ') : '—'}]`,
    })

    for (const neighbor of (adjacency[node] ?? [])) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor)
        queue.push(neighbor)
        visitedOrder.push(neighbor)

        steps.push({
          type: 'enqueue',
          activeNode: neighbor,
          activeEdge: [node, neighbor],
          queue: [...queue],
          visited: new Set(visited),
          visitedOrder: [...visitedOrder],
          annotation: `${neighbor} is unvisited → enqueue it. Queue: [${queue.join(', ')}]`,
        })
      } else {
        steps.push({
          type: 'skip',
          activeNode: node,
          activeEdge: [node, neighbor],
          queue: [...queue],
          visited: new Set(visited),
          visitedOrder: [...visitedOrder],
          annotation: `${neighbor} already visited — skip.`,
        })
      }
    }
  }

  steps.push({
    type: 'done',
    activeNode: null,
    activeEdge: null,
    queue: [],
    visited: new Set(visited),
    visitedOrder: [...visitedOrder],
    annotation: `BFS complete. Visit order: ${visitedOrder.join(' → ')}`,
  })

  return steps
}

// Default 8-node undirected graph for the BFS seed concept
export const DEFAULT_GRAPH_NODES = [0, 1, 2, 3, 4, 5, 6, 7].map((id) => ({ id }))

export const DEFAULT_GRAPH_EDGES = [
  { source: 0, target: 1 },
  { source: 0, target: 2 },
  { source: 1, target: 3 },
  { source: 1, target: 4 },
  { source: 2, target: 5 },
  { source: 3, target: 7 },
  { source: 4, target: 7 },
  { source: 5, target: 6 },
]

export const DEFAULT_GRAPH_ADJACENCY = {
  0: [1, 2],
  1: [0, 3, 4],
  2: [0, 5],
  3: [1, 7],
  4: [1, 7],
  5: [2, 6],
  6: [5],
  7: [3, 4],
}
