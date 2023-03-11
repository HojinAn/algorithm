import * as fs from 'fs';

const [S, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [n, m] = toNums(S);
const grid = inp.map(toNums);
const visited = [...Array(n)].map(() => Array(m).fill(false));
const DIR = {
  up: [-1, 0],
  right: [0, 1],
  down: [1, 0],
  left: [0, -1],
};
const U = 'up';
const L = 'left';
const D = 'down';
const R = 'right';

const checkRange = ([r, c]: number[]) => 0 <= r && r < n && 0 <= c && c < m;

const genDir = (type: number, prevD: string) => {
  if (type === 9) return [U, L, D, R];
  if (type === 0) return [prevD];
  if (type === 1) {
    if (prevD === L || prevD === R) return [];
    return [prevD];
  }
  if (type === 2) {
    if (prevD === U || prevD === D) return [];
    return [prevD];
  }
  if (type === 3) {
    if (prevD === U) return [R];
    if (prevD === D) return [L];
    if (prevD === L) return [D];
    return [U];
  }
  if (prevD === U) return [L];
  if (prevD === D) return [R];
  if (prevD === L) return [U];
  return [D];
};

const dfs = ([r, c]: number[]) => {
  const stack = <[number, number, number, string][]>[];
  visited[r][c] = true;
  stack.push([r, c, grid[r][c], '']);

  while (stack.length) {
    const [r, c, cur, prevD] = stack.pop()!;
    const dir = genDir(cur, prevD);
    dir.forEach((d) => {
      const [dr, dc] = DIR[d];
      const [nr, nc] = [r + dr, c + dc];
      if (checkRange([nr, nc])) {
        visited[nr][nc] = true;
        const next = grid[nr][nc];
        if (next === 9) return;
        stack.push([nr, nc, next, d]);
      }
    });
  }
};

grid.forEach((li, r) => li.forEach((el, c) => el === 9 && dfs([r, c])));

console.log(
  visited.reduce((cnt, li) => (li.forEach((el) => el && cnt++), cnt), 0)
);

function toNums(s: string) {
  return s.trim().split(' ').map(Number);
}
