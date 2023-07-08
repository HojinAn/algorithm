import * as fs from 'fs';
let max = 0;
console.log(
  Object.entries<number>(
    fs
      .readFileSync('/dev/stdin')
      .toString()
      .trim()
      .split('\n')
      .reduce((counter, li): { [key: string]: number } => {
        for (const s of li.split('')) {
          if (s === ' ') continue;
          if (!counter[s]) counter[s] = 0;
          counter[s]++;
          max = Math.max(max, counter[s]);
        }
        return counter;
      }, {})
  )
    .filter(([, v]) => v === max)
    .map(([k]) => k)
    .sort()
    .join('')
);
