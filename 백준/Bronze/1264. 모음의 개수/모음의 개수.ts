import * as fs from "fs";
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
input.pop();
const aeiou = new Set<string>(['a', 'e', 'i', 'o', 'u']);
console.log(input.map((li)=> li.split('').reduce((cnt, s) => cnt + (aeiou.has(s.toLowerCase()) ? 1 : 0), 0)).join('\n'))