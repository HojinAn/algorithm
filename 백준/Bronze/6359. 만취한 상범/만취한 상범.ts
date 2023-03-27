import * as fs from 'fs';
const [, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const play = (n: number) => {
  const prisons = Array(n).fill(1);
  for (let i = 2; i <= n; i++)
    for (let j = i; j <= n; j += i) prisons[j - 1] = prisons[j - 1] ? 0 : 1;
  return prisons.reduce((sum, no) => sum + no);
};

console.log(
  inp.reduce((ans, s) => (ans.push(play(+s)), ans), <number[]>[]).join('\n')
);
