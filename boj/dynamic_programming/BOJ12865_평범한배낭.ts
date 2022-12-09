import * as fs from 'fs';
const [str1, ...input] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');

const [n, k] = str1.trim().split(' ').map(Number);
console.log(
  input
    .map((el) => el.trim().split(' ').map(Number))
    .sort(([w1, v1], [w2, v2]) => (v1 === v2 ? w1 - w2 : v2 - v1))
    .reduce(
      (dp, [w, v], i) => {
        for (let j = 1; j <= k; j++)
          dp[i + 1][j] =
            w <= j ? Math.max(dp[i][j], dp[i][j - w] + v) : dp[i][j];
        return dp;
      },
      [...Array(n + 1)].map(() => Array(k + 1).fill(0))
    )[n][k]
);
