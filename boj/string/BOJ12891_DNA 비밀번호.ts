import * as fs from 'fs';
const [li1, dna, li2] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');

const [dnaLen, p] = li1.trim().split(' ').map(Number);
const [A, C, G, T] = li2.trim().split(' ').map(Number);

const dnaMap = { A, C, G, T } as const;

const subStrMap = { A: 0, C: 0, G: 0, T: 0 };

for (let i = 0; i < p; i++) {
  subStrMap[dna[i]]++;
}

let ans = 0;
for (let i = 0; i <= dnaLen - p; i++) {
  if (
    dnaMap.A <= subStrMap.A &&
    dnaMap.C <= subStrMap.C &&
    dnaMap.G <= subStrMap.G &&
    dnaMap.T <= subStrMap.T
  ) {
    ans++;
  }
  subStrMap[dna[i]]--;
  subStrMap[dna[i + p]]++;
}

console.log(ans);
