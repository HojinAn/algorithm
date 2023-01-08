import * as fs from 'fs';
const grid = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map((li) => li.trim().split(' ').map(Number));

const papers = [0, 5, 5, 5, 5, 5];
const INF = Number.MAX_VALUE;
let ans = INF;

const checkCoverN = (n: number, [r, c]: number[]) => {
  for (let i = r; i < r + n; i++)
    for (let j = c; j < c + n; j++)
      if (i < 0 || i >= 10 || j < 0 || j >= 10 || !grid[i][j]) return false;
  return true;
};

const coverN = (n: number, [r, c]: number[], no: number) => {
  for (let i = r; i < r + n; i++)
    for (let j = c; j < c + n; j++) grid[i][j] = no;
};

const BT = ([r, c]: number[], cnt: number) => {
  if (r >= 9 && c > 9) {
    ans = Math.min(ans, cnt);
    return;
  }
  if (ans <= cnt) return;
  if (c > 9) {
    BT([r + 1, 0], cnt);
    return;
  }
  if (grid[r][c] === 1) {
    for (let i = 5; i >= 1; i--) {
      if (papers[i] > 0 && checkCoverN(i, [r, c])) {
        coverN(i, [r, c], 0);
        papers[i]--;
        BT([r, c + 1], cnt + 1);
        papers[i]++;
        coverN(i, [r, c], 1);
      }
    }
    return;
  }
  BT([r, c + 1], cnt);
};
BT([0, 0], 0);
console.log(ans === INF ? -1 : ans);
