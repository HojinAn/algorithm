import * as fs from 'fs';
const [n, m] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split(' ')
  .map(Number);
let ans = BigInt(1);
for (let i = 0; i < m; i++) ans *= BigInt(n - i);
for (let i = m; i > 0; i--) ans /= BigInt(i);
console.log(`${ans}`);
