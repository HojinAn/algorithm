import * as fs from 'fs';
const [A, B] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split(' ')
  .map(Number);
const gcd = ([a, b]: number[]) => (a % b === 0 ? b : gcd([b, a % b]));

console.log((A * B) / gcd([A, B]));
