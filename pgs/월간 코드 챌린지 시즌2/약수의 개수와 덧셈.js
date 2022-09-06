function solution(left, right) {
  const from = Math.ceil(left ** 0.5);
  const to = Math.floor(right ** 0.5);
  const sqr = [];
  for (let i = from; i <= to; i++) sqr.push(i * i);
  let ans = sqr.reduce((acc, cur) => acc - 2 * cur, 0);
  for (let i = left; i <= right; i++) ans += i;
  return ans;
}
