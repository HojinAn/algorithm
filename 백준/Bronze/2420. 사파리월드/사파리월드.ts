import * as fs from 'fs';
const inp = fs.readFileSync('/dev/stdin').toString();
const [n, m] = inp.trim().split(' ').map(Number);
console.log(Math.abs(m - n));
