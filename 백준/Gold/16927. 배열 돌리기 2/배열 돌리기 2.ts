import * as fs from 'fs';
const [li, ...inp] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');

const [n, m, r] = convertLineToNumbers(li);
const grid = inp.map(convertLineToNumbers);

const range = Math.ceil(Math.min(n, m) / 2);

for (let j = 0; j < range; j++) {
  const rotateCount = r % (2 * (n + m) - 4 * (1 + j * 2));
  for (let i = 0; i < rotateCount; i++) {
    const tmp = grid[j][j];
    const rLimit = n - j - 1;
    const cLimit = m - j - 1;

    for (let k = j; k < cLimit; k++) grid[j][k] = grid[j][k + 1];
    for (let k = j; k < rLimit; k++) grid[k][cLimit] = grid[k + 1][cLimit];
    for (let k = cLimit; k > j; k--) grid[rLimit][k] = grid[rLimit][k - 1];
    for (let k = rLimit; k > j + 1; k--) grid[k][j] = grid[k - 1][j];
    grid[j + 1][j] = tmp;
  }
}

console.log(grid.map((li) => li.join(' ')).join('\n'));

function convertLineToNumbers(li: string) {
  return li.trim().split(' ').map(Number);
}
