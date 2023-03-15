import * as fs from 'fs';

const toNums = (s: string) => s.trim().split(' ').map(Number);

const solution = (n: number, m: number, hexagons: number[][]) => {
  const MOD = 1000000007;
  const DIR = [
    [2, 0],
    [1, 1],
    [-1, 1],
  ];

  const checkRange = ([r, c]: number[]) =>
    0 <= r && r < 2 * n && 0 <= c && c < m;

  const dp = ([r, c]: number[]) => {
    if (hexagons[r][c] !== -1) return hexagons[r][c];
    hexagons[r][c] = 0;
    DIR.forEach(([dr, dc]) => {
      const [nr, nc] = [r + dr, c + dc];
      checkRange([nr, nc]) &&
        (hexagons[r][c] = (hexagons[r][c] + dp([nr, nc])) % MOD);
    });
    return hexagons[r][c];
  };

  hexagons[2 * n - (m % 2 ? 2 : 1)][m - 1] = 1;
  return dp([0, 0]);
};

const [S1, , ...inp] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');

const [n, m] = toNums(S1);
const hexagons = <number[][]>[...Array(2 * n)].map(() => Array(m).fill(-1));
inp.forEach((s) => {
  const [r, c] = toNums(s);
  hexagons[2 * (r - 1) + (c % 2 ? 0 : 1)][c - 1] = 0;
});

console.log(solution(n, m, hexagons));
