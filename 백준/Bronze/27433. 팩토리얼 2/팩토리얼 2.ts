import * as fs from "fs";
const n = BigInt(fs.readFileSync("/dev/stdin").toString());
const ONE = BigInt(1);
const facto = (no : bigint) => !no ? ONE : no * facto(no - ONE);
console.log(`${facto(n)}`);