import * as fs from 'fs';
const inp = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

inp.pop();
console.log(
  inp
    .reduce((ans, li) => {
      ans.push(solve(+li));
      return ans;
    }, [] as string[])
    .join('\n')
);

function checkIsPerfect(no: number): [boolean, number[], number] {
  const numbers = [1];
  for (let i = 2; i * i <= no; i++)
    !(no % i) && (numbers.push(i), numbers.push(no / i));
  return [
    numbers.reduce((s, n) => s + n) === no,
    numbers.sort((a, b) => a - b),
    no,
  ];
}

function solve(n: number) {
  const [isPerfect, numbers, no] = checkIsPerfect(n);
  if (isPerfect) return `${no} = ${numbers.join(' + ')}`;
  return `${no} is NOT perfect.`;
}
