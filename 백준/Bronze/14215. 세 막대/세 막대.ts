import * as fs from 'fs';
const [a, b, c] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split(' ')
  .map(Number);
const max = Math.max(a, b, c);
const sum = a + b + c;
if (sum - max <= max) console.log(2 * (a + b + c - Math.max(a, b, c)) - 1);
else console.log(a + b + c);
