import * as fs from 'fs';

class Building {
  no: number;
  time: number;
  preReq: number[];
  constructor(no = 0, [time, ...preReq] = <number[]>[0]) {
    this.no = no;
    this.time = time;
    this.preReq = preReq.sort((a, b) => a - b);
  }
}

const [S, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const n = Number(S);

const buildings = [
  new Building(),
  ...inp.map(
    (li, i) =>
      new Building(i + 1, li.trim().split(' ').map(Number).slice(0, -1))
  ),
];

const cache = Array(n + 1).fill(-1);

buildings.forEach(
  (building, i) => building.preReq.length || (cache[i] = building.time)
);

const dp = (idx: number) => {
  if (cache[idx] !== -1) return cache[idx];
  const { preReq, time } = buildings[idx];
  return (cache[idx] = time + Math.max(...preReq.map(dp)));
};

console.log(
  [...Array(n + 1)]
    .map((_, i) => dp(i))
    .slice(1)
    .join('\n')
);
