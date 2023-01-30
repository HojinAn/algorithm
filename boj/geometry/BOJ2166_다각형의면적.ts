import * as fs from 'fs';
const [S, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const n = +S;
const ZERO = BigInt(0);
const coords = inp.map((li) => li.trim().split(' ').map(BigInt));
const ans =
  Number(
    coords.reduce(
      (diffArea, [x, y], i) =>
        diffArea + x * coords[(i + 1) % n][1] - y * coords[(i + 1) % n][0],
      ZERO
    )
  ) / 2;

console.log((ans < ZERO ? -ans : ans).toFixed(1));
