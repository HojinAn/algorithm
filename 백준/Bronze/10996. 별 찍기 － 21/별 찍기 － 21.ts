import * as fs from 'fs';
const n = +fs.readFileSync('/dev/stdin').toString();
console.log([...Array(n * 2)].map((_, i) =>[...Array(n)].map((_, j) => (j % 2 === i % 2 ? '*' : ' ')).join('')).join('\n'));
