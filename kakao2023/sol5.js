class Node {
  constructor(r, c) {
    this.r = r;
    this.c = c;
    this.parent = null;
    this.children = [];
    this.val = null;
  }
}
function solution(commands) {
  const table = [...Array(50)].map((_, i) =>
    [...Array(50)].map((_, j) => new Node(i, j))
  );
  const answer = [];

  const updateRC = ([r, c, val]) => {
    r = +r - 1;
    c = +c - 1;
    if (table[r][c].parent) table[r][c].parent.val = val;
    else table[r][c].val = val;
  };

  const updateVal = ([val1, val2]) => {
    for (let i = 0; i < 50; i++) {
      for (let j = 0; j < 50; j++) {
        if (table[i][j].parent && table[i][j].parent.val === val1)
          table[i][j].parent.val = val2;
        else if (table[i][j].val === val1) table[i][j].val = val2;
      }
    }
  };

  const getVal = (r, c) => {
    if (table[r][c].parent) return table[r][c].parent.val;
    else return table[r][c].val;
  };

  const mergeRC = ([r1, c1, r2, c2]) => {
    r1 = +r1 - 1;
    r2 = +r2 - 1;
    c1 = +c1 - 1;
    c2 = +c2 - 1;
    if (table[r1][c1].parent) {
      const parent = table[r1][c1].parent;
      r1 = parent.r;
      c1 = parent.c;
    }
    let [rFrom, cFrom] = [Math.min(r1, r2), Math.min(c1, c2)];
    let [rTo, cTo] = [Math.max(r1, r2), Math.max(c1, c2)];
    const val = getVal(r1, c1) ?? getVal(r2, c2);
    table[r1][c1].val = val;
    if (table[r2][c2].children) {
      table[r2][c2].children.forEach((node) => {
        const r = node.r;
        const c = node.c;
        [rFrom, cFrom] = [Math.min(r, rFrom), Math.min(c, cFrom)];
        [rTo, cTo] = [Math.max(r, rTo), Math.max(c, cTo)];
      });
    }
    unmerge([`${r2 + 1}`, `${c2 + 1}`]);
    for (let i = rFrom; i <= rTo; i++) {
      for (let j = cFrom; j <= cTo; j++) {
        if (i === r1 && j === c1) continue;
        table[i][j].parent = table[r1][c1];
        table[i][j].val = null;
        table[r1][c1].children.push(table[i][j]);
      }
    }
  };

  const unmerge = ([r, c]) => {
    r = +r - 1;
    c = +c - 1;
    if (table[r][c].parent) {
      const parent = table[r][c].parent;
      table[r][c].val = parent.val;
      parent.val = null;
      while (parent.children.length) {
        const child = parent.children.pop();
        child.parent = null;
      }
    } else {
      while (table[r][c].children.length) {
        const child = table[r][c].children.pop();
        child.parent = null;
      }
    }
  };

  const print = ([r, c]) => {
    r = +r - 1;
    c = +c - 1;
    answer.push(getVal(r, c) ?? "EMPTY");
  };

  commands.forEach((el) => {
    const [cmd, ...rest] = el.trim().split(" ");
    switch (cmd) {
      case "UPDATE":
        if (rest.length === 3) updateRC(rest);
        else updateVal(rest);
        break;
      case "MERGE":
        mergeRC(rest);
        break;
      case "UNMERGE":
        unmerge(rest);
        break;
      case "PRINT":
        print(rest);
        break;
    }
  });

  return answer;
}
