import * as fs from 'fs';
const inp = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const gradeMap = new Map([
  ['A+', 4.5],
  ['A0', 4.0],
  ['B+', 3.5],
  ['B0', 3.0],
  ['C+', 2.5],
  ['C0', 2.0],
  ['D+', 1.5],
  ['D0', 1.0],
  ['F', 0.0],
]);

let totalCredit = 0;
let gotCredit = 0;
inp.forEach((li) => {
  const [, p, grade] = li.trim().split(' ');
  const point = +p;
  if (grade === 'P') return;
  totalCredit += point;
  gotCredit += gradeMap.get(grade)! * point;
});

console.log((gotCredit / totalCredit).toFixed(6));
