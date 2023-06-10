import * as fs from 'fs';
const [, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
console.log(
  Array.from(
    inp
      .reduce(
        (counter, name) =>
          counter.set(name[0], (counter.get(name[0]) ?? 0) + 1),
        new Map<string, number>()
      )
      .entries()
  )
    .filter(([, count]) => count >= 5)
    .map(([name]) => name)
    .sort()
    .join('') || 'PREDAJA'
);
