import * as fs from "fs";
const [[R, C, T], ...map] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.trim().split(" ").map(Number));

let r1 = -1,
  r2 = -1;
const dir = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

for (let i = 0; i < R; i++)
  if (map[i][0] === -1) r1 === -1 ? (r1 = i) : (r2 = i);

const checkIsInRage = (r: number, c: number) =>
  0 <= r && r < R && 0 <= c && c < C;
const checkMap = () => {
  const expectedMap = [...Array(R)].map(() => Array(C).fill(false));
  map.forEach((li, i) =>
    li.forEach((el, j) => el > 0 && (expectedMap[i][j] = true))
  );
  return expectedMap;
};
const spreadDust = (expectedMap: number[][]) => {
  const toAddMap = [...Array(R)].map(() => Array(C).fill(0));
  expectedMap.forEach((li, r) =>
    li.forEach((el, c) => {
      if (el) {
        const toMinus = Math.floor(map[r][c] / 5);
        let cnt = 0;
        dir.forEach(([dr, dc]) => {
          const [nr, nc] = [r + dr, c + dc];
          if (checkIsInRage(nr, nc) && map[nr][nc] !== -1)
            cnt++, (toAddMap[nr][nc] += toMinus);
        });
        map[r][c] -= toMinus * cnt;
      }
    })
  );
  map.forEach((li, r) => li.forEach((_, c) => (map[r][c] += toAddMap[r][c])));
};
const workCleaner = () => {
  for (let i = r1 - 1; i >= 1; i--) map[i][0] = map[i - 1][0];
  for (let i = 0; i < C - 1; i++) map[0][i] = map[0][i + 1];
  for (let i = 0; i < r1; i++) map[i][C - 1] = map[i + 1][C - 1];
  for (let i = C - 1; i >= 2; i--) map[r1][i] = map[r1][i - 1];
  map[r1][1] = 0;
  for (let i = r2 + 1; i < R - 1; i++) map[i][0] = map[i + 1][0];
  for (let i = 0; i < C - 1; i++) map[R - 1][i] = map[R - 1][i + 1];
  for (let i = R - 1; i > r2; i--) map[i][C - 1] = map[i - 1][C - 1];
  for (let i = C - 1; i >= 2; i--) map[r2][i] = map[r2][i - 1];
  map[r2][1] = 0;
};

for (let i = 0; i < T; i++) spreadDust(checkMap()), workCleaner();

console.log(
  map.reduce((ac, cu) => ac + cu.reduce((acc, cur) => acc + cur), 0) + 2
);
