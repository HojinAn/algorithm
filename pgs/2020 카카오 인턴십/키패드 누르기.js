function solution(numbers, hand) {
  const answer = [];
  const cur = [
    [3, 0],
    [3, 2],
  ];
  const position = new Map([
    [1, [0, 0]],
    [2, [0, 1]],
    [3, [0, 2]],
    [4, [1, 0]],
    [5, [1, 1]],
    [6, [1, 2]],
    [7, [2, 0]],
    [8, [2, 1]],
    [9, [2, 2]],
    [0, [3, 1]],
  ]);
  const distance = (a, b) => {
    let dist = 0;
    dist += Math.abs(a[0] - b[0]);
    dist += Math.abs(a[1] - b[1]);
    return dist;
  };
  const compare = (no) => {
    const distL = distance(cur[0], position.get(no));
    const distR = distance(cur[1], position.get(no));
    if (distL === distR) return hand === "left" ? "L" : "R";
    else if (distL > distR) return "R";
    else return "L";
  };
  numbers.forEach((el) => {
    switch (el) {
      case 1:
      case 4:
      case 7:
        answer.push("L");
        cur[0] = position.get(el);
        break;
      case 3:
      case 6:
      case 9:
        answer.push("R");
        cur[1] = position.get(el);
        break;
      default:
        const selected = compare(el);
        answer.push(selected);
        cur[selected === "L" ? 0 : 1] = position.get(el);
        break;
    }
  });

  return answer.join("");
}
