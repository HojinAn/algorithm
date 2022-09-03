function solution(participant, completion) {
  const map = new Map();
  participant.forEach((el) => {
    const val = map.get(el);
    val ? map.set(el, val + 1) : map.set(el, 1);
  });
  completion.forEach((el) => {
    const val = map.get(el);
    map.set(el, val - 1);
  });
  let answer = "";
  map.forEach((el, i) => el && (answer = i));
  return answer;
}
