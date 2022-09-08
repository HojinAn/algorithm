function solution(price, money, count) {
  let accum = 0;
  for (let i = 1; i <= count; i++) accum += i * price;
  const diff = accum - money;
  return diff > 0 ? diff : 0;
}
