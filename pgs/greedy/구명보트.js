function solution(people, limit) {
  people.sort((a, b) => a - b);
  const n = people.length;
  const solo = [];
  const pairs = [];
  while (people[people.length - 1] + people[0] > limit) solo.push(people.pop());
  let cnt = people.length;
  let l = 0,
    r = cnt - 1;
  while (l < r) people[l] + people[r] <= limit ? (l++, r--, cnt--) : r--;
  return solo.length + cnt;
}
