function solution(n) {
  let ans = 0;
  for (let i = 1; i <= n; i++) !(n % i) && (n / i) % 2 && ans++;
  return ans;
}
