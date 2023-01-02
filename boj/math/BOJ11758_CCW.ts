import * as fs from 'fs';
const [[x1, y1], [x2, y2], [x3, y3]] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map((li) => li.trim().split(' ').map(Number));

const compareAngle = () => {
  const tmp = x1 * y2 + x2 * y3 + x3 * y1 - (y1 * x2 + y2 * x3 + y3 * x1);
  if (tmp > 0) return 1;
  if (tmp < 0) return -1;
  return 0;
};

console.log(compareAngle());
