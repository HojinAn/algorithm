import * as fs from 'fs';
const [S1, S2] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
(() => {
  if (!S2) {
    console.log(1);
    return;
  }
  const [n, taesoo, p] = toNums(S1);
  const scores = toNums(S2);
  let curRank = 1;
  let curScore = scores[0];
  const limit = Math.min(p, n);
  const scoreRanks = scores.map((score, idx) => {
    curRank = curScore === score ? curRank : idx + 1;
    const rank = curRank;
    curScore = score;
    return [score, rank];
  });

  if (p <= n) {
    for (let i = 0; i < p; i++) {
      const [score, rank] = scoreRanks[i];
      if (
        score < taesoo ||
        (score === taesoo && rank !== scoreRanks[p - 1][1])
      ) {
        console.log(rank);
        return;
      }
    }
    console.log(-1);
    return;
  }
  for (let i = 0; i < n; i++) {
    const [score, rank] = scoreRanks[i];
    if (score <= taesoo) {
      console.log(rank);
      return;
    }
  }
  console.log(n + 1);
})();

function toNums(str: string) {
  return str.trim().split(' ').map(Number);
}
