import * as fs from "fs";
const [[n], ...map] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.trim().split(" ").map(Number));

let min = Number.MAX_VALUE;

const BT = (depth: number, start: number, visited: number) => {
  if (depth === n / 2) {
    let start = 0,
      link = 0;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        visited & (1 << i) && visited & (1 << j) && (start += map[i][j]);
        visited & (1 << i) || visited & (1 << j) || (link += map[i][j]);
      }
    }
    min = Math.min(Math.abs(start - link), min);
    return;
  }
  for (let i = start; i < n; i++)
    if (!(visited & (1 << i))) BT(depth + 1, i, visited | (1 << i));
};
BT(0, 0, 0);
console.log(min);
