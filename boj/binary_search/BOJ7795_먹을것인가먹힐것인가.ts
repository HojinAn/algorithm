import * as fs from "fs";
const [s1, ...str] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let T = +s1;
let idx = 0;
const answer: number[] = [];

const upperBound = (target: number, arr: number[]) => {
  let l = 0,
    r = arr.length,
    mid = 0;
  while (l < r) {
    mid = Math.floor((l + r) / 2);
    arr[mid] > target ? (r = mid) : (l = mid + 1);
  }
  return r;
};
const lowerBound = (target: number, arr: number[]) => {
  let l = 0,
    r = arr.length,
    mid = 0;
  while (l < r) {
    mid = Math.floor((l + r) / 2);
    arr[mid] >= target ? (r = mid) : (l = mid + 1);
  }
  return r;
};

const solution = (arrA: number[], arrB: number[]) => {
  let cnt = 0;
  for (let i = 0, n = arrA.length; i < n; i++) {
    const aCur = arrA[i];
    const aNext = upperBound(aCur, arrA);
    const bCnt = lowerBound(aCur, arrB);
    const aCnt = aNext - i;
    cnt += aCnt * bCnt;
    i = aNext - 1;
  }
  return cnt;
};

while (T--) {
  idx++;
  const arrA = str[idx++]
    .trim()
    .split(" ")
    .map(Number)
    .sort((a, b) => a - b);
  const arrB = str[idx++]
    .trim()
    .split(" ")
    .map(Number)
    .sort((a, b) => a - b);
  answer.push(solution(arrA, arrB));
}
console.log(answer.join("\n"));
