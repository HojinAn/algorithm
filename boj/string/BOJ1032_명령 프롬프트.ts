import * as fs from 'fs';
const [, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

console.log(
  inp
    .map((s) => s.trim().split(''))
    .reduce(
      (ans, str) => ans.map((s, i) => (s === str[i] ? s : '?')),
      inp[0].split('')
    )
    .join('')
);
