import * as fs from 'fs';
const [s1, ...inp] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');
const [n] = s1.split(' ').map(Number);

const edges = inp.map((s) => s.split(' ').map(Number));
const parent = [...Array(n + 1)].map((_, i) => i);

const find = (x: number): number => {
  if (x === parent[x]) return x;
  return (parent[x] = find(parent[x]));
};

const union = (x: number, y: number): boolean => {
  x = find(x);
  y = find(y);
  if (x === y) return false;
  if (x < y) [x, y] = [y, x];
  parent[x] = y;
  return true;
};

edges.sort((a, b) => a[2] - b[2]);

let ans = 0;
let cnt = 0;
for (const [a, b, c] of edges) {
  if (!union(a, b)) continue;
  if (cnt === n - 2) break;
  ans += c;
  cnt++;
}
console.log(ans);
