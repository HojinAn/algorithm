function solution(gems) {
  const typeCnt = new Set(gems).size;
  const n = gems.length;
  const counter = new Map();
  const ans = [];
  let left = 0,
    right = 0;
  for (let i = 0; i < n; i++) {
    counter.set(gems[i], (counter.get(gems[i]) ?? 0) + 1);
    if (counter.size === typeCnt) {
      right = i;
      ans.push([1, i + 1]);
      break;
    }
  }
  let windowSize = right + 1;
  while (left < n) {
    const key = gems[left];
    const val = counter.get(key);
    if (val === 1) {
      counter.delete(key);
      left++;
      right++;
      if (right < n) {
        counter.set(gems[right], (counter.get(gems[right]) ?? 0) + 1);
      }
    } else {
      counter.set(key, val - 1);
      left++;
      if (counter.size === typeCnt) {
        windowSize--;
        ans.push([left + 1, left + windowSize]);
      } else {
        right++;
        if (right < n) {
          counter.set(gems[right], (counter.get(gems[right]) ?? 0) + 1);
        }
      }
    }
  }
  ans.sort((a, b) => {
    const [l, r] = [a[1] - a[0], b[1] - b[0]];
    return l === r ? a[0] - b[0] : l - r;
  });
  return ans[0];
}
