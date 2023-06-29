import * as fs from 'fs';
const [s, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [m, n] = s.trim().split(' ').map(Number);
const board = inp.map((v) => v.trim().split(''));

const B = 'B';

const DIR = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
] as const;

const isInRange = ([r, c]: [number, number]) =>
  r >= 0 && r < n && c >= 0 && c < m;

const visited = [...Array(n)].map(() => Array(m).fill(false));

const dfs = ([r, c]: [number, number], color: string, d = 1, power = 1) => {
  DIR.forEach(([dr, dc]) => {
    const nr = r + dr;
    const nc = c + dc;
    if (isInRange([nr, nc]) && !visited[nr][nc]) {
      if (board[nr][nc] === color) {
        visited[nr][nc] = true;
        power = Math.max(d + 1, dfs([nr, nc], color, d + 1, power + 1));
      }
    }
  });
  return power;
};

console.log(
  board
    .reduce(
      ([w, b], row, r) => {
        row.forEach((v, c) => {
          if (!visited[r][c]) {
            visited[r][c] = true;
            const power = dfs([r, c], v);
            v === B ? (b += power ** 2) : (w += power ** 2);
          }
        });
        return [w, b];
      },
      [0, 0]
    )
    .join(' ')
);
