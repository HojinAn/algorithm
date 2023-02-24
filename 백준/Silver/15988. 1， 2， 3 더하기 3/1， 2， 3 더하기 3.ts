import * as fs from 'fs';

const MOD = 1000000009;
const MAX_LEN = 1000000;

const [, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const cache = Array(MAX_LEN + 1).fill(0);

cache[1] = 1;
cache[2] = 2;
cache[3] = 4;
for (let i = 4; i <= MAX_LEN; i++)
  cache[i] = (cache[i - 1] + cache[i - 2] + cache[i - 3]) % MOD;

console.log(
  inp
    .reduce<number[]>((ans, t) => (ans.push(cache[Number(t)]), ans), [])
    .join('\n')
);
