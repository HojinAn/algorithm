import * as fs from 'fs';
const [, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

console.log(
  inp
    .reduce<string[]>((ans, str) => (ans.push(solution(str)), ans), [])
    .join('\n')
);

function solution(str: string) {
  return isFolded(str) ? 'YES' : 'NO';
}

function isFolded(str: string) {
  const n = str.length;
  if (n === 1) return true;
  const half = Math.floor(n / 2);
  const left = str.slice(0, half);
  const right = str.slice(half + 1);
  return (
    isFolded(left) &&
    isFolded(right) &&
    (() => {
      for (let i = 0; i < half; i++)
        if (left[half - 1 - i] === right[i]) return false;
      return true;
    })()
  );
}
