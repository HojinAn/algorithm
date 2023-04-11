import * as fs from 'fs';
const [S, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const WALL = '#';
const START = '@';
const FIRE = '*';
const DIR = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

let idx = 0;
let T = +S;

const answer = <(number | string)[]>[];

while (T--) {
  const [w, h] = toNums(inp[idx++]);
  const building = inp.slice(idx, (idx += h)).map((li) => li.trim().split(''));
  answer.push(solve(building, [w, h]));
}

console.log(answer.join('\n'));

function solve(building: string[][], [w, h]: number[]) {
  const findPerson = () => {
    for (let r = 0; r < h; r++)
      for (let c = 0; c < w; c++) if (building[r][c] === START) return [r, c];
    return [0, 0];
  };

  const findFires = () => {
    const fires = <number[][]>[];
    for (let r = 0; r < h; r++)
      for (let c = 0; c < w; c++)
        if (building[r][c] === FIRE) fires.push([r, c]);
    return fires;
  };

  const bfs = (person: number[], fires: number[][]) => {
    const burned = [...Array(h)].map(() => Array(w).fill(false));
    const visited = [...Array(h)].map(() => Array(w).fill(false));

    const isInRange = ([r, c]: number[]) => 0 <= r && r < h && 0 <= c && c < w;

    const makeVisited = ([r, c]: number[]) => (visited[r][c] = true);

    const makeBurned = ([r, c]: number[]) => (
      (burned[r][c] = true), (visited[r][c] = true)
    );

    const canBurn = ([r, c]: number[]) =>
      building[r][c] !== WALL && !burned[r][c];
    const canVisit = ([r, c]: number[]) => canBurn([r, c]) && !visited[r][c];

    const qPerson = [[...person, 0]];
    makeVisited(person);
    const qFire = fires.reduce((q, fire) => {
      q.push([...fire, 0]);
      makeBurned(fire);
      return q;
    }, <number[][]>[]);

    let qPersonIdx = 0;
    let qPersonSize = qPerson.length;
    let qFireIdx = 0;
    let qFireSize = qFire.length;

    while (qPersonIdx < qPersonSize || qFireIdx < qFireSize) {
      let fDiff = qFireSize - qFireIdx;
      let pDiff = qPersonSize - qPersonIdx;
      while (fDiff--) {
        const [cr, cc, ct] = qFire[qFireIdx++];
        const nt = ct + 1;
        DIR.map(([dr, dc]) => [cr + dr, cc + dc]).forEach(([nr, nc]) => {
          if (isInRange([nr, nc]) && canBurn([nr, nc])) {
            makeBurned([nr, nc]);
            qFire[qFireSize++] = [nr, nc, nt];
          }
        });
      }
      while (pDiff--) {
        const [cr, cc, ct] = qPerson[qPersonIdx++];
        if (cr === 0 || cc === 0 || cr === h - 1 || cc === w - 1) return ct + 1;
        const nt = ct + 1;
        DIR.map(([dr, dc]) => [cr + dr, cc + dc]).forEach(([nr, nc]) => {
          if (isInRange([nr, nc]) && canVisit([nr, nc])) {
            makeVisited([nr, nc]);
            qPerson[qPersonSize++] = [nr, nc, nt];
          }
        });
      }
    }
    return 'IMPOSSIBLE';
  };

  return bfs(findPerson(), findFires());
}

function toNums(str: string) {
  return str.trim().split(' ').map(Number);
}
