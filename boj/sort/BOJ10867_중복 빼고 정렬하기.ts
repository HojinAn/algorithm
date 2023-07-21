import * as fs from 'fs';
const [, b] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
console.log(Array.from(b.trim().split(' ').map(Number).reduce((set, n)=>set.add(n), new Set<number>()).values()).sort((a, b)=>a-b).join(' '))
