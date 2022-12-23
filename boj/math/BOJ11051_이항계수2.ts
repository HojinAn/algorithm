import * as fs from 'fs';
const [n, k] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split(' ')
  .map(Number);
const DIV = 10007;
const dp = [...Array(n + 1)].map(() => Array(n + 1).fill(0));
for (let i = 0; i <= n; i++)
  for (let j = 0; j <= i; j++)
    dp[i][j] = j ? (dp[i - 1][j - 1] + dp[i - 1][j]) % DIV : 1;
console.log(dp[n][k] % DIV);
