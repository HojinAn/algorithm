import * as fs from 'fs';

const INF = 100000000;
const [S, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const n = Number(S);

const costs = inp.map((li) => li.trim().split(' ').map(Number));

const cache = [...Array(n)].map(() => Array(1 << n).fill(INF));

const dp = (cur: number, bit: number) => {
  if (cur >= n) return 0;
  if (cache[cur][bit] !== INF) return cache[cur][bit];
  for (let i = 0; i < n; i++) {
    if (!(bit & (1 << i))) {
      cache[cur][bit] = Math.min(
        cache[cur][bit],
        costs[cur][i] + dp(cur + 1, bit | (1 << i))
      );
    }
  }
  return cache[cur][bit];
};

console.log(dp(0, 0));
