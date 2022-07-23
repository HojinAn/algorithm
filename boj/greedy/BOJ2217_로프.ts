import * as fs from "fs";
const [n, ...weights] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);
weights.sort((a, b) => a - b);
console.log(weights.reduce((acc, cur, i) => Math.max(acc, cur * (n - i)), 0));
