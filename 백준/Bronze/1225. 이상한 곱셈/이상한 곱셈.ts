import * as fs from 'fs';
const [a, b] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split(' ')
  .map((li) => li.trim().split('').map(Number));
const n = a.length;
const m = b.length;

let ans = 0;
for (let i = 0; i < n; i++) for (let j = 0; j < m; j++) ans += a[i] * b[j];

console.log(ans);
