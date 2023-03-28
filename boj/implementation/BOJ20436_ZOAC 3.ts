import * as fs from 'fs';
const [S, inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let pos = S.trim().split(' ');
const n = inp.length;
let time = 0;

const QWERTY = {
  q: [0, 0],
  w: [0, 1],
  e: [0, 2],
  r: [0, 3],
  t: [0, 4],
  y: [0, 5],
  u: [0, 6],
  i: [0, 7],
  o: [0, 8],
  p: [0, 9],
  a: [1, 0],
  s: [1, 1],
  d: [1, 2],
  f: [1, 3],
  g: [1, 4],
  h: [1, 5],
  j: [1, 6],
  k: [1, 7],
  l: [1, 8],
  z: [2, 0],
  x: [2, 1],
  c: [2, 2],
  v: [2, 3],
  b: [2, 4],
  n: [2, 5],
  m: [2, 6],
};

const calcTime = (from: string, to: string) => {
  const [x1, y1] = QWERTY[from];
  const [x2, y2] = QWERTY[to];
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
};

const isRight = (s: string) => {
  switch (s) {
    case 'b':
    case 'y':
    case 'h':
    case 'n':
    case 'u':
    case 'j':
    case 'm':
    case 'i':
    case 'k':
    case 'o':
    case 'l':
    case 'p':
      return true;
    default:
      return false;
  }
};

const click = (s: string, pos: string[], time: number): [number, string[]] => {
  const idx = isRight(s) ? 1 : 0;
  time += calcTime(pos[idx], s) + 1;
  pos[idx] = s;
  return [time, pos];
};

for (let i = 0; i < n; i++) {
  const target = inp[i];
  [time, pos] = click(target, pos, time);
}

console.log(time);
