import * as fs from 'fs';
const inp = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const grid = inp.map((li) => li.trim().split(' ').map(Number));

const DIR = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const isInRange = ([r, c]: number[]) => 0 <= r && r < 5 && 0 <= c && c < 5;

const dfs = (set: Set<string>, [r, c]: number[], arr: number[]) => {
  if (arr.length === 6) {
    set.add(arr.join(''));
    return;
  }
  DIR.map(([dr, dc]) => [r + dr, c + dc]).forEach(([nr, nc]) => {
    if (isInRange([nr, nc])) dfs(set, [nr, nc], [...arr, grid[nr][nc]]);
  });
};

console.log(
  grid.reduce((set, li, r) => {
    li.forEach((no, c) => dfs(set, [r, c], [no]));
    return set;
  }, new Set<string>()).size
);
