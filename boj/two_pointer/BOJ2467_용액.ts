import * as fs from "fs";
const [[n], arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.trim().split(" ").map(Number));
let l = 0,
  r = n - 1,
  min = Math.abs(arr[l] + arr[r]);
const ans = [arr[l], arr[r]];
while (l + 1 < r) {
  const lSum = Math.abs(arr[l] + arr[r - 1]),
    rSum = Math.abs(arr[l + 1] + arr[r]),
    sm = lSum < rSum ? (r--, lSum) : (l++, rSum);
  if (min > sm) (min = sm), ([ans[0], ans[1]] = [arr[l], arr[r]]);
}
console.log(ans.join(" "));
