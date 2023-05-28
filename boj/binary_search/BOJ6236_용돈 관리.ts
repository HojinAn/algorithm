import * as fs from 'fs';
const [s1, ...inp] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');
const [N, M] = s1.split(' ').map(Number);
const budgets = inp.map(Number);

const solution = (N: number, M: number, budgets: number[]) => {
  let left = Math.max(...budgets);
  let right = budgets.reduce((acc, cur) => acc + cur, 0);
  let result = 0;

  while (left <= right) {
    const K = Math.floor((left + right) / 2);
    let sum = 0;

    const cnt = budgets.reduce((cnt, el) => {
      if (sum + el > K) {
        cnt++;
        sum = 0;
      }
      sum += el;
      return cnt;
    }, 1);

    if (cnt <= M) {
      result = K;
      right = K - 1;
    } else left = K + 1;
  }

  console.log(result);
};

solution(N, M, budgets);
