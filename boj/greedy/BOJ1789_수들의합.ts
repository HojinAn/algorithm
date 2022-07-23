import * as fs from "fs";
let s = +fs.readFileSync("/dev/stdin").toString(),
  i = 1;
while (s >= i) s -= i++;
console.log(--i);
