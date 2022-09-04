function solution(lottos, win_nums) {
  const set = new Set();
  let cntZero = 0;
  lottos.forEach((el) => {
    if (win_nums.includes(el)) set.add(el);
    !el && cntZero++;
  });
  const min = set.size;
  const max = min + cntZero;
  const rank = (score) => {
    switch (score) {
      case 6:
        return 1;
      case 5:
        return 2;
      case 4:
        return 3;
      case 3:
        return 4;
      case 2:
        return 5;
      default:
        return 6;
    }
  };
  return [rank(max), rank(min)];
}
