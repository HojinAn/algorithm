import * as fs from 'fs';
const inp = fs.readFileSync('/dev/stdin').toString().trim();

const countTarget = (target: string) => (str: string) => {
  let count = 0;
  for (let i = 0; i < str.length - 2; i++) {
    if (
      str[i] === target[0] &&
      str[i + 1] === target[1] &&
      str[i + 2] === target[2]
    ) {
      count++;
    }
  }
  return count;
};

console.log(countTarget('JOI')(inp));
console.log(countTarget('IOI')(inp));
