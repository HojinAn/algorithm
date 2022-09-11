import * as fs from "fs";
const [[n, m], lessons] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.trim().split(" ").map(Number));

const isPossible = (target: number) => {
  let val = 0;
  const arr: number[] = [];
  for (let i = 0; i < n; i++) {
    const item = lessons[i];
    if (item > target) return false;
    val + item <= target ? (val += item) : (arr.push(val), (val = item));
    i === n - 1 && arr.push(val);
  }
  return arr.length <= m;
};

let l = 1,
  r = 10000000000;
while (l <= r) {
  const mid = Math.floor((l + r) / 2);
  isPossible(mid) ? (r = mid - 1) : (l = mid + 1);
}

console.log(r + 1);
