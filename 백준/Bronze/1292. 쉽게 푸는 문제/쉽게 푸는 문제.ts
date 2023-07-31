import * as fs from 'fs';
const [a, b] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split(' ')
  .map(Number);

const arr: number[] = [];
let num = 1;
while (arr.length < b) {
  arr.push(...Array(num).fill(num));
  num++;
}

console.log(arr.slice(a - 1, b).reduce((acc, cur) => acc + cur, 0));