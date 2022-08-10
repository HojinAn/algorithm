import * as fs from "fs";
const [str1, str2, s] = fs
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split("\n"),
  [n, m] = [+str1, +str2],
  dp = Array(s.length).fill(0);
for (let i = 2; i < m; i++) {
  if (s[i - 1] === "O" && s[i] === "I") {
    if (s[i - 2] === "I") dp[i] = dp[i - 2] + 1;
    i++;
  }
}
let ans = 0;
dp.forEach((el) => el >= n && ans++);
console.log(ans);
