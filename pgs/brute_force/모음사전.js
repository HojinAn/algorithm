function solution(word) {
  const aeiou = ["", "A", "E", "I", "O", "U"];
  const set = new Set();
  const repPermu = (depth, str) => {
    if (depth === 5) {
      set.add(str);
      return;
    }
    aeiou.forEach((el) => {
      repPermu(depth + 1, str + el);
    });
  };
  aeiou.slice(1).forEach((el) => repPermu(1, el));
  const answer = new Map([...set].sort().map((el, i) => [el, i + 1]));
  return answer.get(word);
}
