import * as fs from 'fs';

const FENCE = '#';
const SHEEP = 'o';
const WOLF = 'v';
const DIR = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const [S, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [R, C] = S.trim().split(' ').map(Number);
const fenceMap = inp.map((li) => li.trim().split(''));
const visited = [...Array(R)].map(() => Array(C).fill(false));

const isInRange = ([r, c]: number[]) => 0 <= r && r < R && 0 <= c && c < C;

const canToGo = ([r, c]: number[]) =>
  fenceMap[r][c] !== FENCE && !visited[r][c];

const dfs = ([r, c]: number[], ov = [0, 0]) => {
  visited[r][c] = true;
  switch (fenceMap[r][c]) {
    case SHEEP:
      ov[0]++;
      break;
    case WOLF:
      ov[1]++;
      break;
  }

  DIR.map(([dr, dc]) => [r + dr, c + dc]).forEach(
    (nRC) => isInRange(nRC) && canToGo(nRC) && dfs(nRC, ov)
  );

  const [o, v] = ov;
  return o > v ? [o, 0] : [0, v];
};

console.log(
  fenceMap
    .reduce(
      (ov, row, r) => (
        row.forEach(
          (_, c) =>
            canToGo([r, c]) && (ov = dfs([r, c]).map((el, i) => ov[i] + el))
        ),
        ov
      ),
      [0, 0]
    )
    .join(' ')
);
