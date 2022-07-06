import * as fs from "fs";
const [input1, input2] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const n = +input1,
  A = input2.trim().split(" ").map(BigInt),
  LIS: bigint[] = [],
  idxArr: number[] = [];

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

A.forEach((el, i) => (LIS[(idxArr[i] = lowBound(LIS, el))] = el));

const LISLen = LIS.length;
let answer = `${LISLen}\n`,
  idx = LISLen - 1;
for (let i = n - 1; i >= 0; i--) idxArr[i] === idx && (LIS[idx--] = A[i]);
LIS.forEach((el) => (answer += `${el} `));
console.log(answer.trim());
