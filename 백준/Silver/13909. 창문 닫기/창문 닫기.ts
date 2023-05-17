import * as fs from "fs";
const n = +fs.readFileSync("/dev/stdin").toString();
let cnt = 0;
for (let i = 1; i * i <= n; i++) cnt++
console.log(cnt);