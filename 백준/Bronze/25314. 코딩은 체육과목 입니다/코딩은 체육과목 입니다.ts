import * as fs from "fs";
const n = +fs.readFileSync("/dev/stdin").toString();

const arr = Array(n / 4).fill('long');
arr.push('int');
console.log(arr.join(' '));