const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", function (line) {
  input.push(line);
}).on("close", function () {
  solution(input);
  process.exit();
});

const solution = (input) => {
  const [line1, ...lineM] = input;
  const [n, m] = line1.trim().split(" ").map(Number);
  const parents = Array(n + 1).fill(-1);
  let answer = "";

  const find = (a) => {
    if (parents[a] === -1) return a;
    return (parents[a] = find(parents[a]));
  };

  const union = (a, b) => {
    let aRoot = find(a);
    let bRoot = find(b);
    if (aRoot === bRoot) return false;
    if (aRoot > bRoot) parents[aRoot] = bRoot;
    else parents[bRoot] = aRoot;
    return true;
  };

  lineM.forEach((str) => {
    const [no, a, b] = str.trim().split(" ").map(Number);
    if (no) answer += find(a) === find(b) ? "YES\n" : "NO\n";
    else union(a, b);
  });

  console.log(answer.trim());
};
