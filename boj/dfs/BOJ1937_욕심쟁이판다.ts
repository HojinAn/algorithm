import * as fs from "fs";
let answer = 0;
const [str1, ...str2] = fs
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split("\n"),
  [n, bamboo] = [+str1, str2.map((el) => el.trim().split(" ").map(Number))],
  dp: number[][] = [...Array(n)].map(() => Array(n).fill(0)),
  delta = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ],
  rangeCheck = (r: number, c: number) => 0 <= r && r < n && 0 <= c && c < n,
  dfs = (r: number, c: number) => {
    if (!dp[r][c]) {
      dp[r][c] = 1;
      delta.forEach(([dR, dC]) => {
        const [nR, nC] = [r + dR, c + dC];
        if (rangeCheck(nR, nC) && bamboo[r][c] < bamboo[nR][nC])
          dp[r][c] = Math.max(dp[r][c], dfs(nR, nC) + 1);
      });
    }
    return dp[r][c];
  };
bamboo.forEach((li, r) =>
  li.forEach((_, c) => (answer = Math.max(answer, dfs(r, c))))
);
console.log(answer);
