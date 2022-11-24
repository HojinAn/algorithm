import * as fs from 'fs';
const [[n], heights, growingRate] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map((el) => el.trim().split(' ').map(Number));
console.log(
  heights
    .map((el, i) => [el, growingRate[i]])
    .sort(([, rateA], [, rateB]) => rateA - rateB)
    .reduce((sum, [initVal, rate], i) => (sum += initVal + i * rate), 0)
);
