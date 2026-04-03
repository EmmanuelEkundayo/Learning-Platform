const bigO = {
  id: 'big-o',
  title: 'Big O Notation',
  color: 'emerald',
  category: 'Algorithms',
  description: 'Time and space complexity analysis for common data structures and algorithms',
  sections: [
    {
      title: 'Common Growth Rates',
      items: [
        { label: 'O(1) - Constant', language: 'javascript', code: `function getFirst(arr) { return arr[0]; }\n// Accessing an array element by index\n// Pushing/popping from a stack\n// Checking a value in a hash map (average)`, note: 'Complexity does not increase with input size' },
        { label: 'O(log n) - Logarithmic', language: 'javascript', code: `while (n > 1) { n = Math.floor(n / 2); }\n// Binary search\n// Operations on balanced trees (BST, AVL, Red-Black)\n// Searching in a sorted array`, note: 'Dividing the problem in half at each step' },
        { label: 'O(n) - Linear', language: 'javascript', code: `for (let i = 0; i < n; i++) { console.log(i); }\n// Linear search\n// Printing all elements of an array\n// Searching in an unsorted array`, note: 'Complexity grows proportionally to the input size' },
        { label: 'O(n log n) - Linearithmic', language: 'javascript', code: `// Merge Sort\n// Quick Sort (average)\n// Heap Sort\n// Tim Sort`, note: 'Characteristic of efficient sorting algorithms' }
      ]
    },
    {
      title: 'Polynomial Growth',
      items: [
        { label: 'O(n²) - Quadratic', language: 'javascript', code: `for (let i = 0; i < n; i++) {\n  for (let j = 0; j < n; j++) { ... }\n}\n// Bubble Sort\n// Selection Sort\n// Insertion Sort\n// Traversing a simple square grid`, note: 'Nested loops over the same input' },
        { label: 'O(n³) - Cubic', language: 'javascript', code: `for (let i = 0; i < n; i++)\n  for (let j = 0; j < n; j++)\n    for (let k = 0; k < n; k++) { ... }\n// Matrix multiplication (naive)\n// Triple nested loops`, note: 'Very inefficient for large n' },
        { label: 'O(2ⁿ) - Exponential', language: 'javascript', code: `function fib(n) {\n  if (n <= 1) return n;\n  return fib(n - 1) + fib(n - 2);\n}\n// Brute-force recursive solutions\n// Power set generation`, note: 'Doubles with each additional element added to the input' },
        { label: 'O(n!) - Factorial', language: 'javascript', code: `function permute(arr) { ... }\n// Generating all permutations of an array\n// Traveling Salesman Problem (brute force)`, note: 'Grows extremely fast - only usable for very small n' }
      ]
    },
    {
      title: 'Complexity Comparison',
      items: [
        { label: 'Good: O(1), O(log n)', language: 'text', code: `n=10     => 1, 3\nn=100    => 1, 7\nn=1000   => 1, 10\nn=10^6   => 1, 20` },
        { label: 'Fair: O(n)', language: 'text', code: `n=10     => 10\nn=100    => 100\nn=1000   => 1000\nn=10^6   => 1,000,000` },
        { label: 'Mediocre: O(n log n)', language: 'text', code: `n=10     => 33\nn=100    => 664\nn=1000   => 9,965\nn=10^6   => 19,931,568` },
        { label: 'Bad: O(n²), O(2ⁿ), O(n!)', language: 'text', code: `n=10     => 100, 1024, 3M\nn=20     => 400, 1M, 2x10^18\nn=50     => 2500, 10^15, error`, note: 'Algorithms in this category are usually impractical for n > 50' }
      ]
    },
    {
      title: 'Array Operations (Average)',
      items: [
        { label: 'Access (by index)', language: 'text', code: `O(1)`, note: 'Indexing into an array remains constant regardless of size' },
        { label: 'Search (linear)', language: 'text', code: `O(n)`, note: 'Must visit every element in the worst case' },
        { label: 'Insertion (at end)', language: 'text', code: `O(1)`, note: 'Assumes the array has capacity' },
        { label: 'Insertion (at beginning)', language: 'text', code: `O(n)`, note: 'Requires shifting all subsequent elements forward' },
        { label: 'Deletion (at beginning)', language: 'text', code: `O(n)`, note: 'Requires shifting all subsequent elements backward' }
      ]
    },
    {
      title: 'Linked List Operations',
      items: [
        { label: 'Access (by index)', language: 'text', code: `O(n)`, note: 'Must traverse from the head to reach the index' },
        { label: 'Search', language: 'text', code: `O(n)` },
        { label: 'Insertion (at head)', language: 'text', code: `O(1)`, note: 'Very efficient - just update pointers' },
        { label: 'Insertion (at tail)', language: 'text', code: `O(n) / O(1)`, note: 'O(1) only if the list maintains a pointer to the tail' },
        { label: 'Deletion (at head)', language: 'text', code: `O(1)` }
      ]
    },
    {
      title: 'Stack & Queue',
      items: [
        { label: 'Push (Stack)', language: 'text', code: `O(1)` },
        { label: 'Pop (Stack)', language: 'text', code: `O(1)` },
        { label: 'Peek (Stack)', language: 'text', code: `O(1)` },
        { label: 'Enqueue (Queue)', language: 'text', code: `O(1)` },
        { label: 'Dequeue (Queue)', language: 'text', code: `O(1)` },
        { label: 'Search (Stack/Queue)', language: 'text', code: `O(n)` }
      ]
    },
    {
      title: 'Hash Map Operations',
      items: [
        { label: 'Search (Access)', language: 'text', code: `Average: O(1)\nWorst:   O(n)`, note: 'Worst case occurs with excessive hash collisions' },
        { label: 'Insertion', language: 'text', code: `Average: O(1)\nWorst:   O(n)` },
        { label: 'Deletion', language: 'text', code: `Average: O(1)\nWorst:   O(n)` }
      ]
    },
    {
      title: 'Binary Search Tree (Balanced)',
      items: [
        { label: 'Search', language: 'text', code: `Average: O(log n)\nWorst:   O(n)`, note: 'Worst case happens if the tree becomes a linked list (unbalanced)' },
        { label: 'Insertion', language: 'text', code: `Average: O(log n)\nWorst:   O(n)` },
        { label: 'Deletion', language: 'text', code: `Average: O(log n)\nWorst:   O(n)` }
      ]
    },
    {
      title: 'Sorting Algorithms Comparison',
      items: [
        { label: 'Quick Sort', language: 'text', code: `Time:  O(n log n) [avg] / O(n²) [worst]\nSpace: O(log n)`, note: 'Fastest in practice for many datasets' },
        { label: 'Merge Sort', language: 'text', code: `Time:  O(n log n)\nSpace: O(n)`, note: 'Stable sort, good for large datasets that do not fit in memory' },
        { label: 'Heap Sort', language: 'text', code: `Time:  O(n log n)\nSpace: O(1)`, note: 'Efficiency of O(n log n) with minimal extra memory' },
        { label: 'Bubble Sort', language: 'text', code: `Time:  O(n²)\nSpace: O(1)` }
      ]
    },
    {
      title: 'Space Complexity',
      items: [
        { label: 'O(1) - Constant Space', language: 'javascript', code: `function sum(n) {\n  let total = 0;\n  for (let i = 0; i < n; i++) total += i;\n  return total;\n}`, note: 'Only a few variables regardless of n' },
        { label: 'O(n) - Linear Space', language: 'javascript', code: `function createArr(n) {\n  return new Array(n).fill(0);\n}`, note: 'Space used grows proportionally with n' },
        { label: 'Recursion Depth', language: 'javascript', code: `function rec(n) {\n  if (n === 0) return;\n  rec(n - 1);\n}`, note: 'Each recursive call adds a frame to the call stack' }
      ]
    }
  ]
}

export default bigO
