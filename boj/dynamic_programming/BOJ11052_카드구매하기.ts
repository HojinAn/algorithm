import * as fs from "fs";
const [[n], nums] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.trim().split(" ").map(Number));
nums.unshift(0);
const dp = Array(n + 1).fill(0);
dp[1] = nums[1];
for (let i = 2; i <= n; i++)
  for (let j = 1; j <= i; j++) dp[i] = Math.max(dp[i - j] + nums[j], dp[i]);
console.log(dp[n]);
