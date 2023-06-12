import * as fs from 'fs';
const [a, b] = fs.readFileSync('/dev/stdin').toString().trim().split(' ');

const makeNums = (str: string) =>
  str
    .split('')
    .reduce(
      (nums, s) =>
        s === '5' || s === '6'
          ? ['5', '6']
              .map((s) => nums.map((num) => num + s))
              .reduce((arr, n) => arr.concat(n), [])
          : nums.map((num) => num + s),
      ['']
    )
    .map(Number);

const numsA = makeNums(a);
const numsB = makeNums(b);
console.log(
  numsA
    .reduce(
      (pair, numA) =>
        numsB.reduce(([min, max], numB) => {
          const sum = numA + numB;
          return [Math.min(min, sum), Math.max(max, sum)];
        }, pair),
      [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER]
    )
    .join(' ')
);
