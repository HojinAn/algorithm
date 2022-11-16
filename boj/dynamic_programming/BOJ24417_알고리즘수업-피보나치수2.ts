import * as fs from 'fs';
const n = +fs.readFileSync('/dev/stdin').toString();
const DIV = 1_000_000_007;
const dp = [2, 1, 1];
for (let i = 4; i <= n; i++)
  dp[i % 3] = (dp[(i - 1) % 3] + dp[(i - 2) % 3]) % DIV;
console.log(`${dp[n % 3]} ${(n - 2) % DIV}`);
