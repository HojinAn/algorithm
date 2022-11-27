import * as fs from 'fs';
const n = +fs.readFileSync('/dev/stdin').toString();

const calc = (n: number, div: number, ans: number[]) => {
  ans[0] += Math.floor(n / div);
  if (div === 125) return ans[0];
  return calc(n, div * 5, ans);
};
console.log(calc(n, 5, [0]));
