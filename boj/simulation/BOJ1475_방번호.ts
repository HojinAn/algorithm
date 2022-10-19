import * as fs from "fs";
const arr = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("")
  .map((el) => (+el === 9 ? 6 : +el));
const counter = new Map([...Array(9)].map((_, i) => [i, 0]));
arr.forEach((el) => counter.set(el, counter.get(el)! + 1));
console.log(
  Array.from(counter).reduce(
    (answer, [k, v]) => Math.max(answer, k === 6 ? Math.ceil(v / 2) : v),
    0
  )
);
