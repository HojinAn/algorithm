function solution(n, a, b) {
  let cnt = 0;
  if (a > b) [a, b] = [b, a];
  const nextNo = (n, m, depth) => {
    if (m - n === 1 && n % 2) {
      cnt = depth;
      return;
    }
    nextNo(Math.ceil(n / 2), Math.ceil(m / 2), depth + 1);
  };
  nextNo(a, b, 1);
  return cnt;
}

// while문으로 더 예쁘게
function solution(n, a, b) {
  let cnt = 0;
  if (a > b) [a, b] = [b, a];
  while (a !== b) (a = Math.ceil(a / 2)), (b = Math.ceil(b / 2)), cnt++;
  return cnt;
}
