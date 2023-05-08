import * as fs from "fs";
const n = +fs.readFileSync("/dev/stdin").toString();
console.log(`${n * (n - 1) / 2}\n2`);