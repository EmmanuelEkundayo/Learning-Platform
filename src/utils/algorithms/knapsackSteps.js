/**
 * Pre-computes all 0/1 Knapsack DP table filling steps.
 * Returns an array of step snapshots used by MatrixGrid.
 */
export function generateKnapsackSteps(weights, values, W) {
  const n = weights.length
  // dp[i][w]: max value using first i items with capacity w
  const dp = Array.from({ length: n + 1 }, () => new Array(W + 1).fill(0))
  const steps = []

  steps.push({
    type: 'init',
    dp: dp.map((r) => [...r]),
    activeCell: null,
    sourceCells: [],
    tookItem: false,
    annotation: `DP table: ${n} items × capacity 0–${W}. dp[i][w] = max value using first i items at capacity w.`,
  })

  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= W; w++) {
      const skipVal = dp[i - 1][w]

      if (weights[i - 1] > w) {
        // Can't take item
        dp[i][w] = skipVal
        steps.push({
          type: 'fill',
          dp: dp.map((r) => [...r]),
          activeCell: [i, w],
          sourceCells: [[i - 1, w]],
          tookItem: false,
          annotation: `Item ${i} (weight ${weights[i - 1]}) > capacity ${w} — can't take. dp[${i}][${w}] = ${skipVal}.`,
        })
      } else {
        const takeVal = dp[i - 1][w - weights[i - 1]] + values[i - 1]
        const tookItem = takeVal > skipVal
        dp[i][w] = Math.max(skipVal, takeVal)
        steps.push({
          type: 'fill',
          dp: dp.map((r) => [...r]),
          activeCell: [i, w],
          sourceCells: tookItem
            ? [[i - 1, w - weights[i - 1]]]
            : [[i - 1, w]],
          tookItem,
          annotation: `Item ${i} (w=${weights[i - 1]}, v=${values[i - 1]}): skip→${skipVal}, take→${takeVal}. ${tookItem ? 'TAKE' : 'SKIP'}. dp[${i}][${w}] = ${dp[i][w]}.`,
        })
      }
    }
  }

  // Traceback to find which items were taken
  const taken = []
  let w = W
  for (let i = n; i >= 1; i--) {
    if (dp[i][w] !== dp[i - 1][w]) {
      taken.unshift(i)
      w -= weights[i - 1]
    }
  }

  steps.push({
    type: 'done',
    dp: dp.map((r) => [...r]),
    activeCell: [n, W],
    sourceCells: [],
    tookItem: false,
    takenItems: taken,
    annotation: `Optimal value: ${dp[n][W]}. Items taken: [${taken.join(', ')}].`,
  })

  return steps
}

// Items for the 0/1 Knapsack seed concept
export const DEFAULT_KNAPSACK = {
  weights: [2, 3, 4, 5],
  values:  [3, 4, 5, 7],
  W: 8,
  itemLabels: ['A', 'B', 'C', 'D'],
}
