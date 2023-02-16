import * as fs from 'fs';

const MOD = 1000000000;

const [n, k] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split(' ')
  .map(Number);

const cache = [...Array(n + 1)].map(() => Array(k + 1).fill(0));
cache[0].fill(1);

const dp = (a: number, b: number) => {
  if (cache[a][b] > 0) return cache[a][b];
  if (b === 1) return (cache[a][b] = 1);
  return (cache[a][b] = (dp(a - 1, b) + dp(a, b - 1)) % MOD);
};

console.log(dp(n, k));
