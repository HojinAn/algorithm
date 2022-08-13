import * as fs from "fs";
const [[n, m], ...brands] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.trim().split(" ").map(Number));
const pack: number[] = [],
  one: number[] = [];
brands.forEach(([c1, c2]) => {
  pack.push(c1);
  one.push(c2);
});
pack.sort((a, b) => a - b);
one.sort((a, b) => a - b);
const smallest = Math.min(pack[0], 6 * one[0]);
console.log(
  smallest * Math.floor(n / 6) + Math.min(smallest, (n % 6) * one[0])
);
