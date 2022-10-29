import * as fs from "fs";
const [N, ...inp] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const grid = inp.map((el) => el.trim().split(""));
const n = +N;
const delta = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

type Util = [string, number, number];

const isInRange = (r: number, c: number) => 0 <= r && r < n && 0 <= c && c < n;

const countLine = (
  [pivot, cnt, max]: Util,
  [i, j]: [number, number],
  candyGrid: string[][]
): Util =>
  pivot === candyGrid[i][j]
    ? [pivot, cnt + 1, max]
    : [candyGrid[i][j], 1, Math.max(max, cnt)];

const countSeq = (candyGrid: string[][]) =>
  Math.max(
    candyGrid.reduce(
      (max, li, i) => {
        const arr = li.reduce<Util>(
          (infos, _, j) => countLine(infos, [i, j], candyGrid),
          [candyGrid[i][0], 0, max]
        );
        return Math.max(max, arr[1], arr[2]);
      },
      candyGrid.reduce((max, li, j) => {
        const arr = li.reduce<Util>(
          (infos, _, i) => countLine(infos, [i, j], candyGrid),
          [candyGrid[0][j], 0, max]
        );
        return Math.max(max, arr[1], arr[2]);
      }, 0)
    )
  );

const swapGrid = ([rF, cF]: [number, number], [rT, cT]: [number, number]) =>
  grid.map((li, r) =>
    li.map((el, c) =>
      r === rF && c === cF
        ? grid[rT][cT]
        : r === rT && c === cT
        ? grid[rF][cF]
        : el
    )
  );

const bomboni = (r: number, c: number) =>
  delta.reduce((cnt, [dr, dc]) => {
    const [nr, nc] = [r + dr, c + dc];
    isInRange(nr, nc) &&
      grid[r][c] !== grid[nr][nc] &&
      (cnt = Math.max(countSeq(swapGrid([r, c], [nr, nc])), cnt));
    return cnt;
  }, 0);

console.log(
  grid.reduce(
    (max, li, r) => li.reduce((cnt, _, c) => Math.max(bomboni(r, c), cnt), max),
    countSeq(grid)
  )
);
