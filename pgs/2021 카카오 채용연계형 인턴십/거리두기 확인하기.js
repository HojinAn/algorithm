function solution(places) {
  const solve = (place) => {
    const isInRange = (r, c) => 0 <= r && r < 5 && 0 <= c && c < 5;
    const dir = [
      [-1, 0],
      [0, 1],
      [1, 0],
      [0, -1],
    ];
    const mannerGood = (r, c) => {
      const q = [[r, c, 0]];
      const visited = [...Array(5)].map(() => Array(5).fill(false));
      visited[r][c] = true;
      while (q.length) {
        const [cr, cc, cnt] = q.shift();
        for (const [dr, dc] of dir) {
          const [nr, nc] = [cr + dr, cc + dc];
          if (
            isInRange(nr, nc) &&
            !visited[nr][nc] &&
            place[nr][nc] !== "X" &&
            cnt < 2
          ) {
            visited[nr][nc] = true;
            if (place[nr][nc] === "P") return false;
            q.push([nr, nc, cnt + 1]);
          }
        }
      }
      return true;
    };
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        switch (place[i][j]) {
          case "P":
            if (!mannerGood(i, j)) return 0;
            break;
          default:
            break;
        }
      }
    }
    return 1;
  };
  return places.map((el) => solve(el));
}
