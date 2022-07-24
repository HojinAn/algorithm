import * as fs from "fs";
const [[n], arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.trim().split(" ").map(Number));
const LDS: number[] = [arr[0]],
  loweBound = (arr: number[], target: number) => {
    let r = arr.length,
      l = 0,
      m: number;
    while (l < r) {
      m = Math.floor((l + r) / 2);
      arr[m] <= target ? (r = m) : (l = m + 1);
    }
    return r;
  };
arr.forEach((el) => (LDS[loweBound(LDS, el)] = el));
console.log(LDS.length);
