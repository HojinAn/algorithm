import * as fs from 'fs';

const MOD = 1000000009;
const [, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const cache = [...Array(100001)].map(() => [0, 0, 0]);
cache[1][0] = 1;
cache[2][1] = 1;
cache[3][0] = 1;
cache[3][1] = 1;
cache[3][2] = 1;

const sum = (acc: number, no: number) => (acc + no) % MOD;

for (let i = 4; i <= 100000; i++) {
  cache[i][0] = (cache[i - 1][1] + cache[i - 1][2]) % MOD;
  cache[i][1] = (cache[i - 2][0] + cache[i - 2][2]) % MOD;
  cache[i][2] = (cache[i - 3][0] + cache[i - 3][1]) % MOD;
}

console.log(
  inp
    .reduce<number[]>(
      (ans, s) => (ans.push(cache[Number(s)].reduce(sum)), ans),
      []
    )
    .join('\n')
);
