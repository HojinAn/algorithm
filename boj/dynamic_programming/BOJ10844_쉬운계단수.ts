import * as fs from "fs";
const n = +fs.readFileSync("/dev/stdin").toString();

const dp = [...Array(n)].map(() => Array(10).fill(0));
const DIV = 1000000000;
dp[0].fill(1);
dp[0][0] = 0;

for (let i = 1; i < n; i++) {
  dp[i][0] = dp[i - 1][1] % DIV;
  for (let j = 1; j < 9; j++)
    dp[i][j] = (dp[i - 1][j - 1] + dp[i - 1][j + 1]) % DIV;
  dp[i][9] = dp[i - 1][8] % DIV;
}

console.log(dp[n - 1].reduce((acc, cur) => (acc + cur) % DIV));
