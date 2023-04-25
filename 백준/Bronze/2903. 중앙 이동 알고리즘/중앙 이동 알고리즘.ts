import * as fs from 'fs';
const n = +fs.readFileSync('/dev/stdin').toString();
const dots = BigInt(2 ** n) + BigInt(1);
console.log(`${dots * dots}`);
