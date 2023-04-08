import * as fs from 'fs';
const readFile = fs.readFileSync('/dev/stdin');
const grid = readFile
  .toString()
  .trim()
  .split('\n')
  .map((li) => li.trim().split(''));

const BLANK = '.';

const H = 12;
const W = 6;

const DIR = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

let comboCnt = 0;

const isInRange = ([r, c]: number[]) => 0 <= r && r < H && 0 <= c && c < W;

const fallDown = () => {
  for (let c = 0; c < W; c++) {
    for (let r = H - 1; r > 0; r--) {
      if (grid[r][c] === BLANK) {
        let i = r - 1;
        while (i >= 0) {
          if (grid[i][c] !== BLANK) {
            [grid[i][c], grid[r][c]] = [grid[r][c], grid[i][c]];
            break;
          }
          i--;
        }
      }
    }
  }

  combo();
};

const combo = () => {
  const visited = [...Array(H)].map(() => Array(W).fill(false));
  const willBomb = [...Array(H)].map(() => Array(W).fill(false));

  const bfs = (origin: number[]) => {
    const q = [origin];
    let qSize = 1;
    let qIdx = 0;
    while (qIdx < qSize) {
      const [r, c] = q[qIdx++];
      for (const [dr, dc] of DIR) {
        const [nr, nc] = [r + dr, c + dc];
        if (
          isInRange([nr, nc]) &&
          !visited[nr][nc] &&
          grid[nr][nc] === grid[r][c]
        ) {
          visited[nr][nc] = true;
          q[qSize++] = [nr, nc];
        }
      }
    }
    q.length >= 4 && q.forEach(([r, c]) => (willBomb[r][c] = true));
  };

  grid.forEach((row, r) =>
    row.forEach((item, c) => {
      if (item !== BLANK && !visited[r][c]) {
        visited[r][c] = true;
        bfs([r, c]);
      }
    })
  );

  willBomb.some((li) => li.some((el) => el)) && bomb(willBomb);
};

const bomb = (willBomb: boolean[][]) => {
  comboCnt++;
  willBomb.forEach((li, r) =>
    li.forEach((is, c) => is && (grid[r][c] = BLANK))
  );
  fallDown();
};

fallDown();

console.log(comboCnt);
