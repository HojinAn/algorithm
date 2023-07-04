import * as fs from 'fs';
const [, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
console.log(inp.map((s) => s.toLowerCase()).join('\n'));
