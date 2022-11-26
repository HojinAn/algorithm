import * as fs from 'fs';
const [n, k] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split(' ')
  .map(Number);
let ans = 0;
const combi = (depth: number, start: number, visited: number) => {
  if (depth === k) return ans++;
  for (let i = start; i < n; i++)
    if (!(visited & (1 << i))) combi(depth + 1, i, visited | (1 << i));
};
combi(0, 0, 0);
console.log(ans);
