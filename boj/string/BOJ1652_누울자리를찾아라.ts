import * as fs from 'fs';
const [S, ...room] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');

const n = Number(S);
const WALL = 'X';

const countSeqBlank = (
  [r, c]: number[],
  [dr, dc]: number[],
  cnt = 0,
  len = 0
) => {
  while (r < n && c < n) {
    const el = room[r][c];
    if (el === WALL) {
      if (len >= 2) cnt++;
      len = 0;
    } else len++;
    (r += dr), (c += dc);
  }
  if (len >= 2) cnt++;
  return cnt;
};

const ans = [0, 0];
for (let i = 0; i < n; i++) {
  ans[0] += countSeqBlank([i, 0], [0, 1]);
  ans[1] += countSeqBlank([0, i], [1, 0]);
}
console.log(ans.join(' '));
