import * as fs from 'fs';
const a = fs.readFileSync('/dev/stdin').toString().trim();

console.log(a.charCodeAt(0) - 44031);
