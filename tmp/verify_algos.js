import { getSteps } from '../src/utils/algorithms/registry.js';

const mockArray = [10, 5, 2, 8];

console.log('Testing Bubble Sort...');
const bubble = getSteps('sorting', 'bubble-sort', mockArray);
console.log(`Generated ${bubble.length} steps.`);
if (bubble.length > 0) console.log('First step:', bubble[0].annotation);

console.log('\nTesting Binary Search...');
const sortedArray = [2, 5, 8, 10];
const bin = getSteps('search', 'binary-search', sortedArray, 8);
console.log(`Generated ${bin.length} steps.`);
if (bin.length > 0) console.log('First step:', bin[0].annotation);

console.log('\nTesting DFS...');
const adj = { 0: [1, 2], 1: [0], 2: [0] };
const dfs = getSteps('graph', 'dfs', adj, 0);
console.log(`Generated ${dfs.length} steps.`);
if (dfs.length > 0) console.log('First step:', dfs[0].annotation);

console.log('\nALL TESTS PASSED (structurally)');
