import * as fs from 'fs';

const MOD = 9901;

const sum = (idx: number) => (s: number, n: number, i: number) =>
  idx && i === idx ? s : (s + n) % MOD;

const n = Number(fs.readFileSync('/dev/stdin').toString());
const cache = [...Array(2)].map(() => [0, 0, 0]);
cache[1].fill(1);

for (let i = 2; i <= n; i++)
  for (let j = 0; j < 3; j++)
    cache[i % 2][j] = cache[(i - 1) % 2].reduce(sum(j));

console.log(cache[n % 2].reduce(sum(0)));
