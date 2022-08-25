import * as fs from "fs";
const [[n, m], arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.trim().split(" ").map(Number));
arr.sort((a, b) => a - b);
const numbers: number[][] = [];
const repetCombi = (
  cnt: number,
  numArr: number[],
  start: number,
  visited: number
) => {
  if (cnt === m) {
    numbers.push(numArr);
    return;
  }
  for (let i = start; i < n; i++) {
    if (visited & (1 << i)) continue;
    repetCombi(cnt + 1, [...numArr, arr[i]], i, visited | (1 << i));
  }
};
repetCombi(0, [], 0, 0);
console.log(
  numbers
    .map((el) => el.reduce((acc, cur) => acc + `${cur} `, "").trim())
    .join("\n")
);
