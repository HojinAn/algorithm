import * as fs from 'fs';
const n = +fs.readFileSync('/dev/stdin').toString();

const numSet = new Set<number>();
const generateDescNum = (arr: number[]) => {
  numSet.add(+arr.join(''));
  for (let i = 0; i < 10; i++)
    if (arr[arr.length - 1] > i) generateDescNum([...arr, i]);
};
for (let i = 0; i < 10; i++) generateDescNum([i]);
console.log(Array.from(numSet).sort((a, b) => a - b)[n - 1] ?? -1);
