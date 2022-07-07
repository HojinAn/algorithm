import * as fs from "fs";
const [input1, input2, input3, input4, input5] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const T = BigInt(input1.trim()),
  n = +input2,
  A = input3.trim().split(" ").map(BigInt),
  m = +input4,
  B = input5.trim().split(" ").map(BigInt),
  listA: bigint[] = [],
  listB: bigint[] = [];

for (let i = 0; i < n; i++) {
  let sum = BigInt(0);
  for (let j = i; j < n; j++) {
    sum += A[j];
    listA.push(sum);
  }
}
for (let i = 0; i < m; i++) {
  let sum = BigInt(0);
  for (let j = i; j < m; j++) {
    sum += B[j];
    listB.push(sum);
  }
}
listA.sort((a, b) => Number(a - b));
listB.sort((a, b) => Number(a - b));
let ans = 0,
  cntA,
  cntB,
  l,
  r,
  mid,
  elA;
const upperBound = (arr: bigint[], target: bigint) => {
  l = 0;
  r = arr.length;
  while (l < r) {
    mid = Math.floor((l + r) / 2);
    arr[mid] > target ? (r = mid) : (l = mid + 1);
  }
  return r;
};
const lowerBound = (arr: bigint[], target: bigint) => {
  l = 0;
  r = arr.length;
  while (l < r) {
    mid = Math.floor((l + r) / 2);
    arr[mid] >= target ? (r = mid) : (l = mid + 1);
  }
  return r;
};

for (let i = 0; i < listA.length; ) {
  elA = listA[i];
  cntA = upperBound(listA, elA) - lowerBound(listA, elA);
  cntB = upperBound(listB, T - elA) - lowerBound(listB, T - elA);
  ans += cntA * cntB;
  i += cntA;
}
console.log(ans);
