import * as fs from 'fs';
const [, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

console.log(
  inp
    .reduce(
      (arr, li) => (arr.push(...li.trim().split(' ').map(Number)), arr),
      <number[]>[]
    )
    .sort((a, b) => a - b)
    .join(' ')
);
