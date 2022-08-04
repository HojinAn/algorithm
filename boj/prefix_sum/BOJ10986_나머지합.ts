import * as fs from "fs";
const [str1, str2] = fs
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split("\n"),
  [n, m] = str1.trim().split(" ").map(Number),
  arr = str2
    .trim()
    .split(" ")
    .map((el) => +el % m);

const cumulSum = arr
  .map(
    (
      (sum) => (value) =>
        (sum += value) % m
    )(0)
  )
  .sort((a, b) => a - b);

const lowerBound = (target: number) => {
  let l = 0,
    r = n;
  while (l < r) {
    const mid = Math.floor((l + r) / 2);
    cumulSum[mid] < target ? (l = mid + 1) : (r = mid);
  }
  return r;
};
const upperBound = (target: number) => {
  let l = 0,
    r = n;
  while (l < r) {
    const mid = Math.floor((l + r) / 2);
    cumulSum[mid] <= target ? (l = mid + 1) : (r = mid);
  }
  return r;
};

let answer = upperBound(0) - lowerBound(0);
answer += ((answer - 1) * answer) / 2;
for (let i = 1; i < m; i++) {
  const no = upperBound(i) - lowerBound(i);
  answer += ((no - 1) * no) / 2;
}
console.log(answer);
