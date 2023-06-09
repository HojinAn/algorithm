import * as fs from 'fs';
console.log(
  +fs
    .readFileSync('/dev/stdin')
    .toString()
    .trim()
    .split(' ')
    .map((li) => li.trim().split('').reverse().join(''))
    .map(Number)
    .reduce((a, b) => a + b)
    .toString()
    .split('')
    .reverse()
    .join('')
);
