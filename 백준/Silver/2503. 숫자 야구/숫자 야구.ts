import * as fs from 'fs';
const [, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const gameInfo = inp.map((li) => li.trim().split(' ').map(Number));

let cnt = 0;

const divideNumber = (no: number) => {
  return [Math.floor(no / 100), Math.floor((no % 100) / 10), no % 10];
};

const isBall = (a: number, b: number, c: number) => {
  return a === b || a === c;
};

const compare =
  ([a, b, c]: number[]) =>
  ([A, B, C]: number[]) => {
    let [strike, ball] = [0, 0];
    a === A && strike++;
    b === B && strike++;
    c === C && strike++;
    isBall(a, B, C) && ball++;
    isBall(b, A, C) && ball++;
    isBall(c, B, A) && ball++;
    return [strike, ball];
  };

for (let i = 123; i <= 987; i++) {
  const [a, b, c] = divideNumber(i);
  if (!b || !c || a === b || b === c || c === a) continue;
  const compareABC = compare([a, b, c]);
  gameInfo.every(([no, strike, ball]) => {
    const [s, b] = compareABC(divideNumber(no));
    return s === strike && b === ball;
  }) && cnt++;
}

console.log(cnt);
