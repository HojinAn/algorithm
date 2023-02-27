import * as fs from 'fs';

const toNums = (str: string) => str.trim().split(' ').map(Number);

const [S, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [n, m] = toNums(S);
const maze = inp.map((li) => toNums(li));
const cache = [...Array(n)].map(() => Array(m).fill(0));

cache[0][0] = maze[0][0];
for (let i = 1; i < n; i++) cache[i][0] = cache[i - 1][0] + maze[i][0];
for (let i = 1; i < m; i++) cache[0][i] = cache[0][i - 1] + maze[0][i];

for (let i = 1; i < n; i++) {
  for (let j = 1; j < m; j++) {
    cache[i][j] =
      Math.max(cache[i - 1][j - 1], cache[i - 1][j], cache[i][j - 1]) +
      maze[i][j];
  }
}

console.log(cache[n - 1][m - 1]);
