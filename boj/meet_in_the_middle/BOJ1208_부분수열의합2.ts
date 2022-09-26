import * as fs from "fs";
const [[n, s], nums] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.trim().split(" ").map(Number));
nums.sort((a, b) => a - b);
const mid = Math.floor(n / 2);
const front: number[] = [];
const back: number[] = [];

const subSet = (sum: number, from: number, to: number, arr: number[]) => {
  if (from === to) {
    arr.push(sum);
    return;
  }
  subSet(sum, from + 1, to, arr);
  subSet(sum + nums[from], from + 1, to, arr);
};

subSet(0, 0, mid, front);
subSet(0, mid, n, back);

front.sort((a, b) => a - b);
back.sort((a, b) => a - b);

const fLen = front.length,
  bLen = back.length;

let answer = 0;
let l = 0,
  r = bLen - 1,
  sum = 0;

while (l < fLen && r >= 0) {
  sum = front[l] + back[r];
  if (sum === s) {
    const lVal = front[l];
    const rVal = back[r];
    let lCnt = 0,
      rCnt = 0;
    while (l < fLen && front[l] === lVal) l++, lCnt++;
    while (r >= 0 && back[r] === rVal) r--, rCnt++;
    answer += lCnt * rCnt;
  } else if (sum > s) r--;
  else l++;
}

s || answer--;
console.log(answer);
