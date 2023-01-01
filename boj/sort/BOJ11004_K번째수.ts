import * as fs from 'fs';
const [S1, S2] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const toNums = (str: string) => str.trim().split(' ').map(Number);
const [, k] = toNums(S1);
const nums = toNums(S2).sort((a, b) => a - b);
console.log(nums[k - 1]);
