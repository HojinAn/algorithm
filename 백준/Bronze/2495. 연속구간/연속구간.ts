import * as fs from 'fs';
const [a, b, c] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const solution = (str: string) => {
  let max = 0;
  let count = 1;
  for (let i = 0; i < str.length - 1; i++) {
    if (str[i] === str[i + 1]) {
      count++;
    } else {
      max = Math.max(max, count);
      count = 1;
    }
  }
  return Math.max(max, count);
};

console.log(solution(a));
console.log(solution(b));
console.log(solution(c));
