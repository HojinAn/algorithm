import * as fs from 'fs';
const [s, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [, m] = s.split(' ').map(Number);
console.log(
  Object.entries(
    inp.reduce((counter, str) => {
      if (str.length >= m) counter[str] = (counter[str] ?? 0) + 1;
      return counter;
    }, {} as { [key: string]: number })
  )
    .sort(([k1, v1], [k2, v2]) => {
      return v1 === v2
        ? k1.length === k2.length
          ? k1 < k2
            ? -1
            : 1
          : k2.length - k1.length
        : v2 - v1;
    })
    .map(([k]) => k)
    .join('\n')
);
