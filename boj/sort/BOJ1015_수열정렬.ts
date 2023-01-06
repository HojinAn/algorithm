import * as fs from 'fs';
const [, inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
console.log(
  inp
    .trim()
    .split(' ')
    .map((el, i) => [+el, i])
    .sort(([a], [b]) => a - b)
    .map((el, i) => [...el, i])
    .sort(([, a], [, b]) => a - b)
    .map(([, , a]) => a)
    .join(' ')
);
