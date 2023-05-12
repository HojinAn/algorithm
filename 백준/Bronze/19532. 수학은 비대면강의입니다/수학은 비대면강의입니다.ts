import * as fs from "fs";
const [a, b, c, d, e, f] = fs.readFileSync("/dev/stdin").toString().trim().split(" ").map(Number);
console.log(
  `${(c * e - b * f) / (a * e - b * d)} ${(c * d - a * f) / (b * d - a * e)}`
);