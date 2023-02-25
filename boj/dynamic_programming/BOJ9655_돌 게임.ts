import * as fs from 'fs';
const n = Number(fs.readFileSync('/dev/stdin').toString());

const cache = Array(n + 1).fill(0);
cache[1] = 1;

for (let i = 2; i <= n; i++) cache[i] = (cache[i - 1] + 1) % 2;

console.log(cache[n] ? 'SK' : 'CY');
