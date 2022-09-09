function solution(dartResult) {
  const results = dartResult.match(/\d+\D{1,2}/g);
  const score = [0, 0, 0];
  const calc = (str, i) => {
    score[i] = parseInt(str);
    const desc = str.match(/\D/g);
    switch (desc[0]) {
      case "D":
        score[i] **= 2;
        break;
      case "T":
        score[i] **= 3;
        break;
    }
    switch (desc[1]) {
      case "*":
        i && (score[i - 1] *= 2);
        score[i] *= 2;
        break;
      case "#":
        score[i] *= -1;
        break;
      default:
        break;
    }
  };
  results.forEach((el, i) => calc(el, i));
  return score.reduce((acc, cur) => acc + cur);
}
