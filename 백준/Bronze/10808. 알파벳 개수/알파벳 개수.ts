import * as fs from 'fs';
const str = fs.readFileSync('/dev/stdin').toString();

const alphabetCounter = 'abcdefghijklmnopqrstuvwxyz'
  .split('')
  .reduce((counter, alphabet) => ({ ...counter, [alphabet]: 0 }), {});

console.log(
  Object.values(
    str
      .trim()
      .split('')
      .reduce(
        (counter, alphabet) => ({
          ...counter,
          [alphabet]: counter[alphabet] + 1,
        }),
        alphabetCounter
      )
  ).join(' ')
);
