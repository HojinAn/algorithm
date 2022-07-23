import * as fs from "fs";
const [n] = fs
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split("\n")
    .map(Number),
  costs = [500, 100, 50, 10, 5, 1];
let exchange = 1000 - n;
console.log(
  costs.reduce((acc, cur) => {
    acc += Math.floor(exchange / cur);
    exchange %= cur;
    return acc;
  }, 0)
);
