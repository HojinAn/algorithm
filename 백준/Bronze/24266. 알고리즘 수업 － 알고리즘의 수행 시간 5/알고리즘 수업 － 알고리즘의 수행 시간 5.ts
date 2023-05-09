import * as fs from "fs";
const n = BigInt(fs.readFileSync("/dev/stdin").toString());
console.log(`${n * n * n}\n3`);