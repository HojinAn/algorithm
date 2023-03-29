import * as fs from 'fs';
const [s, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const n = +s;
const numbers = inp.map(Number);
const LIS = Array(n).fill(1);

for (let i = 0; i < n; i++)
  for (let j = 0; j < i; j++)
    if (numbers[j] < numbers[i]) LIS[i] = Math.max(LIS[i], LIS[j] + 1);

console.log(n - Math.max(...LIS));
