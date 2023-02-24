import * as fs from 'fs';

const [s1, s2] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const n = Number(s1);
const numArr = s2.trim().split(' ').map(Number);

const LIS = Array(n).fill(1);

for (let i = 0; i < n; i++)
  for (let j = 0; j < i; j++)
    numArr[i] > numArr[j] && (LIS[i] = Math.max(LIS[i], LIS[j] + 1));

console.log(Math.max(...LIS));
