import * as fs from "fs";
const [[n, k], arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.trim().split(" ").map(Number));

let cnt = 0;
let ans = -1;

const merge = (a: number[], b: number[]) => {
  const arr: number[] = [];
  const aLen = a.length,
    bLen = b.length;
  let i = 0,
    j = 0;
  while (i < aLen && j < bLen) {
    const append = a[i] < b[j] ? a[i++] : b[j++];
    if (k === ++cnt) ans = append;
    arr.push(append);
  }
  while (i < aLen) {
    const append = a[i++];
    if (k === ++cnt) ans = append;
    arr.push(append);
  }
  while (j < bLen) {
    const append = b[j++];
    if (k === ++cnt) ans = append;
    arr.push(append);
  }
  return arr;
};

const mergeSort = (l: number, r: number) => {
  if (l < r) {
    const mid = Math.floor((l + r) / 2);
    return merge(mergeSort(l, mid), mergeSort(mid + 1, r));
  }
  return [arr[l]];
};

mergeSort(0, n - 1);

console.log(ans);
