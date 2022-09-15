import * as fs from "fs";
const n = +fs.readFileSync("/dev/stdin").toString().trim();
const DIV = 1000000000;

const dp: number[][][] = [...Array(101)].map(() =>
  [...Array(10)].map(() => Array(1 << 10).fill(0))
);

for (let i = 1; i <= 9; i++) dp[1][i][1 << i] = 1;

for (let i = 2; i <= n; i++) {
  for (let j = 0; j < 10; j++) {
    for (let k = 0; k < 1 << 10; k++) {
      const bit = k | (1 << j);
      dp[i][j][bit] +=
        j === 0
          ? dp[i - 1][j + 1][k]
          : j === 9
          ? dp[i - 1][j - 1][k]
          : dp[i - 1][j - 1][k] + dp[i - 1][j + 1][k];
      dp[i][j][bit] %= DIV;
    }
  }
}

console.log(dp[n].reduce((acc, cur) => (acc + cur[(1 << 10) - 1]) % DIV, 0));
