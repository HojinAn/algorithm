import * as fs from 'fs';

type Pair = [number, number];

const [S, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [n, L] = toNums(S);
const grid = inp.map(toNums);
const built = [...Array(n)].map(() => Array(n).fill(false));

const getNext = (a: number, da: number, i: number) => a + da * i;
const getPrev = (a: number, da: number, i: number) => a - da * i;

const compareSameHeight = (now: number, next: number) => now === next;
const compareMoreThanTwo = (now: number, next: number) =>
  Math.abs(now - next) > 1;
const compareMoveL = ([r, c]: Pair, [dr, dc]: Pair) => {
  if (grid[r][c] > grid[r + dr][c + dc]) {
    (r += dr), (c += dc);
    for (let i = 0; i < L; i++) {
      const nr = getNext(r, dr, i);
      const nc = getNext(c, dc, i);
      if (nr >= n || nc >= n || grid[r][c] !== grid[nr][nc] || built[nr][nc])
        return false;
      built[nr][nc] = true;
    }
    const nr = getNext(r, dr, L);
    const nc = getNext(c, dc, L);
    if (nr >= n || nc >= n) return true;
    return grid[nr][nc] <= grid[r][c];
  }
  for (let i = 0; i < L; i++) {
    const nr = getPrev(r, dr, i);
    const nc = getPrev(c, dc, i);
    if (nr < 0 || nc < 0 || grid[r][c] !== grid[nr][nc] || built[nr][nc])
      return false;
    built[nr][nc] = true;
  }
  const nr = getPrev(r, dr, L);
  const nc = getPrev(c, dc, L);
  if (nr < 0 || nc < 0) return true;
  return grid[nr][nc] <= grid[r][c];
};

const checkGridLine = ([r, c]: Pair, [dr, dc]: Pair) => {
  while (r + dr < n && c + dc < n) {
    const now = grid[r][c];
    const next = grid[r + dr][c + dc];
    if (
      !compareSameHeight(now, next) &&
      (compareMoreThanTwo(now, next) || !compareMoveL([r, c], [dr, dc]))
    )
      return 0;
    (r += dr), (c += dc);
  }
  return 1;
};
const checkGridRow = (idx: number) => {
  built[idx].fill(false);
  return checkGridLine([idx, 0], [0, 1]);
};
const checkGridCol = (idx: number) => {
  for (let i = 0; i < n; i++) built[i][idx] = false;
  return checkGridLine([0, idx], [1, 0]);
};

console.log(
  grid.reduce((ans, _, i) => ans + checkGridCol(i) + checkGridRow(i), 0)
);

function toNums(str: string) {
  return str.trim().split(' ').map(Number);
}
