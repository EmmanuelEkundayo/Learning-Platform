/** Canonical complexity labels for display. */
export const COMPLEXITY_LABELS = {
  'O(1)': 'Constant',
  'O(log n)': 'Logarithmic',
  'O(n)': 'Linear',
  'O(n log n)': 'Linearithmic',
  'O(n²)': 'Quadratic',
  'O(n³)': 'Cubic',
  'O(2ⁿ)': 'Exponential',
  'O(n!)': 'Factorial',
  'O(V + E)': 'Linear in graph size',
}

export function complexityColor(label) {
  if (['O(1)', 'O(log n)'].includes(label)) return 'text-green-400'
  if (['O(n)', 'O(n log n)'].includes(label)) return 'text-yellow-400'
  if (['O(n²)', 'O(n³)'].includes(label)) return 'text-orange-400'
  return 'text-red-400'
}
