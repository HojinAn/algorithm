import * as fs from 'fs';
const [, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const toNums = (str: string) => str.split(' ').map(Number);

const M = ([a, b]: number[]) => {
  while (a !== b) {
    if (a > b) a = Math.floor(a / 2);
    else b = Math.floor(b / 2);
  }
  return a;
};

console.log(
  inp
    .map(toNums)
    .map(M)
    .map((n) => n * 10)
    .join('\n')
);
