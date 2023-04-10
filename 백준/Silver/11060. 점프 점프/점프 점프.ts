import * as fs from 'fs';
const [S1, S2] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const INF = 1000000;
const n = +S1;
const jumpCnts = S2.trim().split(' ').map(Number);
const cache = Array(n).fill(INF);
cache[0] = 0;
jumpCnts.forEach((cnt, idx) => {
  for (let i = 1; i <= cnt; i++)
    idx + i < n && (cache[idx + i] = Math.min(cache[idx] + 1, cache[idx + i]));
});

console.log(cache[n - 1] === INF ? -1 : cache[n - 1]);
