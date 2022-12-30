import * as fs from 'fs';
const [, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const rotateClockwise = (d: number) => (d + 1) % 4;
const concatNextGen = (dArr: number[], g: number) =>
  !g
    ? dArr
    : concatNextGen([...dArr, ...dArr.reverse().map(rotateClockwise)], g - 1);

const dir = [
  [0, 1],
  [-1, 0],
  [0, -1],
  [1, 0],
];
const MAX_LEN = 100;
const MAX_RANGE = 101;

console.log(
  inp
    .reduce(
      (visited, li) => {
        let [c, r, d, g] = li.trim().split(' ').map(Number);
        visited[r][c] = true;
        concatNextGen([d], g).forEach((d) => {
          const [dr, dc] = dir[d];
          [r, c] = [r + dr, c + dc];
          visited[r][c] = true;
        });
        return visited;
      },
      [...Array(MAX_RANGE)].map(() => Array(MAX_RANGE).fill(false))
    )
    .reduce((ans, li, i, visited) => {
      i < MAX_LEN &&
        li.forEach((_, j) => {
          j < MAX_LEN &&
            visited[i][j] &&
            visited[i + 1][j] &&
            visited[i][j + 1] &&
            visited[i + 1][j + 1] &&
            ans++;
        });
      return ans;
    }, 0)
);
