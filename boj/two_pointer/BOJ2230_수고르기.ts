import * as fs from 'fs';
const [str1, ...str2] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');
const [n, m] = str1.trim().split(' ').map(Number);
const numbers = str2.map(Number).sort((a, b) => a - b);

let ans = 2_000_000_001;

let l = 0;
let r = 0;

while (r < n) {
  if (numbers[r] - numbers[l] < m) {
    r++;
    continue;
  }
  if (numbers[r] - numbers[l] === m) {
    ans = m;
    break;
  }
  ans = Math.min(ans, numbers[r] - numbers[l]);
  l++;
}

console.log(ans);
