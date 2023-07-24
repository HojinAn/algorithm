import * as fs from 'fs';
const inp = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map(Number);

let sum = 0;
let ans = 0;
for (let i = 0; i < inp.length; i++) {
  if (sum < 100) {
    sum += inp[i];
    if (Math.abs(100 - sum) < Math.abs(100 - ans)) {
      ans = sum;
    } else if (Math.abs(100 - sum) === Math.abs(100 - ans)) {
      ans = Math.max(ans, sum);
    }
  }
}

console.log(ans);
