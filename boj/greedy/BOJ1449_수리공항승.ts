import * as fs from "fs";
const [[n, l], pos] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.trim().split(" ").map(Number));
pos.sort((a, b) => a - b);
let left = pos[0] - 0.5,
  cnt = 1;
pos.forEach((el) => left + l < el && (cnt++, (left = el - 0.5)));
console.log(cnt);
