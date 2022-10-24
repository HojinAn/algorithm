function solution(cap, n, deliveries, pickups) {
  const deliStack = [];
  const pickStack = [];
  deliveries.forEach((el, i) => el && deliStack.push([el, i + 1]));
  pickups.forEach((el, i) => el && pickStack.push([el, i + 1]));
  let ans = 0;
  while (1) {
    const deliLen = deliStack.length;
    const pickLen = pickStack.length;
    if (!deliLen && !pickLen) break;
    const toGo = Math.max(
      deliLen ? deliStack[deliLen - 1][1] : 0,
      pickLen ? pickStack[pickLen - 1][1] : 0
    );
    ans += 2 * toGo;
    let deliCnt = cap;
    while (deliCnt && deliStack.length) {
      const [cnt, idx] = deliStack.pop();
      if (deliCnt >= cnt) deliCnt -= cnt;
      else {
        deliStack.push([cnt - deliCnt, idx]);
        deliCnt = 0;
      }
    }
    deliCnt = cap;
    while (deliCnt && pickStack.length) {
      const [cnt, idx] = pickStack.pop();
      if (deliCnt >= cnt) deliCnt -= cnt;
      else {
        pickStack.push([cnt - deliCnt, idx]);
        deliCnt = 0;
      }
    }
  }
  return ans;
}
