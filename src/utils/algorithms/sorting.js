/**
 * Pre-computes steps for various sorting algorithms.
 * Returns an array of step snapshots used by ArrayBars.
 */

// ─── Bubble Sort ─────────────────────────────────────────────────────────────
export function generateBubbleSortSteps(inputArray) {
  const a = [...inputArray]
  const steps = []
  const n = a.length
  const sorted = new Array(n).fill(false)

  steps.push({
    type: 'init',
    array: [...a],
    i: -1,
    j: -1,
    swapping: [],
    sorted: [...sorted],
    annotation: `Starting Bubble Sort on [${a.join(', ')}].`,
  })

  for (let i = 0; i < n; i++) {
    let swapped = false
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        type: 'compare',
        array: [...a],
        i,
        j,
        swapping: [],
        sorted: [...sorted],
        annotation: `Compare ${a[j]} and ${a[j + 1]}.`,
      })

      if (a[j] > a[j + 1]) {
        ;[a[j], a[j + 1]] = [a[j + 1], a[j]]
        swapped = true
        steps.push({
          type: 'swap',
          array: [...a],
          i,
          j,
          swapping: [j, j + 1],
          sorted: [...sorted],
          annotation: `Swap ${a[j + 1]} and ${a[j]}.`,
        })
      }
    }
    sorted[n - i - 1] = true
    steps.push({
      type: 'place',
      array: [...a],
      i,
      j: -1,
      swapping: [],
      sorted: [...sorted],
      annotation: `${a[n - i - 1]} is now in its final position.`,
    })
    if (!swapped) break
  }

  // All sorted
  const finalSorted = new Array(n).fill(true)
  steps.push({
    type: 'done',
    array: [...a],
    i: -1,
    j: -1,
    swapping: [],
    sorted: finalSorted,
    annotation: `Array is sorted!`,
  })

  return steps
}

// ─── Selection Sort ──────────────────────────────────────────────────────────
export function generateSelectionSortSteps(inputArray) {
  const a = [...inputArray]
  const steps = []
  const n = a.length
  const sorted = new Array(n).fill(false)

  steps.push({
    type: 'init',
    array: [...a],
    i: -1,
    j: -1,
    swapping: [],
    sorted: [...sorted],
    annotation: `Starting Selection Sort.`,
  })

  for (let i = 0; i < n; i++) {
    let minIdx = i
    steps.push({
      type: 'select_min',
      array: [...a],
      i,
      j: i,
      minIdx,
      swapping: [],
      sorted: [...sorted],
      annotation: `New pass: Assume minimum is at index ${i} (${a[i]}).`,
    })

    for (let j = i + 1; j < n; j++) {
      steps.push({
        type: 'compare',
        array: [...a],
        i,
        j,
        minIdx,
        swapping: [],
        sorted: [...sorted],
        annotation: `Compare current min ${a[minIdx]} with ${a[j]}.`,
      })

      if (a[j] < a[minIdx]) {
        minIdx = j
        steps.push({
          type: 'new_min',
          array: [...a],
          i,
          j,
          minIdx,
          swapping: [],
          sorted: [...sorted],
          annotation: `Found new minimum ${a[minIdx]} at index ${j}.`,
        })
      }
    }

    if (minIdx !== i) {
      ;[a[i], a[minIdx]] = [a[minIdx], a[i]]
      steps.push({
        type: 'swap',
        array: [...a],
        i,
        j: -1,
        minIdx,
        swapping: [i, minIdx],
        sorted: [...sorted],
        annotation: `Swap current index ${i} with minimum at ${minIdx}.`,
      })
    }
    sorted[i] = true
    steps.push({
      type: 'place',
      array: [...a],
      i,
      j: -1,
      sorted: [...sorted],
      swapping: [],
      annotation: `Index ${i} is now sorted.`,
    })
  }

  return steps
}

// ─── Insertion Sort ──────────────────────────────────────────────────────────
export function generateInsertionSortSteps(inputArray) {
  const a = [...inputArray]
  const steps = []
  const n = a.length
  const sorted = new Array(n).fill(false)

  steps.push({
    type: 'init',
    array: [...a],
    i: -1,
    j: -1,
    swapping: [],
    sorted: [...sorted],
    annotation: `Starting Insertion Sort.`,
  })

  sorted[0] = true // First element is "sorted" relative to itself

  for (let i = 1; i < n; i++) {
    let curr = a[i]
    let j = i - 1
    
    steps.push({
      type: 'pick',
      array: [...a],
      i,
      j,
      curr,
      swapping: [],
      sorted: [...sorted],
      annotation: `Pick ${curr} at index ${i} to insert into sorted portion.`,
    })

    while (j >= 0 && a[j] > curr) {
      steps.push({
        type: 'compare',
        array: [...a],
        i,
        j,
        curr,
        swapping: [],
        sorted: [...sorted],
        annotation: `${a[j]} > ${curr}, shifting ${a[j]} right.`,
      })
      
      a[j + 1] = a[j]
      j--
      
        steps.push({
          type: 'shift',
          array: [...a],
          i,
          j: j + 1,
          swapping: [j + 1, j + 2],
          sorted: [...sorted],
          annotation: `Shifted ${a[j+1]} to the right.`,
        })
    }
    a[j + 1] = curr
    for(let k = 0; k <= i; k++) sorted[k] = true
    
    steps.push({
      type: 'insert',
      array: [...a],
      i,
      j: j + 1,
      swapping: [j + 1],
      sorted: [...sorted],
      annotation: `Inserted ${curr} at index ${j + 1}.`,
    })
  }

  return steps
}
