import * as fs from 'fs';
const n = +fs.readFileSync('/dev/stdin').toString();
const INF = 1000001;

const dp = Array(n + 1).fill(INF);
dp[0] = 0;
dp[1] = 1;
dp[2] = 2;
for (let i = 2; i * i <= n; i++) dp[i * i] = 1;

for (let i = 3; i <= n; i++)
  for (let j = 1; j * j <= i; j++)
    dp[i] = Math.min(dp[i], dp[i - j * j] + dp[j * j]);

console.log(dp[n]);
