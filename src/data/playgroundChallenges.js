export const playgroundChallenges = {
  python: [
    {
      id: "two-sum-py",
      title: "Two Sum",
      language: "python",
      difficulty: "beginner",
      description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume each input would have exactly one solution.",
      examples: [
        { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." }
      ],
      constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9", "-10^9 <= target <= 10^9"],
      starter_code: "def two_sum(nums, target):\n    # Your code here\n    pass",
      test_cases: [
        { input: { nums: [2,7,11,15], target: 9 }, expected: [0, 1] },
        { input: { nums: [3,2,4], target: 6 }, expected: [1, 2] },
        { input: { nums: [3,3], target: 6 }, expected: [0, 1] }
      ],
      test_runner_code: (userCode, testCase) => `
${userCode}
import json
result = two_sum(${JSON.stringify(testCase.input.nums)}, ${testCase.input.target})
print(json.dumps(result))
`
    },
    {
      id: "valid-parentheses-py",
      title: "Valid Parentheses",
      language: "python",
      difficulty: "beginner",
      description: "Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
      examples: [
        { input: "s = '()[]{}'", output: "true", explanation: "All brackets are closed correctly." }
      ],
      constraints: ["1 <= s.length <= 10^4", "s consists of parentheses only '()[]{}'."],
      starter_code: "def is_valid(s):\n    # Your code here\n    pass",
      test_cases: [
        { input: { s: "()" }, expected: true },
        { input: { s: "()[]{}" }, expected: true },
        { input: { s: "(]" }, expected: false },
        { input: { s: "([)]" }, expected: false }
      ],
      test_runner_code: (userCode, testCase) => `
${userCode}
import json
result = is_valid("${testCase.input.s}")
print(json.dumps(result))
`
    },
    {
      id: "reverse-list-py",
      title: "Reverse Linked List",
      language: "python",
      difficulty: "beginner",
      description: "Given the `head` of a singly linked list, reverse the list, and return the reversed list. (Note: For the test runner, the input is given as an array).",
      examples: [
        { input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]", explanation: "" }
      ],
      constraints: ["The number of nodes in the list is in the range [0, 5000].", "-5000 <= Node.val <= 5000"],
      starter_code: "def reverse_list(arr):\n    # For this challenge, we use an array to simulate the list\n    return arr[::-1] # Example starter\n",
      test_cases: [
        { input: { head: [1,2,3,4,5] }, expected: [5,4,3,2,1] },
        { input: { head: [1,2] }, expected: [2,1] },
        { input: { head: [] }, expected: [] }
      ],
      test_runner_code: (userCode, testCase) => `
${userCode}
import json
result = reverse_list(${JSON.stringify(testCase.input.head)})
print(json.dumps(result))
`
    },
    {
      id: "kadane-py",
      title: "Maximum Subarray",
      language: "python",
      difficulty: "intermediate",
      description: "Given an integer array `nums`, find the subarray with the largest sum and return its sum.",
      examples: [
        { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "The subarray [4,-1,2,1] has the largest sum = 6." }
      ],
      constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
      starter_code: "def max_subarray(nums):\n    # Your code here\n    pass",
      test_cases: [
        { input: { nums: [-2,1,-3,4,-1,2,1,-5,4] }, expected: 6 },
        { input: { nums: [1] }, expected: 1 },
        { input: { nums: [5,4,-1,7,8] }, expected: 23 }
      ],
      test_runner_code: (userCode, testCase) => `
${userCode}
import json
result = max_subarray(${JSON.stringify(testCase.input.nums)})
print(json.dumps(result))
`
    },
    {
      id: "climb-stairs-py",
      title: "Climbing Stairs",
      language: "python",
      difficulty: "beginner",
      description: "You are climbing a staircase. It takes `n` steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
      examples: [
        { input: "n = 3", output: "3", explanation: "1+1+1, 1+2, 2+1" }
      ],
      constraints: ["1 <= n <= 45"],
      starter_code: "def climb_stairs(n):\n    # Your code here\n    pass",
      test_cases: [
        { input: { n: 2 }, expected: 2 },
        { input: { n: 3 }, expected: 3 },
        { input: { n: 5 }, expected: 8 }
      ],
      test_runner_code: (userCode, testCase) => `
${userCode}
import json
result = climb_stairs(${testCase.input.n})
print(json.dumps(result))
`
    }
  ],
  javascript: [
    {
      id: "flatten-js",
      title: "Flatten Array",
      language: "javascript",
      difficulty: "beginner",
      description: "Write a function to flatten an arbitrarily nested array into a one-dimensional array.",
      examples: [
        { input: "[1, [2, [3, 4], 5], 6]", output: "[1, 2, 3, 4, 5, 6]", explanation: "" }
      ],
      constraints: ["No built-in Array.prototype.flat() allowed"],
      starter_code: "function flatten(arr) {\n  // Your code here\n}",
      test_cases: [
        { input: { arr: [1, [2, [3, 4], 5], 6] }, expected: [1, 2, 3, 4, 5, 6] },
        { input: { arr: [[1], [2], [3]] }, expected: [1, 2, 3] }
      ],
      test_runner_code: (userCode, testCase) => `
${userCode}
const res = flatten(${JSON.stringify(testCase.input.arr)});
console.log(JSON.stringify(res));
`
    },
    {
      id: "debounce-challenge-js",
      title: "Debounce",
      language: "javascript",
      difficulty: "intermediate",
      description: "Implement a debounce function that delays invoking a callback until after a certain amount of time has elapsed since the last time it was invoked.",
      examples: [
        { input: "delay = 100ms", output: "Function runs once after delay", explanation: "" }
      ],
      constraints: ["Callback must receive original arguments"],
      starter_code: "function debounce(fn, delay) {\n  // Your code here\n}",
      test_cases: [
        { input: { delay: 50 }, expected: true } // Simulation check
      ],
      test_runner_code: (userCode, testCase) => `
${userCode}
let count = 0;
const debounced = debounce(() => count++, 50);
debounced(); debounced(); debounced();
setTimeout(() => {
  console.log(count === 1 ? "true" : "false");
}, 100);
`
    },
    {
      id: "deep-equal-js",
      title: "Deep Equal",
      language: "javascript",
      difficulty: "intermediate",
      description: "Implement a function to check if two objects are deeply equal.",
      examples: [
        { input: "{a: 1, b: {c: 2}}, {a: 1, b: {c: 2}}", output: "true", explanation: "" }
      ],
      constraints: ["Handle nested objects and arrays"],
      starter_code: "function deepEqual(obj1, obj2) {\n  // Your code here\n}",
      test_cases: [
        { input: { a: { x: 1 }, b: { x: 1 } }, expected: true },
        { input: { a: { x: 1 }, b: { x: 2 } }, expected: false }
      ],
      test_runner_code: (userCode, testCase) => `
${userCode}
const res = deepEqual(${JSON.stringify(testCase.input.a)}, ${JSON.stringify(testCase.input.b)});
console.log(JSON.stringify(res));
`
    },
    {
      id: "group-by-js",
      title: "Group By",
      language: "javascript",
      difficulty: "intermediate",
      description: "Write a function that groups an array of objects by a key.",
      examples: [
        { input: "[{id: 1, type: 'a'}, {id: 2, type: 'a'}], 'type'", output: "{a: [{...}, {...}]}", explanation: "" }
      ],
      constraints: [],
      starter_code: "function groupBy(arr, key) {\n  // Your code here\n}",
      test_cases: [
        { input: { arr: [{id: 1, t: 'a'}, {id: 2, t: 'b'}, {id: 3, t: 'a'}], k: 't' }, expected: {a: [{id:1,t:'a'},{id:3,t:'a'}], b:[{id:2,t:'b'}]} }
      ],
      test_runner_code: (userCode, testCase) => `
${userCode}
const res = groupBy(${JSON.stringify(testCase.input.arr)}, "${testCase.input.k}");
console.log(JSON.stringify(res));
`
    },
    {
      id: "memoize-js",
      title: "Memoize",
      language: "javascript",
      difficulty: "intermediate",
      description: "Implement a memoize wrapper that caches the result of function calls.",
      examples: [
        { input: "Expensive function run twice", output: "Calculated once, cached second time", explanation: "" }
      ],
      constraints: [],
      starter_code: "function memoize(fn) {\n  // Your code here\n}",
      test_cases: [
        { input: {}, expected: true }
      ],
      test_runner_code: (userCode, testCase) => `
${userCode}
let calls = 0;
const f = (x) => { calls++; return x * 2; };
const m = memoize(f);
m(5); m(5); m(5);
console.log(calls === 1 ? "true" : "false");
`
    }
  ],
  java: [
    {
      id: "fizzbuzz-java",
      title: "FizzBuzz",
      language: "java",
      difficulty: "beginner",
      description: "Write a program that outputs the string representation of numbers from 1 to n. For multiples of three, return 'Fizz', for multiples of five, return 'Buzz', for both, return 'FizzBuzz'.",
      examples: [{ input: "n = 3", output: "['1','2','Fizz']", explanation: "" }],
      constraints: [],
      starter_code: "public List<String> fizzBuzz(int n) {\n    // Your code\n}",
      test_cases: []
    },
    {
      id: "palindrome-java",
      title: "Palindrome Check",
      language: "java",
      difficulty: "beginner",
      description: "Return true if the string is a palindrome.",
      examples: [{ input: "s = 'racecar'", output: "true", explanation: "" }],
      constraints: [],
      starter_code: "public boolean isPalindrome(String s) {\n    // Your code\n}",
      test_cases: []
    }
    // ... other Java/Cpp placeholders (no execution)
  ],
  cpp: [
     {
      id: "bubble-sort-cpp",
      title: "Bubble Sort",
      language: "cpp",
      difficulty: "beginner",
      description: "Implement bubble sort for an array of integers.",
      examples: [{ input: "[5,1,4,2]", output: "[1,2,4,5]", explanation: "" }],
      constraints: [],
      starter_code: "void bubbleSort(int arr[], int n) {\n    // Your code\n}",
      test_cases: []
    }
  ]
};
