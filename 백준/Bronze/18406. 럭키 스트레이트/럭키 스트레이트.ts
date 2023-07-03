import * as fs from 'fs';
const s = fs.readFileSync('/dev/stdin').toString().trim().split('').map(Number);
console.log(s.slice(0, s.length / 2).reduce((a, b) => a + b) === s.slice(s.length / 2).reduce((a, b) => a + b) ? 'LUCKY' : 'READY');
