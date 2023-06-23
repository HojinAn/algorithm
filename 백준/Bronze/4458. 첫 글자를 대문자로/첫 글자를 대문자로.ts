import * as fs from 'fs';
const [, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
console.log(inp.map((li) => li[0].toUpperCase() + li.slice(1)).join('\n'));
