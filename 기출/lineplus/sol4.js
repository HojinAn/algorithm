class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}
class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  size = () => this.length;
  push = (val) => {
    const node = new Node(val);
    if (!this.head) this.head = node;
    else this.tail.next = node;
    this.tail = node;
    this.length++;
  };
  poll = () => {
    if (!this.head) return null;
    const oldHead = this.head;
    this.head = oldHead.next;
    oldHead.next = null;
    if (!this.head) this.tail = null;
    this.length--;
    return oldHead.val;
  };
}

function solution(wall) {
  const n = wall.length;
  const m = wall[0].length;
  const start = [n - 1, 0];
  const blank = ".";
  const hold = "H";
  const block = "X";

  const ans = [...Array(n)].map(() => Array(m).fill(0));
  const visited = [...Array(n)].map(() => Array(m).fill(false));

  const defaultDir = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  const dir1 = [
    [0, 2],
    [0, -2],
  ];
  const dir2 = [
    [0, 3],
    [0, -3],
  ];
  const dir3 = [
    [-1, 1],
    [-1, -1],
  ];
  const dir4 = [[-2, 0]];

  const isInRange = (r, c) => 0 <= r && r < n && 0 <= c && c < m;

  const valid1 = (rFrom, cFrom, rTo, cTo) => {
    if (rFrom !== rTo) return false;
    if (rFrom === 0) return false;
    if (Math.abs(cFrom - cTo) !== 2) return false;
    const mid = (cFrom + cTo) / 2;
    return (
      wall[rFrom - 1][cFrom] === blank &&
      wall[rFrom - 1][mid] === blank &&
      wall[rFrom - 1][cTo] === blank &&
      wall[rFrom][mid] === blank
    );
  };
  const valid2 = (rFrom, cFrom, rTo, cTo) => {
    if (rFrom !== rTo) return false;
    if (rFrom === 0) return false;
    if (Math.abs(cFrom - cTo) !== 3) return false;
    if (cFrom > cTo) [cFrom, cTo] = [cTo, cFrom];
    // cTo가 cFrom보다 큼
    return (
      wall[rFrom - 1][cFrom] === blank &&
      wall[rFrom - 1][cFrom + 1] === blank &&
      wall[rFrom - 1][cFrom + 2] === blank &&
      wall[rFrom - 1][cTo] === blank &&
      wall[rFrom][cFrom + 1] === blank &&
      wall[rFrom][cFrom + 2] === blank
    );
  };
  const valid3 = (rFrom, cFrom, rTo, cTo) => {
    return wall[rFrom - 1][cFrom] === blank && wall[rTo + 1][cTo] === blank;
  };
  const valid4 = (rFrom, cFrom, rTo, cTo) => {
    return wall[rFrom - 1][cFrom] === blank;
  };

  const bfs = (r, c) => {
    const q = new Queue();
    q.push([r, c, 1]);
    visited[r][c] = true;
    while (q.size()) {
      const [cr, cc, cCnt] = q.poll();
      ans[cr][cc] = cCnt;
      defaultDir.forEach(([dr, dc]) => {
        const [nr, nc] = [cr + dr, cc + dc];
        if (isInRange(nr, nc) && wall[nr][nc] === hold && !visited[nr][nc]) {
          visited[nr][nc] = true;
          q.push([nr, nc, cCnt + 1]);
        }
      });
      dir1.forEach(([dr, dc]) => {
        const [nr, nc] = [cr + dr, cc + dc];
        if (
          isInRange(nr, nc) &&
          wall[nr][nc] === hold &&
          valid1(cr, cc, nr, nc) &&
          !visited[nr][nc]
        ) {
          visited[nr][nc] = true;
          q.push([nr, nc, cCnt + 1]);
        }
      });
      dir2.forEach(([dr, dc]) => {
        const [nr, nc] = [cr + dr, cc + dc];
        if (
          isInRange(nr, nc) &&
          wall[nr][nc] === hold &&
          valid2(cr, cc, nr, nc) &&
          !visited[nr][nc]
        ) {
          visited[nr][nc] = true;
          q.push([nr, nc, cCnt + 1]);
        }
      });
      dir3.forEach(([dr, dc]) => {
        const [nr, nc] = [cr + dr, cc + dc];
        if (
          isInRange(nr, nc) &&
          wall[nr][nc] === hold &&
          valid3(cr, cc, nr, nc) &&
          !visited[nr][nc]
        ) {
          visited[nr][nc] = true;
          q.push([nr, nc, cCnt + 1]);
        }
      });
      dir4.forEach(([dr, dc]) => {
        const [nr, nc] = [cr + dr, cc + dc];
        if (
          isInRange(nr, nc) &&
          wall[nr][nc] === hold &&
          valid4(cr, cc, nr, nc) &&
          !visited[nr][nc]
        ) {
          visited[nr][nc] = true;
          q.push([nr, nc, cCnt + 1]);
        }
      });
    }
  };
  bfs(n - 1, 0);
  return wall.map((li, r) =>
    li.split("").map((el, c) => {
      if (el === hold) {
        if (ans[r][c] === 0) return -1;
        else return ans[r][c];
      } else return 0;
    })
  );
}
