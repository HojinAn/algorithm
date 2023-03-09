import * as fs from 'fs';
const [, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const poles = inp
  .map((li) => li.trim().split(' ').map(Number))
  .sort(([a, b], [c, d]) => (a === c ? b - d : a - c));

const LIS = [0];

const lowerBound = (target: number) => {
  let r = LIS.length,
    l = 0;
  while (l < r) {
    const mid = Math.floor((l + r) / 2);
    LIS[mid] >= target ? (r = mid) : (l = mid + 1);
  }
  return r;
};

let idx = 0;
poles.forEach(([, to], i) => {
  if (LIS[idx] > to) {
    const smIdx = lowerBound(to);
    LIS[smIdx] = to;
    poles[i].push(smIdx);
  } else {
    LIS[++idx] = to;
    poles[i].push(idx);
  }
});

const ans: number[] = [];

while (poles.length) {
  const [from, , size] = poles.pop()!;
  if (size === idx) idx--;
  else ans.push(from);
}

console.log([ans.length, ...ans.reverse()].join('\n'));
