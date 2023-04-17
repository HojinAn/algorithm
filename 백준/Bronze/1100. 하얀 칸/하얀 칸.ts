import * as fs from 'fs';
const inp = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
console.log(
  inp.reduce((cnt, str, r) => {
    for (let c = 0; c < str.length; c++)
      if ((r + c) % 2 === 0 && str[c] === 'F') cnt++;
    return cnt;
  }, 0)
);
