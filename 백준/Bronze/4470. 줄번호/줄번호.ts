import * as fs from 'fs';
const [, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
console.log(inp.map((li, i)=>`${i+1}. ${li}`).join('\n'));