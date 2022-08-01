import * as fs from "fs";
const [x, y] = fs
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split(" ")
    .map(Number),
  getPercent = (c: number, p: number) => Math.floor((100 * c) / p),
  z = getPercent(y, x),
  MAX_VALUE = 2000000000;
let l = 0,
  r = MAX_VALUE;
while (l < r) {
  const mid = Math.floor((l + r) / 2),
    tmp = getPercent(y + mid, x + mid);
  tmp > z ? (r = mid) : (l = mid + 1);
}
console.log(r === MAX_VALUE ? -1 : r);
