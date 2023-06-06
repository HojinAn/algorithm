import * as fs from 'fs';
const dishes = fs.readFileSync('/dev/stdin').toString().trim().split('');
console.log(
  dishes.reduce(
    ({ h, prev }, cur) => ({ h: h + (prev === cur ? 5 : 10), prev: cur }),
    { h: 5, prev: dishes[0] }
  ).h
);
