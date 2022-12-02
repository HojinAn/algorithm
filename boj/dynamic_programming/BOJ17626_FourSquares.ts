import * as fs from 'fs';
const n = +fs.readFileSync('/dev/stdin').toString();

const INF = Number.MAX_VALUE;
const dp = [0];
dp[1] = 1;
for (let i = 2; i <= n; i++) {
  let min = INF;
  for (let j = 1; j * j <= i; j++) min = Math.min(min, dp[i - j * j]);
  dp[i] = min + 1;
}
console.log(dp[n]);
