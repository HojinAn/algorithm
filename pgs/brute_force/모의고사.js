function solution(answers) {
  const arr1 = [1, 2, 3, 4, 5];
  const arr2 = [2, 2, 2, 3, 2, 4, 2, 5];
  const arr3 = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];
  let idx1 = 0,
    idx2 = 0,
    idx3 = 0;
  const size1 = arr1.length,
    size2 = arr2.length,
    size3 = arr3.length;
  let ans1 = 0,
    ans2 = 0,
    ans3 = 0;
  answers.forEach((el) => {
    if (arr1[idx1++] === el) ans1++;
    if (arr2[idx2++] === el) ans2++;
    if (arr3[idx3++] === el) ans3++;
    idx1 %= size1;
    idx2 %= size2;
    idx3 %= size3;
  });
  const answer = [
    [1, ans1],
    [2, ans2],
    [3, ans3],
  ];
  answer.sort((a, b) => b[1] - a[1]);
  const max = answer[0][1];
  return answer.filter(([idx, val]) => val === max).map((el) => el[0]);
}
