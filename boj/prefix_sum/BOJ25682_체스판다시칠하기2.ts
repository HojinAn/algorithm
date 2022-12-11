import * as fs from 'fs';
const [str1, ...input] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');
const [n, m, k] = str1.trim().split(' ').map(Number);
const board = input.map((li) => li.trim().split(''));
const BLACK = 'B',
  WHITE = 'W';

const calcMin = (
  color: string,
  cnt = Number.MAX_VALUE,
  prefixSum = [...Array(n + 1)].map(() => Array(m + 1).fill(0))
) => {
  board.forEach((li, i) =>
    li.forEach((el, j) => {
      const value = (el === color) === ((i + j) % 2 === 1) ? 1 : 0;
      prefixSum[i + 1][j + 1] =
        prefixSum[i][j + 1] + prefixSum[i + 1][j] - prefixSum[i][j] + value;
    })
  );
  for (let i = 1; i <= n - k + 1; i++)
    for (let j = 1; j <= m - k + 1; j++)
      cnt = Math.min(
        cnt,
        prefixSum[i + k - 1][j + k - 1] -
          prefixSum[i + k - 1][j - 1] -
          prefixSum[i - 1][j + k - 1] +
          prefixSum[i - 1][j - 1]
      );
  return cnt;
};

console.log(Math.min(calcMin(BLACK), calcMin(WHITE)));
