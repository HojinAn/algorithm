import * as fs from "fs";
const n = +fs.readFileSync("/dev/stdin").toString(),
  dp = Array(n + 1).fill(0);
(dp[0] = 1), (dp[1] = 1);
for (let i = 2; i <= n; i++) dp[i] = (dp[i - 2] * 2 + dp[i - 1]) % 10007;
console.log(dp[n]);
