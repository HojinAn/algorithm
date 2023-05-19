import * as fs from 'fs';
const n = +fs.readFileSync('/dev/stdin').toString();
console.log(1 << n);