import * as fs from "fs";
const [str1, str2, str3] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [A, B] = [
  str2
    .trim()
    .split(" ")
    .map(Number)
    .sort((a, b) => a - b),
  str3
    .trim()
    .split(" ")
    .map(Number)
    .sort((a, b) => b - a),
];
console.log(A.reduce((prev, cur, i) => prev + cur * B[i], 0));
