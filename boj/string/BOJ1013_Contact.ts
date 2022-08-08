import * as fs from "fs";
const [n, ...wave] = fs
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split("\n"),
  source = /^(100+1+|01)+$/;
let answer = "";
wave.forEach((el) => (answer += `${el.trim().match(source) ? "YES" : "NO"}\n`));
console.log(answer.trim());
