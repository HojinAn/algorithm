import * as fs from 'fs';
const [a, b] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const makeCounter = (str: string) =>
  str
    .trim()
    .split('')
    .reduce(
      (acc, cur) => {
        acc[cur] += 1;
        return acc;
      },
      'abcdefghijklmnopqrstuvwxyz'
        .split('')
        .reduce((acc, cur) => ({ ...acc, [cur]: 0 }), {})
    );

const counterA = makeCounter(a);
const counterB = makeCounter(b);

console.log(
  Object.entries<number>(counterA).reduce(
    (acc, [key, value]) => acc + Math.abs(value - counterB[key]),
    0
  )
);
