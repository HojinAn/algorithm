import * as fs from 'fs';
const [S, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [n, m] = S.trim().split(' ').map(Number);
const maze = inp.map((li) => li.split(''));
const DIR = { up: 'U', down: 'D', right: 'R', left: 'L' };
const dp = [...Array(n)].map(() => Array(m).fill(false));
const visited = [...Array(n)].map(() => Array(m).fill(false));

const checkRange = ([r, c]: number[]) => 0 <= r && r < n && 0 <= c && c < m;
const moveTo = ([r, c]: number[], box: string) => {
  const { up, down, right, left } = DIR;
  switch (box) {
    case up:
      return [r - 1, c];
    case down:
      return [r + 1, c];
    case left:
      return [r, c - 1];
    case right:
      return [r, c + 1];
    default:
      return [r, c];
  }
};
const moveInMaze = ([r, c]: number[]) => {
  if (!checkRange([r, c])) return true;
  if (visited[r][c]) return dp[r][c];
  visited[r][c] = true;
  return (dp[r][c] = moveInMaze(moveTo([r, c], maze[r][c])));
};

console.log(
  maze.reduce(
    (cnt, li, r) => (li.forEach((_, c) => moveInMaze([r, c]) && cnt++), cnt),
    0
  )
);
