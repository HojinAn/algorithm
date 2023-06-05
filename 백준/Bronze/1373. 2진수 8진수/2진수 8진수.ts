import * as fs from 'fs';
console.log(
  fs
    .readFileSync('/dev/stdin')
    .toString()
    .trim()
    .split('')
    .map(Number)
    .reverse()
    .reduce((acc, cur, idx) => {
      idx % 3 ? (acc[acc.length - 1] += cur * 2 ** (idx % 3)) : acc.push(cur);
      return acc;
    }, <number[]>[])
    .reverse()
    .join('')
);
