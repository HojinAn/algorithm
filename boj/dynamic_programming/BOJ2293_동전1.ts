import * as fs from "fs";
const str = fs.readFileSync("/dev/stdin").toString().trim();

let idx = 0;
while (str[idx] !== "\n") idx++;
const [n, k] = str.slice(0, idx).trim().split(" ").map(Number);
const values = str.slice(idx).trim().split("\n").map(Number);
const dp = Array(k + 1).fill(0);

dp[0] = 1;
for (const value of values)
  for (let j = value; j <= k; j++) dp[j] += dp[j - value];

console.log(dp[k]);
