import * as fs from "fs";
const [str1, str2, str3] = fs
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split("\n"),
  [{ length: l }, { length: m }, { length: n }] = [str1, str2, str3],
  LCS: number[][][] = [...Array(l + 1)].map(() =>
    [...Array(m + 1)].map(() => Array(n + 1).fill(0))
  );
for (let i = 1; i <= l; i++)
  for (let j = 1; j <= m; j++)
    for (let k = 1; k <= n; k++)
      if (str1[i - 1] === str2[j - 1] && str2[j - 1] === str3[k - 1])
        LCS[i][j][k] = LCS[i - 1][j - 1][k - 1] + 1;
      else
        LCS[i][j][k] = Math.max(
          Math.max(
            LCS[i - 1][j][k],
            Math.max(LCS[i][j - 1][k], LCS[i][j][k - 1])
          ),
          Math.max(
            LCS[i - 1][j - 1][k],
            Math.max(LCS[i][j - 1][k - 1], LCS[i - 1][j][k - 1])
          )
        );
let answer = 0;
LCS.forEach((arr) =>
  arr.forEach((li) => li.forEach((el) => (answer = Math.max(answer, el))))
);
console.log(answer);
