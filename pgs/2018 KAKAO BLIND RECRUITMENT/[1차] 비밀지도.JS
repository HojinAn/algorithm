function solution(n, arr1, arr2) {
  const answer = [];
  for (let i = 0; i < n; i++) {
    let line = "";
    for (let j = n - 1; j >= 0; j--) {
      if (arr1[i] & (1 << j) || arr2[i] & (1 << j)) line += "#";
      else line += " ";
    }
    answer.push(line);
  }
  return answer;
}
