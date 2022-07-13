import * as fs from "fs";
const [str1, str2] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [arr1, arr2] = [str1.trim().split(""), str2.trim().split("")];
const [n, m] = [arr1.length, arr2.length];
const LCS: number[][] = [...Array(n + 1)].map(() => Array(m + 1).fill(0));
for (let i = 1; i <= n; i++)
  for (let j = 1; j <= m; j++)
    if (arr1[i - 1] === arr2[j - 1]) LCS[i][j] = LCS[i - 1][j - 1] + 1;
    else LCS[i][j] = Math.max(LCS[i - 1][j], LCS[i][j - 1]);
let answer = 0;
LCS.forEach((li) => li.forEach((el) => (answer = Math.max(answer, el))));
console.log(answer);
