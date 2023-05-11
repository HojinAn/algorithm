import * as fs from 'fs';
const [li, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [a, b] = li.trim().split(' ').map(Number);
const [c, n] = inp.map(Number);
console.log(
  ((a * n + b) <= c * n) && c >= a ? 1 : 0
)