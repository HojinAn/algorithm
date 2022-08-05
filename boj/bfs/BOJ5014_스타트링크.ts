import * as fs from "fs";
(() => {
  const [f, s, g, u, d] = fs
      .readFileSync("/dev/stdin")
      .toString()
      .trim()
      .split(" ")
      .map(Number),
    q = [[s, 0]],
    visited = [...Array(f + 1)];
  let qSize = 1,
    qIdx = 0;

  visited[s] = true;
  if (s === g) {
    console.log(0);
    return;
  }
  while (qIdx < qSize) {
    const [cur, cnt] = q[qIdx++];
    for (const el of [u, -d]) {
      const next = cur + el;
      if (1 <= next && next <= f) {
        if (!visited[next]) {
          visited[next] = true;
          if (next === g) {
            console.log(cnt + 1);
            return;
          }
          q[qSize++] = [next, cnt + 1];
        }
      }
    }
  }
  console.log("use the stairs");
})();
