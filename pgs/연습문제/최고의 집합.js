function solution(n, s) {
  const ans = [];
  const shr = Math.floor(s / n);
  if (!shr) return [-1];
  s -= shr * n;
  n -= s;
  for (let i = 0; i < n; i++) ans.push(shr);
  for (let i = 0; i < s; i++) ans.push(shr + 1);
  return ans;
}
