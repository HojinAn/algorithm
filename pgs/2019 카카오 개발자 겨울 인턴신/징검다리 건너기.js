function solution(stones, k) {
  const isPossible = (no) => {
    let cnt = 0,
      res = 0;
    for (const el of stones) {
      if (el < no) cnt++;
      else {
        res = Math.max(res, cnt);
        if (res >= k) return false;
        cnt = 0;
      }
    }
    return Math.max(res, cnt) < k;
  };
  let l = 0,
    r = 200000001;
  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    isPossible(mid) ? (l = mid + 1) : (r = mid - 1);
  }
  return l - 1;
}
