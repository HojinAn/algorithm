import * as fs from 'fs';
const [str1, str2, ...input] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');

const toNumArr = (str: string) => str.trim().split(' ').map(Number);

const [n] = toNumArr(str1);
const [, ...knowers] = toNumArr(str2);

const comp = (a: number, b: number) => a - b;
const partyInfos = input.map((li) => toNumArr(li).slice(1).sort(comp));

const parents = [...Array(n + 1)].map((_, i) => i);
const findParent = (a: number) =>
  parents[a] === a ? a : (parents[a] = findParent(parents[a]));
const union = (a: number) => (b: number) => {
  const pA = findParent(a);
  const pB = findParent(b);
  if (pA === pB) return false;
  pA > pB ? (parents[pA] = pB) : (parents[pB] = pA);
  return true;
};

const unionParty = ([p, ...children]: number[]) => children.forEach(union(p));
partyInfos.forEach(unionParty);

const knowerSet = new Set(knowers.map(findParent));
const checkContains = (a: number) => knowerSet.has(findParent(a));
const checkInclude = (info: number[]) => info.some(checkContains);

console.log(
  partyInfos.reduce((cnt, info) => cnt + (checkInclude(info) ? 0 : 1), 0)
);
