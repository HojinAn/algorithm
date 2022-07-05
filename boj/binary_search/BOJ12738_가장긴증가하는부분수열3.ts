import * as fs from "fs";
const [input1, input2] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const n = +input1,
  A = input2.trim().split(" ").map(BigInt),
  LIS: bigint[] = [];

const lowBound = (LIS: bigint[], target: bigint) => {
  let r = LIS.length,
    l = 0,
    mid: number;
  while (l < r) {
    mid = Math.floor((l + r) / 2);
    LIS[mid] >= target ? (r = mid) : (l = mid + 1);
  }
  return r;
};

A.forEach((el) => (LIS[lowBound(LIS, el)] = el));
console.log(LIS.length);
