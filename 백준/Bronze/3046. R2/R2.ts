import * as fs from 'fs';
const inp = fs.readFileSync('/dev/stdin');
const [r1, s] = inp.toString().trim().split(' ').map(Number);
console.log(2 * s - r1);
