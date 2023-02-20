import * as fs from 'fs';
const [s1, s2, ...inp] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');

const n = Number(s1);
const w = Number(s2);
const coords = [[0, 0], ...inp.map((li) => li.trim().split(' ').map(Number))];
const cache = [...Array(w + 1)].map(() => Array(w + 1).fill(-1));

type Type = 1 | 2;

const calcIdx = (type: Type, idx: number) => {
  if (idx === 0) {
    if (type === 1) return [1, 1];
    return [n, n];
  }
  return coords[idx];
};

const calcDist = (type: 1 | 2, idx: number, toIdx: number) => {
  const start = calcIdx(type, idx);
  const to = coords[toIdx];
  return Math.abs(start[0] - to[0]) + Math.abs(start[1] - to[1]);
};

const dp = (one: number, two: number, idx: number) => {
  if (idx > w) return 0;
  if (cache[one][two] !== -1) return cache[one][two];

  const oneDist = dp(idx, two, idx + 1) + calcDist(1, one, idx);
  const twoDist = dp(one, idx, idx + 1) + calcDist(2, two, idx);
  return (cache[one][two] = Math.min(oneDist, twoDist));
};

const findPath = (one: number, two: number, path = <Type[]>[]) => {
  if (one === w || two === w) return path;
  const next = Math.max(one, two) + 1;
  const oneDist = calcDist(1, one, next);
  const twoDist = calcDist(2, two, next);
  return cache[one][next] + twoDist > cache[next][two] + oneDist
    ? (path.push(1), findPath(next, two, path))
    : (path.push(2), findPath(one, next, path));
};

console.log(dp(0, 0, 1));
console.log(findPath(0, 0).join('\n'));
