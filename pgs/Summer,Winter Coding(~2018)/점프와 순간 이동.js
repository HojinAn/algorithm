function solution(n) {
  let cnt = 0;
  while (n) n % 2 ? (n--, cnt++) : (n /= 2);
  return cnt;
}
