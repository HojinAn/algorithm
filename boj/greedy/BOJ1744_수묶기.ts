import * as fs from "fs";
const [n, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);
arr.sort((a, b) => a - b);
let idx = 0;
for (idx; idx < n; idx++) if (arr[idx] >= 0) break;
const arrL = arr.slice(0, idx);
const arrZero: number[] = [];
for (idx; idx < n; idx++) {
  if (arr[idx]) break;
  arrZero.push(arr[idx]);
}
const arrR = arr.slice(idx);
const [{ length: lenL }, { length: lenR }] = [arrL, arrR];
idx = 0;
let ans = 0;
if (lenL > 1)
  for (idx; idx < lenL - 1; idx += 2) ans += arrL[idx] * arrL[idx + 1];
if (arrL[idx]) ans += arrZero.length ? 0 : arrL[idx];
if (lenR > 1)
  for (idx = lenR - 1; idx >= 1; idx -= 2)
    ans += Math.max(arrR[idx] * arrR[idx - 1], arrR[idx] + arrR[idx - 1]);
if (arrR[idx]) ans += arrR[idx];
console.log(ans);
