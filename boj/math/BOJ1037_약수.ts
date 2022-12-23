import * as fs from 'fs';
const [[n], divisors] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map((li) => li.trim().split(' ').map(Number));
divisors.sort((a, b) => a - b);
console.log(divisors[0] * divisors[n - 1]);
