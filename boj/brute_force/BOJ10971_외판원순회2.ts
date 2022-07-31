import * as fs from "fs";
const [[n], ...costs] = fs
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split("\n")
    .map((li) => li.trim().split(" ").map(Number)),
  numbers = [0];
let answer = 10000000000;
const travel = (
  start: number,
  from: number,
  depth: number,
  visited: number
) => {
  if (depth === n) {
    if (costs[from][start]) {
      numbers[0] = costs[from][start];
      answer = Math.min(
        answer,
        numbers.reduce((acc, cur) => acc + cur)
      );
    }
    return;
  }
  for (let i = 0; i < n; i++) {
    if (costs[from][i] && !(visited & (1 << i))) {
      numbers[depth] = costs[from][i];
      travel(start, i, depth + 1, visited | (1 << i));
    }
  }
};
for (let i = 0; i < n; i++) travel(i, i, 1, 1 << i);
console.log(answer);
