import * as fs from 'fs';
const [, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const ZERO = BigInt(0);
const ONE = BigInt(1);
const SEVEN = BigInt(7);
const TEN = BigInt(10);
const LIMIT = 100;
const INF = Number.MAX_VALUE;
const dpMax = [ZERO, ZERO, ONE, SEVEN];
const dpMin = [0, 0, 1, 7, 4, 2, 6, 8, 10, 18, 22, 20, 28, 68, 88, 108];
const minSets = new Map<number, string[]>([
  [2, ['1']],
  [3, ['7']],
  [4, ['4']],
  [5, ['2']],
  [6, ['0']],
  [7, ['8']],
]);
for (let i = 4; i <= LIMIT; i++) dpMax[i] = dpMax[i - 2] * TEN + ONE;

for (let i = 8; i <= 15; i++) minSets.set(i, `${dpMin[i]}`.split(''));
for (let i = 16; i <= LIMIT; i++) {
  dpMin[i] = INF;
  const half = Math.floor(i / 2);
  for (let j = 2; j <= half; j++)
    dpMin[i] = Math.min(
      dpMin[i],
      calcMin([...minSets.get(i - j)!, ...minSets.get(j)!])
    );
  minSets.set(i, `${dpMin[i]}`.split(''));
}
console.log(
  inp
    .reduce((ans, s) => {
      const no = +s;
      ans.push(`${dpMin[no]} ${dpMax[no]}`);
      return ans;
    }, <string[]>[])
    .join('\n')
);

function calcMin(strs: string[], min = '', i = 0) {
  strs.sort();
  if (strs[0] === '0') {
    for (const s of strs) {
      if (s !== '0') {
        min = s;
        break;
      }
      i++;
    }
    strs[0] = min;
    strs[i] = '0';
  }
  return +strs.join('');
}
