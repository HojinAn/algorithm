function solution(arr) {
  const answer = [];
  arr.forEach((el) => {
    answer.length && answer[answer.length - 1] === el && answer.pop();
    answer.push(el);
  });

  return answer;
}
