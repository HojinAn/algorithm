import * as fs from 'fs';
const a = fs.readFileSync('/dev/stdin').toString().trim();
console.log(parseInt(a, 16));
