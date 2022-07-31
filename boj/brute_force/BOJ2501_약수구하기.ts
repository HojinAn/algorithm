import * as fs from "fs";
const [n, k] = fs
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split(" ")
    .map(Number),
  q = [0];
for (let i = 1; i <= n; i++) !(n % i) && q.push(i);
console.log(q[k] ? q[k] : 0);
