import * as fs from 'fs';
const inp = fs.readFileSync('/dev/stdin').toString();
const isUpper = (s: string) => s === s.toUpperCase();
console.log(
  inp
    .trim()
    .split('')
    .map((s) => (isUpper(s) ? s.toLowerCase() : s.toUpperCase()))
    .join('')
);
