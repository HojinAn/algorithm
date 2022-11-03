import * as fs from "fs";
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const BLOCK = "#",
  START = "S",
  ESC = "E",
  delta = [
    [-1, 0, 0],
    [1, 0, 0],
    [0, -1, 0],
    [0, 1, 0],
    [0, 0, -1],
    [0, 0, 1],
  ];
let idx = 0;

const answer = <number[]>[];
const getAnsStr = (x: number) =>
  x ? `Escaped in ${x} minute(s).` : "Trapped!";

while (true) {
  const [L, R, C] = input[idx++].trim().split(" ").map(Number);
  if (!L && !R && !C) break;

  const isInRange = (l: number, r: number, c: number) =>
    0 <= l && l < L && 0 <= r && r < R && 0 <= c && c < C;
  const bfs = ([l, r, c]: [number, number, number], building: string[][][]) => {
    const q = [[l, r, c, 0]],
      visited = [...Array(L)].map(() =>
        [...Array(R)].map(() => Array(C).fill(false))
      );
    visited[l][r][c] = true;
    let qSize = 1,
      qIdx = 0,
      retCnt = 0;
    while (qIdx < qSize) {
      const [cl, cr, cc, cnt] = q[qIdx++];
      if (building[cl][cr][cc] === ESC) {
        retCnt = cnt;
        break;
      }
      delta.forEach(([dl, dr, dc]) => {
        const [nl, nr, nc] = [cl + dl, cr + dr, cc + dc];
        isInRange(nl, nr, nc) &&
          building[nl][nr][nc] !== BLOCK &&
          !visited[nl][nr][nc] &&
          ((visited[nl][nr][nc] = true), (q[qSize++] = [nl, nr, nc, cnt + 1]));
      });
    }
    return retCnt;
  };

  const building = [...Array(L)].map(() => {
    const floor = input.slice(idx, (idx += R)).map((row) => Array.from(row));
    idx++;
    return floor;
  });

  answer.push(
    building.reduce(
      (ans, floor, l) =>
        ans ||
        floor.reduce(
          (count, row, r) =>
            count ||
            row.reduce(
              (cnt, room, c) =>
                room === START ? cnt + bfs([l, r, c], building) : cnt,
              count
            ),
          ans
        ),
      0
    )
  );
}

console.log(answer.map((cnt) => getAnsStr(cnt)).join("\n"));
