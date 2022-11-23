import * as fs from 'fs';
const [[, L], heights] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map((el) => el.trim().split(' ').map(Number));
console.log(
  heights
    .sort((a, b) => a - b)
    .reduce((ans, height) => (ans += height <= ans ? 1 : 0), L)
);
