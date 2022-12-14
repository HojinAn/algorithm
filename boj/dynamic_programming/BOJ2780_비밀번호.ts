import * as fs from 'fs';
const [, ...inp] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map(Number);

const adjacentArr = [
  [7],
  [2, 4],
  [1, 3, 5],
  [2, 6],
  [1, 5, 7],
  [2, 4, 6, 8],
  [3, 5, 9],
  [4, 8, 0],
  [5, 7, 9],
  [6, 8],
];
const DIV = 1234567;
const dp = [...Array(1001)].map(() => Array(10).fill(0));
dp.forEach((li, i, arr) =>
  i < 2
    ? arr[i].fill(1)
    : li.forEach(
        (_, j) =>
          (arr[i][j] =
            adjacentArr[j].reduce((sum, prev) => sum + arr[i - 1][prev], 0) %
            DIV)
      )
);

console.log(
  inp
    .reduce<number[]>(
      (ans, no) => [...ans, dp[no].reduce((s, c) => s + c) % DIV],
      []
    )
    .join('\n')
);
