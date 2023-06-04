import * as fs from 'fs';
const input = fs.readFileSync('/dev/stdin').toString().split('\n');
input.pop();
const isLowerCase = (char: string) => char.toLowerCase() === char;
const isUpperCase = (char: string) => char.toUpperCase() === char;
const isNumber = (char: string) => !isNaN(Number(char));
const isSpace = (char: string) => char === ' ';

console.log(
  input
    .map((li) =>
      li
        .split('')
        .reduce(
          ([l, u, n, s], c) => {
            if (isSpace(c)) return [l, u, n, s + 1];
            if (isNumber(c)) return [l, u, n + 1, s];
            if (isLowerCase(c)) return [l + 1, u, n, s];
            if (isUpperCase(c)) return [l, u + 1, n, s];
            return [l, u, n, s];
          },
          [0, 0, 0, 0]
        )
        .join(' ')
    )
    .join('\n')
);
