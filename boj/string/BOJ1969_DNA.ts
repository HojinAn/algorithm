import * as fs from "fs";
const [str1, ...input] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [n, m] = str1.trim().split(" ").map(Number);
const arr = [...Array(m)].map(() => {
  return { A: 0, C: 0, G: 0, T: 0 };
});
input.forEach((li) => {
  for (let i = 0; i < m; i++) arr[i][li[i]]++;
});
const flat = arr.map((el) => Object.entries(el).sort((a, b) => b[1] - a[1]));
let DNA = "",
  cnt = 0;
flat.forEach((el) => {
  DNA += el[0][0];
  for (let i = 1; i < 4; i++) {
    cnt += el[i][1];
  }
});
console.log(`${DNA}\n${cnt}`);
