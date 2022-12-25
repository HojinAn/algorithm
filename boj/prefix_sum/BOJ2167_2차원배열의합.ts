import * as fs from 'fs';
const [S, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [n, m] = S.trim().split(' ').map(Number);
const nums = inp.slice(0, n).map((li) => li.trim().split(' ').map(Number));
const sums = [...Array(n + 1)].map(() => Array(m + 1).fill(0));
sums[1][1] = nums[0][0];
for (let j = 2; j <= m; j++) sums[1][j] = sums[1][j - 1] + nums[0][j - 1];
for (let i = 2; i <= n; i++) sums[i][1] = sums[i - 1][1] + nums[i - 1][0];
for (let i = 2; i <= n; i++)
  for (let j = 2; j <= m; j++)
    sums[i][j] =
      sums[i - 1][j] + sums[i][j - 1] - sums[i - 1][j - 1] + nums[i - 1][j - 1];
const findSum = ([i, j, x, y]: number[]) =>
  sums[x][y] - sums[i - 1][y] - sums[x][j - 1] + sums[i - 1][j - 1];
console.log(
  inp
    .slice(n + 1)
    .reduce(
      (ans, li) => (ans.push(findSum(li.trim().split(' ').map(Number))), ans),
      <number[]>[]
    )
    .join('\n')
);
