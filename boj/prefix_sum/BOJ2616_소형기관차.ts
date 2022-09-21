import * as fs from "fs";
const [[n], customers, [limit]] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.trim().split(" ").map(Number));

customers.unshift(0);
const sumTable = [0];

for (let i = 1; i <= n; i++) sumTable[i] = sumTable[i - 1] + customers[i];

const dp = [...Array(n + 1)].map(() => Array(3).fill(0));

for (let i = limit; i <= n; i++)
  dp[i][0] = Math.max(dp[i - 1][0], sumTable[i] - sumTable[i - limit]);

for (let i = 2 * limit; i <= n; i++)
  dp[i][1] = Math.max(
    dp[i - limit][0] + sumTable[i] - sumTable[i - limit],
    dp[i - 1][1]
  );

for (let i = 3 * limit; i <= n; i++)
  dp[i][2] = Math.max(
    dp[i - limit][1] + sumTable[i] - sumTable[i - limit],
    dp[i - 1][2]
  );

console.log(dp[n][2]);
