import * as fs from "fs";
const arr = fs.readFileSync("/dev/stdin").toString().trim().split(""),
  ans: string[] = [];
arr.forEach((_, i) => ans.push(arr.slice(i).join("")));
console.log(ans.sort().join("\n").trim());
