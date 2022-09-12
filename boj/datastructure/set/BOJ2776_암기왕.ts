import * as fs from "fs";
const [TC, ...inp] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
let T = +TC;
let idx = 0;
let ans: string[] = [];
while (T--) {
  const n = +inp[idx++];
  const set = new Set<number>();
  const tmp: number[] = [];
  inp[idx++]
    .trim()
    .split(" ")
    .map(Number)
    .forEach((el) => set.add(el));
  const m = +inp[idx++];
  inp[idx++]
    .trim()
    .split(" ")
    .map(Number)
    .forEach((el) => tmp.push(set.has(el) ? 1 : 0));
  ans.push(tmp.join("\n"));
}
console.log(ans.join("\n"));
