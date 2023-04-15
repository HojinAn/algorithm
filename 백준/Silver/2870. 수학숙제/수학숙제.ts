import * as fs from 'fs';
const [, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

console.log(
  inp
    .reduce((numbers, str) => {
      str
        .trim()
        .split(/\D+/)
        .filter((x) => x)
        .map(BigInt)
        .forEach((no) => numbers.push(no));
      return numbers;
    }, <bigint[]>[])
    .sort((a, b) => {
      if (a > b) return 1;
      else if (a < b) return -1;
      else return 0;
    })
    .join('\n')
);
