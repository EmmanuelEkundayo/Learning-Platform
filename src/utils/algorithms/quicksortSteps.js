/**
 * Pre-computes all Quicksort steps (Lomuto partition scheme).
 * Returns an array of step snapshots used by ArrayBars.
 */
export function generateQuicksortSteps(inputArray) {
  const a = [...inputArray]
  const steps = []
  // sorted[i] = true once element at index i is in its final position
  const sorted = new Array(a.length).fill(false)

  steps.push({
    type: 'init',
    array: [...a],
    pivot: -1,
    lo: 0,
    hi: a.length - 1,
    i: -1,
    j: -1,
    swapping: [],
    sorted: [...sorted],
    annotation: `Starting quicksort on [${a.join(', ')}].`,
  })

  function partition(lo, hi) {
    const pivotVal = a[hi]

    steps.push({
      type: 'select_pivot',
      array: [...a],
      pivot: hi,
      lo,
      hi,
      i: lo - 1,
      j: lo,
      swapping: [],
      sorted: [...sorted],
      annotation: `Select pivot = ${pivotVal} (index ${hi}). Partition range [${lo}…${hi}].`,
    })

    let i = lo - 1

    for (let j = lo; j < hi; j++) {
      steps.push({
        type: 'compare',
        array: [...a],
        pivot: hi,
        lo,
        hi,
        i,
        j,
        swapping: [],
        sorted: [...sorted],
        annotation: `Compare arr[${j}] = ${a[j]} with pivot ${pivotVal}: ${a[j] <= pivotVal ? '≤ pivot → will swap' : '> pivot → skip'}.`,
      })

      if (a[j] <= pivotVal) {
        i++
        if (i !== j) {
          ;[a[i], a[j]] = [a[j], a[i]]
          steps.push({
            type: 'swap',
            array: [...a],
            pivot: hi,
            lo,
            hi,
            i,
            j,
            swapping: [i, j],
            sorted: [...sorted],
            annotation: `Swap arr[${i}] = ${a[i]} ↔ arr[${j}] = ${a[j]}.`,
          })
        }
      }
    }

    // Place pivot at i+1
    ;[a[i + 1], a[hi]] = [a[hi], a[i + 1]]
    sorted[i + 1] = true

    steps.push({
      type: 'place_pivot',
      array: [...a],
      pivot: i + 1,
      lo,
      hi,
      i: i + 1,
      j: hi,
      swapping: [i + 1, hi],
      sorted: [...sorted],
      annotation: `Pivot ${pivotVal} placed at index ${i + 1} — its final sorted position.`,
    })

    return i + 1
  }

  function qs(lo, hi) {
    if (lo >= hi) {
      if (lo === hi) sorted[lo] = true
      return
    }
    const pi = partition(lo, hi)
    qs(lo, pi - 1)
    qs(pi + 1, hi)
  }

  qs(0, a.length - 1)

  steps.push({
    type: 'done',
    array: [...a],
    pivot: -1,
    lo: 0,
    hi: a.length - 1,
    i: -1,
    j: -1,
    swapping: [],
    sorted: new Array(a.length).fill(true),
    annotation: `Sorted: [${a.join(', ')}]`,
  })

  return steps
}

export const DEFAULT_SORT_ARRAY = [7, 2, 9, 4, 1, 8, 3, 6, 5, 10]
