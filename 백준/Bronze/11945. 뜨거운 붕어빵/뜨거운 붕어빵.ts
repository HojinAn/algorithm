import * as fs from 'fs';
const [, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
console.log(inp.map((li) => li.trim().split('').reverse().join('')).join('\n'));
