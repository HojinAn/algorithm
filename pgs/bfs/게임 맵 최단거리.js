function solution(maps) {
  const dir = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];
  const n = maps.length;
  const m = maps[0].length;

  const checkIsInRange = (r, c) => 0 <= r && r < n && 0 <= c && c < m;

  let answer = -1;
  const q = [];
  let qIdx = 0,
    qSize = 0;
  q[qSize++] = [0, 0, 1];
  while (qIdx < qSize) {
    const [cr, cc, cnt] = q[qIdx++];
    if (cr === n - 1 && cc === m - 1) {
      answer = cnt;
      break;
    }
    dir.forEach(([dr, dc]) => {
      const [nr, nc] = [cr + dr, cc + dc];
      if (checkIsInRange(nr, nc) && maps[nr][nc]) {
        maps[nr][nc] = 0;
        q[qSize++] = [nr, nc, cnt + 1];
      }
    });
  }
  return answer;
}
