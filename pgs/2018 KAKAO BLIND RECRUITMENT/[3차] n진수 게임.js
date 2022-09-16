function solution(n, t, m, p) {
  let str = "";
  for (let i = 0; i <= m * t; i++) str += i.toString(n).toUpperCase();
  let ans = "";
  for (let i = p - 1; i < m * t; i += m) ans += str[i];
  return ans;
}
