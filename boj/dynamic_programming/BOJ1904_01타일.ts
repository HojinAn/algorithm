import * as fs from "fs";
const n = +fs.readFileSync("/dev/stdin").toString();

const dp = [0, 1, 2];
for (let i = 3; i <= n; i++) dp[i] = (dp[i - 2] + dp[i - 1]) % 15746;

console.log(dp[n]);
