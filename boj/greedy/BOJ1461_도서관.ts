import * as fs from 'fs';
const [[, m], positions] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map((el) => el.trim().split(' ').map(Number));

const { posArr, negArr } = positions.reduce(
  ({ posArr, negArr }, coord) => {
    coord > 0 ? posArr.push(coord) : negArr.push(-coord);
    return { posArr, negArr };
  },
  { posArr: <number[]>[], negArr: <number[]>[] }
);
posArr.sort((a, b) => b - a);
negArr.sort((a, b) => b - a);
let pos = 0,
  neg = 0;
let ans =
  (posArr[0] ?? 0) > (negArr[0] ?? 0)
    ? ((pos += m), posArr[0])
    : ((neg += m), negArr[0]);
const pL = posArr.length;
const nL = negArr.length;
while (pos < pL && neg < nL) {
  const pVal = posArr[pos];
  const nVal = negArr[neg];
  const tmp = pVal > nVal ? ((pos += m), pVal) : ((neg += m), nVal);
  ans += 2 * tmp;
}
while (pos < pL) (ans += 2 * posArr[pos]), (pos += m);
while (neg < nL) (ans += 2 * negArr[neg]), (neg += m);
console.log(ans);
