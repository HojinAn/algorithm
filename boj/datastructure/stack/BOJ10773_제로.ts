import * as fs from "fs";
const [, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);
const stack: number[] = [];
arr.forEach((el) => (el ? stack.push(el) : stack.pop()));
console.log(stack.reduce((acc, cur) => acc + cur, 0));
