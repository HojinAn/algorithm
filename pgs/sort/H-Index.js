function solution(citations) {
  let l = 0,
    r = citations.length;
  let ans = 0;
  const possible = (cnt) => citations.filter((el) => el >= cnt).length >= cnt;
  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    possible(mid) ? ((l = mid + 1), (ans = mid)) : (r = mid - 1);
  }
  return ans;
}
