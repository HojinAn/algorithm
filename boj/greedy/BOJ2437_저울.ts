import * as fs from "fs";
const [[n], weights] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.trim().split(" ").map(Number));
weights.sort((a, b) => a - b);
let sum = 0;
for (let i = 0; i < n; i++) {
  if (sum + 1 < weights[i]) break;
  sum += weights[i];
}
console.log(sum + 1);
