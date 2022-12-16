import * as fs from 'fs';
const [n, , ...nums] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map(Number);

const dp = [1, 1, 2];
for (let i = 3; i <= 40; i++) dp[i] = dp[i - 1] + dp[i - 2];

let l = 1;
const arr = nums.reduce((arr, num) => {
  arr.push(num - l);
  l = num + 1;
  return arr;
}, <number[]>[]);
arr.push(n + 1 - l);

console.log(arr.reduce((ans, no) => ans * dp[no], 1));
