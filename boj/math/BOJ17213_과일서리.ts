import * as fs from 'fs';
const [n, m] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map(Number);

let ans = 0;
const countKinds = (depth: number, rest: number, tmp: number) => {
  if (depth === n) {
    tmp === m - n && ans++;
    return;
  }
  for (let i = 0; i <= rest; i++)
    if (rest - i >= 0) countKinds(depth + 1, rest - i, tmp + i);
};

countKinds(0, m - n, 0);
console.log(ans);
