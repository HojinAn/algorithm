import * as fs from 'fs';
const [str1, str2] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map((li) => li.trim().split(''));
const [n, m] = [str1, str2].map((li) => li.length);
type Pair = [number, string];
const LCS: Pair[][] = [...Array(n + 1)].map(() =>
  [...Array(m + 1)].map(() => [0, ''])
);

for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= m; j++) {
    if (str1[i - 1] === str2[j - 1]) {
      const [cnt, str] = LCS[i - 1][j - 1];
      LCS[i][j] = [cnt + 1, str + str1[i - 1]];
    } else {
      const [cnt1] = LCS[i - 1][j];
      const [cnt2] = LCS[i][j - 1];
      LCS[i][j] = cnt1 > cnt2 ? LCS[i - 1][j] : LCS[i][j - 1];
    }
  }
}

console.log(
  LCS.reduce<Pair>(
    ([ansCnt, ansStr], li) => {
      li.forEach(
        ([cnt, str]) => cnt > ansCnt && ((ansStr = str), (ansCnt = cnt))
      );
      return [ansCnt, ansStr];
    },
    [0, '']
  ).join('\n')
);
