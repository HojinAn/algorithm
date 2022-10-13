import * as fs from "fs";
const [[n], arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.trim().split(" ").map(Number));

const dp = [...Array(n)].map((_, i) => [arr[i], arr[i]]);

for (let i = 1; i < n; i++)
  for (let j = 0; j <= i; j++)
    if (dp[i][1] > dp[j][1]) dp[i][0] = Math.max(dp[i][0], dp[i][1] + dp[j][0]);

let ans = 0;
dp.forEach(([el]) => (ans = Math.max(ans, el)));

console.log(ans);
