/**
 * Pre-computes steps for various search algorithms.
 * Each step is a snapshot used by ArrayPointers.
 */

// ─── Binary Search ───────────────────────────────────────────────────────────
export function generateBinarySearchSteps(arr, target) {
  const steps = []
  let lo = 0, hi = arr.length - 1

  steps.push({
    lo, hi, mid: null, found: false, done: false,
    annotation: `Search for ${target} in sorted array of ${arr.length} elements. lo=0, hi=${hi}.`,
  })

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2)
    steps.push({ 
      lo, hi, mid, found: false, done: false,
      annotation: `Calculate mid = lo + (hi - lo) / 2 = ${mid}.` 
    })

    if (arr[mid] === target) {
      steps.push({ lo, hi, mid, found: true, done: true,
        annotation: `arr[${mid}] = ${arr[mid]} == ${target} ✓  Found at index ${mid}!` })
      return steps
    } else if (arr[mid] < target) {
      steps.push({ lo, hi, mid, found: false, done: false,
        annotation: `arr[${mid}]=${arr[mid]} < ${target} → search right half. lo = mid+1 = ${mid + 1}` })
      lo = mid + 1
    } else {
      steps.push({ lo, hi, mid, found: false, done: false,
        annotation: `arr[${mid}]=${arr[mid]} > ${target} → search left half. hi = mid-1 = ${mid - 1}` })
      hi = mid - 1
    }
  }

  steps.push({ lo: null, hi: null, mid: null, found: false, done: true,
    annotation: `${target} not in array. Return -1.` })
  
  return steps
}

// ─── Linear Search ───────────────────────────────────────────────────────────
export function generateLinearSearchSteps(arr, target) {
  const steps = []
  
  steps.push({
    i: null, found: false, done: false,
    annotation: `Starting Linear Search for ${target}.`
  })

  for (let i = 0; i < arr.length; i++) {
    steps.push({
      i, found: false, done: false,
      annotation: `Checking index ${i}: arr[${i}] = ${arr[i]}.`
    })

    if (arr[i] === target) {
      steps.push({
        i, found: true, done: true,
        annotation: `Found ${target} at index ${i}!`
      })
      return steps
    }
  }

  steps.push({
    i: null, found: false, done: true,
    annotation: `${target} not found in array.`
  })

  return steps
}
