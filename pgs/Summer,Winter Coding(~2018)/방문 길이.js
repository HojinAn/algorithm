function solution(dirs) {
  const n = 11;
  const len = dirs.length;
  const visited = [...Array(n)].map(() =>
    [...Array(n)].map(() => [...Array(n)].map(() => Array(n).fill(false)))
  );
  let ans = 0;
  const cur = [5, 5];
  for (let i = 0; i < n; i++)
    for (let j = 0; j < n; j++) visited[i][j][i][j] = true;

  const isInRange = (r, c) => 0 <= r && r < n && 0 <= c && c < n;

  for (let i = 0; i < len; i++) {
    const prev = [...cur];
    switch (dirs[i]) {
      case "L":
        cur[1] > 0 && cur[1]--;
        break;
      case "R":
        cur[1] < n - 1 && cur[1]++;
        break;
      case "U":
        cur[0] > 0 && cur[0]--;
        break;
      case "D":
        cur[0] < n - 1 && cur[0]++;
        break;
    }
    if (!visited[prev[0]][prev[1]][cur[0]][cur[1]]) {
      visited[prev[0]][prev[1]][cur[0]][cur[1]] = true;
      visited[cur[0]][cur[1]][prev[0]][prev[1]] = true;
      ans++;
    }
  }
  return ans;
}
