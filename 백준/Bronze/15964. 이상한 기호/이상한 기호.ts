import * as fs from 'fs';
const [a, b] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split(' ')
  .map(BigInt);

console.log(`${(a + b) * (a - b)}`);
