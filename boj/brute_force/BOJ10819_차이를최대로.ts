import * as fs from "fs";
const [[n], nums] = fs
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split("\n")
    .map((el) => el.trim().split(" ").map(Number)),
  numbers: number[] = [];
let ans = 0;
const combi = (depth: number, start: number, visited: number) => {
  if (depth === n) {
    ans = Math.max(
      ans,
      numbers.reduce(
        (acc, cur, i, arr) => (i ? acc + Math.abs(cur - arr[i - 1]) : 0),
        0
      )
    );
    return;
  }
  nums.forEach((el, i) => {
    if (!((1 << i) & visited)) {
      numbers[depth] = el;
      combi(depth + 1, i, visited | (1 << i));
    }
  });
};
combi(0, 0, 0);
console.log(ans);
