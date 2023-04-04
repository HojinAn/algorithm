import * as fs from 'fs';
const [S, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [n] = S.trim().split(' ').map(Number);
console.log(
  inp
    .reduce(
      (arr, li) => {
        const [i, j, k] = li
          .trim()
          .split(' ')
          .map((s) => +s - 1);
        return [
          ...arr.slice(0, i),
          ...arr.slice(k, j + 1),
          ...arr.slice(i, k),
          ...arr.slice(j + 1),
        ];
      },
      [...Array(n)].map((_, i) => i + 1)
    )
    .join(' ')
);
