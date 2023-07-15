import * as fs from 'fs';
const inp = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let max = 0;
inp.reduce((acc, li) => {
  const [minus, plus] = li.split(' ').map(Number);
  const no = acc - minus + plus;
  max = Math.max(max, no);
  return no;
}, 0);
console.log(max);
