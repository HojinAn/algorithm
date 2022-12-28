import * as fs from 'fs';
const [str1, ...inp] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');
const INF = Number.MAX_VALUE;
const mergeFiles = (fileSizes: number[], n: number, answer = 0) => {
  const dp = [...Array(n + 1)].map(() => Array(n + 1).fill(0));
  const sum = [0];
  for (let i = 1; i <= n; i++) sum[i] = sum[i - 1] + fileSizes[i - 1];

  for (let i = 1; i <= n; i++) {
    for (let from = 1; from + i <= n; from++) {
      const to = from + i;
      dp[from][to] = INF;
      for (let div = from; div < to; div++) {
        dp[from][to] = Math.min(
          dp[from][to],
          dp[from][div] + dp[div + 1][to] + sum[to] - sum[from - 1]
        );
      }
    }
  }
  return dp[1][n];
};
const ans = <number[]>[];
for (let i = 0, T = Number(str1); i < T; i++) {
  const k = Number(inp[2 * i]);
  const fileSizes = inp[2 * i + 1].trim().split(' ').map(Number);
  ans.push(mergeFiles(fileSizes, k));
}
console.log(ans.join('\n'));
