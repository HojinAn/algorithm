import * as fs from "fs";
const inputList = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [str1, str2] = inputList;
const n = +str1;
const arr = str2.trim().split(" ").map(Number);

const LIS = Array(n).fill(1); // 최소증가개수수열
const LDS = Array(n).fill(1); // 최소감소개수수열

for (let i = 0; i < n; i++)
  for (let j = 0; j < i; j++)
    if (arr[j] < arr[i]) LIS[i] = Math.max(LIS[j] + 1, LIS[i]);

for (let i = n - 1; i >= 0; i--)
  for (let j = n - 1; j > i; j--)
    if (arr[j] < arr[i]) LDS[i] = Math.max(LDS[j] + 1, LDS[i]);

let ans = 0;
for (let i = 0; i < n; i++) ans = Math.max(LIS[i] + LDS[i], ans);

console.log(ans - 1); // 중복되어 세어진 것이 하나 있다.
