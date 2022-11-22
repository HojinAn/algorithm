import * as fs from 'fs';
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
input.pop();

const VOWEL = /[aeiou]/;

const generateAnswerStr = (str: string, isAcceptable: boolean) =>
  `<${str}> is ${isAcceptable ? '' : 'not '}acceptable.`;
const checkCondition1 = (str: string) => {
  return new RegExp(VOWEL, 'g').test(str);
};
const checkContition2 = (str: string) => {
  let vowelCnt = 0;
  let consonantCnt = 0;
  for (let i = 0, n = str.length; i < n; i++) {
    VOWEL.test(str[i])
      ? (vowelCnt++, (consonantCnt = 0))
      : (consonantCnt++, (vowelCnt = 0));
    if (vowelCnt >= 3 || consonantCnt >= 3) return false;
  }
  return true;
};
const checkCondition3 = (str: string) => {
  const n = str.length;
  for (let i = 0; i < n - 1; i++) {
    if (str[i] === 'e' || str[i] === 'o') continue;
    if (str[i] === str[i + 1]) return false;
  }
  return true;
};
const testHighQuality = (str: string) => {
  return checkCondition1(str) && checkContition2(str) && checkCondition3(str);
};

console.log(
  input
    .reduce((ans, str) => {
      ans.push(generateAnswerStr(str, testHighQuality(str)));
      return ans;
    }, <string[]>[])
    .join('\n')
);
