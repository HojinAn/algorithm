import * as fs from 'fs';
const [, li, ...inp] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');
const [xi, yi] = li.trim().split(' ').map(Number);
const [xMin, xMax, yMin, yMax] = inp.reduce(
  ([xMin, xMax, yMin, yMax], line) => {
    const [x, y] = line.trim().split(' ').map(Number);
    return [
      Math.min(xMin, x),
      Math.max(xMax, x),
      Math.min(yMin, y),
      Math.max(yMax, y),
    ];
  },
  [xi, xi, yi, yi]
);
console.log((xMax - xMin) * (yMax - yMin));
