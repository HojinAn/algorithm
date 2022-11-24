import * as fs from 'fs';
const N = Number(fs.readFileSync('/dev/stdin').toString());

const dp = <number[]>[];
const DEVIATION = 1000000;
const DIV = 1_000_000_000;
dp[DEVIATION] = 0;
dp[DEVIATION + 1] = 1;
for (let i = DEVIATION + 2; i <= DEVIATION + DEVIATION; i++)
  dp[i] = (dp[i - 1] + dp[i - 2]) % DIV;
for (let i = DEVIATION - 1; i >= 0; i--) dp[i] = (dp[i + 2] - dp[i + 1]) % DIV;
console.log(dp[N + DEVIATION] > 0 ? 1 : dp[N + DEVIATION] < 0 ? -1 : 0);
console.log(Math.abs(dp[N + DEVIATION]));
