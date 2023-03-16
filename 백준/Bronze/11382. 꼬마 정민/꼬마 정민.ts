import * as fs from "fs";
const inp = fs.readFileSync("/dev/stdin").toString().trim().split(" ");
console.log(inp.map(Number).reduce((s, n)=>s+n));
