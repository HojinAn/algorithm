function solution(m, n, board) {
  board = board.map((el) => el.split(""));
  const dir = [
    [0, 0],
    [1, 0],
    [1, 1],
    [0, 1],
  ];
  const willBomb = (r, c) =>
    board[r][c] &&
    board[r][c] === board[r + 1][c] &&
    board[r][c] === board[r + 1][c + 1] &&
    board[r][c] === board[r][c + 1];

  const traverse = () => {
    let isBomb = false;
    const checkedBoard = [...Array(m)].map(() => Array(n).fill(false));
    for (let i = 0; i < m - 1; i++) {
      for (let j = 0; j < n - 1; j++) {
        if (willBomb(i, j)) {
          dir.forEach(([dr, dc]) => {
            checkedBoard[i + dr][j + dc] = true;
          });
          isBomb = true;
        }
      }
    }
    return [isBomb, checkedBoard];
  };

  const doBomb = (boolBoard) => {
    boolBoard.forEach((li, r) =>
      li.forEach((el, c) => el && (board[r][c] = ""))
    );
  };

  const moveDown = () => {
    for (let j = 0; j < n; j++) {
      for (let i = m - 1; i > 0; i--) {
        if (!board[i][j]) {
          let idx = i;
          while (idx >= 0) {
            if (board[idx][j]) break;
            idx--;
          }
          idx >= 0 &&
            ([board[i][j], board[idx][j]] = [board[idx][j], board[i][j]]);
        }
      }
    }
  };

  while (true) {
    const [isBomb, checkedBoard] = traverse();
    if (!isBomb) break;
    doBomb(checkedBoard);
    moveDown();
  }

  let cnt = 0;
  board.forEach((li) => li.forEach((el) => el || cnt++));
  return cnt;
}
