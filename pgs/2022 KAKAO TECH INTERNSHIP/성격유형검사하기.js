function solution(survey, choices) {
  const pairs = new Map([
    ["RT", 0],
    ["CF", 0],
    ["JM", 0],
    ["AN", 0],
  ]);
  const pivot = 4;
  let answer = "";
  survey.forEach((el, i) => {
    const flag = pairs.has(el);
    let score = choices[i] - pivot;
    flag || ((el = el.split("").reverse().join("")), (score *= -1));
    const val = pairs.get(el);
    pairs.set(el, val + score);
  });
  pairs.forEach((el, i) => {
    const [k1, k2] = i.split("");
    if (el > 0) answer += k2;
    else answer += k1;
  });
  return answer;
}
