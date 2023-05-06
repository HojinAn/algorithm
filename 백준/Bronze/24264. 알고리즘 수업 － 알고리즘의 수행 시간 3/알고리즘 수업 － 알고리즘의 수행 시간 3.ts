import * as fs from 'fs';
const n = +fs.readFileSync('/dev/stdin').toString();
console.log(`${n ** 2}\n2`);