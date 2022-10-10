import * as fs from "fs";
const [n, m] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

let cnt = 0;
if (n == 1) cnt = 1;
else if (n == 2) cnt = Math.min(4, Math.floor((m + 1) / 2));
else if (m < 7) cnt = Math.min(4, m);
else cnt = m - 2;
console.log(cnt);
