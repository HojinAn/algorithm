import * as fs from 'fs';
const [S1, S2, , ...inp] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');
const n = +S1;
const status = S2.trim().split(' ').map(Number);
const LIMIT = 20;

const checkIsMale = (a: number) => a === 1;
const checkIsMultiple = (a: number, b: number) => !(b % a);
const toggleSwitch = (a: number) => (a ? 0 : 1);
const checkRange = (a: number) => 0 <= a && a < n;

const convertByMale = (no: number) =>
  status.forEach(
    (el, i) => checkIsMultiple(no, i + 1) && (status[i] = toggleSwitch(el))
  );

const convertByFemale = (no: number) => {
  status[no] = toggleSwitch(status[no]);
  for (let i = 1; i < n; i++) {
    const l = no - i;
    const r = no + i;
    if (!checkRange(l) || !checkRange(r) || status[l] !== status[r]) return;
    status[l] = toggleSwitch(status[l]);
    status[r] = toggleSwitch(status[r]);
  }
};

inp.forEach((li) => {
  const [g, no] = li.trim().split(' ').map(Number);
  checkIsMale(g) ? convertByMale(no) : convertByFemale(no - 1);
});

console.log(
  [...Array(Math.ceil(n / LIMIT))]
    .map((_, i) => status.slice(i * LIMIT, (i + 1) * LIMIT).join(' '))
    .join('\n')
);
