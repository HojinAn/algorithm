import * as fs from "fs";
let [n, kim, lim] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(Number);
let cnt = 1;
if (kim > lim) [kim, lim] = [lim, kim];
while (lim - kim !== 1 || lim % 2)
  (lim = Math.ceil(lim / 2)), (kim = Math.ceil(kim / 2)), cnt++;
console.log(cnt);
