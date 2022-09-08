function solution(s) {
  let cnt = 0,
    zeroCnt = 0;
  while (s.length > 1) {
    const c = s.replaceAll("0", "");
    zeroCnt += s.length - c.length;
    s = c.length.toString(2);
    cnt++;
  }
  return [cnt, zeroCnt];
}
