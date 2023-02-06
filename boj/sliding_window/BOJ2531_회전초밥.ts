import * as fs from 'fs';
const [S, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [n, , k, c] = S.trim().split(' ').map(Number);
const sushi = inp.map(Number);

const checkHasCoupon = (counter: Map<number, number>) => !!counter.get(c);

const counter = sushi
  .slice(0, k)
  .reduce(
    (counter, no) => (counter.set(no, (counter.get(no) ?? 0) + 1), counter),
    new Map<number, number>()
  );

console.log(
  sushi.reduce(
    ({ counter, ans }, no, idx) => {
      const prev = counter.get(no)!;
      prev === 1 ? counter.delete(no) : counter.set(no, prev - 1);
      const next = sushi[(idx + k) % n];
      counter.set(next, (counter.get(next) ?? 0) + 1);
      ans = Math.max(ans, counter.size + (checkHasCoupon(counter) ? 0 : 1));
      return { counter, ans };
    },
    { counter, ans: 0 }
  ).ans
);
