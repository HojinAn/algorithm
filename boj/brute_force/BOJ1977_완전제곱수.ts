import * as fs from "fs";
const [m, n] = fs
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split("\n")
    .map(Number),
  start = Math.ceil(Math.sqrt(m)),
  end = Math.floor(Math.sqrt(n));
let answer = 0;
for (let i = start; i <= end; i++) answer += i ** 2;
console.log(answer ? `${answer}\n${start ** 2}` : `-1`);
