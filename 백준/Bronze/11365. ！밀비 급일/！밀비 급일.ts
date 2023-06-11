import * as fs from 'fs';
const inp = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
inp.pop();
console.log(inp.map((s) => s.split('').reverse().join('')).join('\n'));
