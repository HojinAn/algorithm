function solution(d, budget) {
  d.sort((a, b) => a - b);
  let sum = 0,
    cnt = 0;
  for (let i = 0, n = d.length; i < n; i++) {
    if (sum + d[i] <= budget) {
      sum += d[i];
      cnt++;
    } else break;
  }
  return cnt;
}
