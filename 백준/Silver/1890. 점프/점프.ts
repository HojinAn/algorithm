import * as fs from 'fs';

type Point = [number, number];

const ZERO = BigInt(0);
const ONE = BigInt(1);
const DIR = [
  [0, 1],
  [1, 0],
];

const [S, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const n = Number(S);
const boards = inp.map((li) => li.trim().split(' ').map(Number));
const cache = [...Array(n)].map<bigint[]>(() => Array(n).fill(ZERO));

const checkRange = ([r, c]: Point) => 0 <= r && r < n && 0 <= c && c < n;

const dp = ([r, c]: Point) => {
  if (r === n - 1 && c === n - 1) return (cache[r][c] = ONE);
  const jumpCnt = boards[r][c];
  jumpCnt &&
    DIR.forEach(([dr, dc]) => {
      const [nr, nc] = [r + jumpCnt * dr, c + jumpCnt * dc];
      if (checkRange([nr, nc]))
        cache[r][c] += cache[nr][nc] ? cache[nr][nc] : dp([nr, nc]);
    });
  return cache[r][c];
};

console.log(`${dp([0, 0])}`);
