import * as fs from "fs";
const [str1, ...input] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [n, m] = str1.trim().split(" ").map(Number);
const matrixA = input.slice(0, n).map((li) => li.trim().split(" ").map(Number));
const [, k] = input[n].trim().split(" ").map(Number);
const matrixB = input
  .slice(n + 1)
  .map((li) => li.trim().split(" ").map(Number));
console.log(
  [...Array(n)]
    .map(() => Array(k).fill(0))
    .map((li, r) =>
      li
        .map((_, c) =>
          matrixA[r].reduce((acc, el, i) => acc + el * matrixB[i][c], 0)
        )
        .join(" ")
    )
    .join("\n")
);
