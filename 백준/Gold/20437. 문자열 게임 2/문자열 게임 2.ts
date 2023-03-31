import * as fs from 'fs';
const [S, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const T = +S;
const ans = <string[]>[];

for (let i = 0; i < 2 * T; i += 2) ans.push(solution(inp[i], +inp[i + 1]));

console.log(ans.join('\n'));

function solution(str: string, k: number) {
  const counter = new Map<string, number[]>();
  const n = str.length;

  for (let i = 0; i < n; i++) {
    const c = str[i];
    const val = counter.get(c) ?? [];
    val.push(i);
    counter.set(c, val);
  }

  const candidates = Array.from(counter.entries())
    .filter(([, arr]) => arr.length >= k)
    .map(([, arr]) => arr);

  if (!candidates.length) return '-1';

  const getMinMax = getMinMaxByWindowSize(k - 1);

  return candidates
    .reduce(
      ([min, max], idxArr) => {
        const [nMin, nMax] = getMinMax(idxArr);
        min = Math.min(min, nMin);
        max = Math.max(max, nMax);
        return [min, max];
      },
      [100000, -1]
    )
    .join(' ');
}

function getMinMaxByWindowSize(windowSize: number) {
  return function (idxArr: number[]) {
    const len = idxArr.length;
    const init = idxArr[windowSize] - idxArr[0];
    let [min, max] = [init, init];
    for (let i = 1; i < len - windowSize; i++) {
      min = Math.min(min, idxArr[i + windowSize] - idxArr[i]);
      max = Math.max(max, idxArr[i + windowSize] - idxArr[i]);
    }
    return [min + 1, max + 1];
  };
}
