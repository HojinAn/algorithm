import * as fs from 'fs';

const INF = 1000000;
const S = fs.readFileSync('/dev/stdin').toString();
const n = Number(S);

const cache = Array(n + 1).fill(INF);

cache[2] = 1;
cache[4] = 2;
cache[5] = 1;

for (let i = 6; i <= n; i++)
  cache[i] = Math.min(cache[i - 2] + 1, cache[i - 5] + 1);

console.log(cache[n] === INF ? -1 : cache[n]);
