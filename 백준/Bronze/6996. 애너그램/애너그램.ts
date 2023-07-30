import * as fs from 'fs';
const [, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const convertTo2String = (li: string) => li.trim().split(' ');

const convertToMap = (str: string) =>
  str
    .split('')
    .reduce(
      (map, s) => ({ ...map, [s]: (map[s] || 0) + 1 }),
      {} as { [key: string]: number }
    );

const solve = ([a, b]: string[]) => {
  const convertToAnswer = (isAnagram: boolean) =>
    `${a} & ${b} are ${isAnagram ? '' : 'NOT '}anagrams.`;

  const checkIsAnagram = () => {
    const aMap = convertToMap(a);
    const bMap = convertToMap(b);
    if (aMap.size !== bMap.size) {
      return false;
    }
    for (const [key, value] of Object.entries(aMap)) {
      if (bMap[key] !== value) return false;
    }
    return true;
  };

  return convertToAnswer(checkIsAnagram());
};

console.log(inp.map(convertTo2String).map(solve).join('\n'));
