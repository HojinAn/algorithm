import * as fs from 'fs';
const str = fs.readFileSync('/dev/stdin').toString().trim();
const aeiou = new Set(['a', 'e', 'i', 'o', 'u']);
console.log(str.split('').reduce((cnt, s)=>cnt + (aeiou.has(s) ? 1 : 0), 0));