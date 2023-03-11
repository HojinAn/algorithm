import * as fs from 'fs';
const [S, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const T = Number(S);

const ans = <number[]>[];
for (let i = 0; i < T; i++) {
  const [n, l, f] = inp[2 * i].trim().split(' ').map(Number);
  const stringArr = inp[2 * i + 1].trim().split(' ');
  ans.push(solution(stringArr, n, l, f));
}

console.log(ans.join('\n'));

function solution(strArr: string[], n: number, l: number, f: number) {
  const suffixCounter = strArr.reduce((cntr, str) => {
    const k = str.slice(-f);
    cntr.set(k, (cntr.get(k) ?? 0) + 1);
    return cntr;
  }, new Map<string, number>());
  let pairs = 0;
  suffixCounter.forEach((v) => (pairs += Math.floor(v / 2)));
  return pairs;
}
