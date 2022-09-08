function solution(arr1, arr2) {
  return arr1.map((li, i) => li.map((el, j) => el + arr2[i][j]));
}
