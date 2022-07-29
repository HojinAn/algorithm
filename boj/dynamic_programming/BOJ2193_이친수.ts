import * as fs from "fs";
const n = +fs.readFileSync("/dev/stdin").toString(),
  dp = [...Array(n + 1)].map(() => [BigInt(0), BigInt(0)]);
dp[1][1] = BigInt(1);
for (let i = 2; i <= n; i++)
  dp[i] = [dp[i - 1][0] + dp[i - 1][1], dp[i - 1][0]];
console.log(dp[n][0] + dp[n][1] + "");
