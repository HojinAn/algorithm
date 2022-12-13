import * as fs from 'fs';
const [str1, ...input] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');

const [n] = str1.trim().split(' ').map(Number);

const parents = [...Array(n + 1)].map((_, i) => i);
const findRoot = (a: number) =>
  a === parents[a] ? a : (parents[a] = findRoot(parents[a]));
const union = (arr: number[], [aR, bR] = arr.map(findRoot)) =>
  aR === bR ? false : (aR > bR ? (parents[aR] = bR) : (parents[bR] = aR), true);

const diff = input
  .map((li) => li.trim().split(' ').map(Number))
  .sort((a, b) => a[2] - b[2])
  .reduce((diff, [from, to, cost]) => diff + (union([from, to]) ? 0 : cost), 0);

const root = parents[1];
console.log(
  Array.from(new Set(parents.slice(1))).every((no) => findRoot(no) === root)
    ? diff
    : -1
);
