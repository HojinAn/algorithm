import * as fs from "fs";
const inputList = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [n, c] = inputList[0].trim().split(" ").map(Number);
const items = inputList[1].trim().split(" ").map(Number);

const listA: number[] = [];
const listB: number[] = [];
let idx,
  mid,
  cnt = 0;

const findA = (k: number, sum: number) => {
  if (sum > c) return;
  if (k === Math.floor(n / 2)) {
    listA.push(sum);
    return;
  }
  findA(k + 1, sum);
  findA(k + 1, sum + items[k]);
};
const findB = (k: number, sum: number) => {
  if (sum > c) return;
  if (k === n) {
    listB.push(sum);
    return;
  }
  findB(k + 1, sum);
  findB(k + 1, sum + items[k]);
};
const binarySearch = (left: number, right: number, value: number) => {
  idx = -1;
  while (left <= right) {
    mid = Math.floor((left + right) / 2);
    if (listB[mid] + value <= c) {
      idx = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  cnt += idx + 1;
};

findA(0, 0);
findB(Math.floor(n / 2), 0);

listB.sort((a, b) => a - b);

const listBLen = listB.length;
listA.forEach((el) => {
  binarySearch(0, listBLen - 1, el);
});

console.log(cnt);
