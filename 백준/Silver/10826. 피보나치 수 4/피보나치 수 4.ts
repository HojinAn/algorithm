import * as fs from 'fs';
const s = fs.readFileSync('/dev/stdin').toString();
const n = Number(s);
const cache = Array(n + 1).fill(BigInt(0));
cache[1] = BigInt(1);
for (let i = 2; i <= n; i++) cache[i] = cache[i - 1] + cache[i - 2];
console.log(`${cache[n]}`);
