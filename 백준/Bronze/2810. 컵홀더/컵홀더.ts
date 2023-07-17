import * as fs from 'fs';
const [, seats] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const solution = (seats: string) => {
  let answer = 1;
  let count = 0;
  for (let i = 0; i < seats.length; i++) {
    if (seats[i] === 'S') answer++;
    else {
      count++;
      if (count === 2) {
        answer++;
        count = 0;
      }
    }
  }
  console.log(Math.min(answer, seats.length));
};

solution(seats);
