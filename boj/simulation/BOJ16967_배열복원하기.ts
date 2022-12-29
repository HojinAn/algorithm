import * as fs from 'fs';
const [[h, w, x, y], ...bArr] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map((el) => el.trim().split(' ').map(Number));
const ans = [...Array(h)].map(() => Array(w).fill(0));
for (let i = 0; i < x; i++)
  for (let j = 0; j < w; j++)
    (ans[i][j] = bArr[i][j]), (ans[h - x + i][j] = bArr[h + i][y + j]);
for (let i = 0; i < h - x; i++)
  for (let j = 0; j < y; j++)
    (ans[x + i][j] = bArr[x + i][j]), (ans[i][w - y + j] = bArr[x + i][w + j]);
for (let i = 0; i < h - x; i++)
  for (let j = 0; j < w - y; j++)
    ans[x + i][y + j] = bArr[x + i][y + j] - ans[i][j];

console.log(ans.map((e) => e.join(' ')).join('\n'));
