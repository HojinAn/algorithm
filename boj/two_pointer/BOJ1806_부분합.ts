import * as fs from "fs";
const [str1, str2] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [n, s] = str1.trim().split(" ").map(Number);
const arr = str2.trim().split(" ").map(Number);
const INF = 1000001;

let l = 0,
  r = 0,
  min = INF,
  sum = 0;
while (1) {
  if (sum >= s) (min = Math.min(min, r - l)), (sum -= arr[l++]);
  else if (r === n) break;
  else sum += arr[r++];
}
console.log(min === INF ? 0 : min);
