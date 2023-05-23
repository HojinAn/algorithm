import * as fs from 'fs';
const [, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

console.log(
  inp
    .map((str) =>
      str
        .trim()
        .split(' ')
        .map((s) => s.trim().split('').reverse().join(''))
        .join(' ')
    )
    .join('\n')
);