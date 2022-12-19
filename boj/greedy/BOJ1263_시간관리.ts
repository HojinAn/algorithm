import * as fs from 'fs';
const [, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const MAX_TIME = 1000000;
console.log(
  inp
    .map((li) => li.trim().split(' ').map(Number))
    .sort(([, a], [, b]) => b - a)
    .reduce((t, [interval, time]) => {
      if (time < t) t = time;
      t -= interval;
      return t < 0 ? -1 : t;
    }, MAX_TIME)
);
