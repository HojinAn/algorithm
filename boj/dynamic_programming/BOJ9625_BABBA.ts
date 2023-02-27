import * as fs from 'fs';
const s = fs.readFileSync('/dev/stdin').toString();
const n = Number(s);

const cache = [...Array(n + 1)].map(() => [0, 0]);
cache[0] = [1, 0];
cache[1] = [0, 1];

for (let i = 2; i <= n; i++) {
  cache[i][0] = cache[i - 1][1];
  cache[i][1] = cache[i - 1][0] + cache[i - 1][1];
}

console.log(cache[n].join(' '));
