import * as fs from 'fs';

type Point = [number, number];

const DIR = [
  [1, 0],
  [1, 1],
  [0, 1],
];

const [S, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [n, m] = S.trim().split(' ').map(Number);
const boards = inp.map((li) => li.trim().split('').map(Number));
const cache = [...Array(n)].map(() => Array(m).fill(-1));

const dp = ([r, c]: Point) => {
  if (cache[r][c] !== -1) return cache[r][c];
  if (r === n - 1 || c === m - 1) return (cache[r][c] = boards[r][c]);
  return (cache[r][c] = boards[r][c]
    ? Math.min(...DIR.map(([dr, dc]) => dp([r + dr, c + dc]))) + 1
    : 0);
};

const max = boards.reduce(
  (max, li, r) => (
    li.forEach((el, c) => el && (max = Math.max(max, dp([r, c])))), max
  ),
  0
);

console.log(max * max);
