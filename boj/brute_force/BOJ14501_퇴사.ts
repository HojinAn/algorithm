import * as fs from "fs";
const [str1, ...str2] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [n, table] = [+str1, str2.map((el) => el.trim().split(" ").map(Number))],
  dp: number[] = Array(n + 1).fill(0);
table.forEach((el, i) => {
  const [t, p] = el;
  i + t <= n && (dp[i + t] = Math.max(dp[i + t], dp[i] + p));
  dp[i + 1] = Math.max(dp[i + 1], dp[i]);
});
console.log(dp[n]);
