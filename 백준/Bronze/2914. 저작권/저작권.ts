import * as fs from "fs";
const [a, b] = fs.readFileSync("/dev/stdin").toString().trim().split(" ").map(Number);
console.log(a * (b - 1) + 1);