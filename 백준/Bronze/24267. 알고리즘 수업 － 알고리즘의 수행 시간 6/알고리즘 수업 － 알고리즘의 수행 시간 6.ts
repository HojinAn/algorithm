import * as fs from "fs";
const n = BigInt(fs.readFileSync("/dev/stdin").toString());
console.log(`${n * (n - BigInt(1)) * (n - BigInt(2)) / BigInt(6)}\n3`);