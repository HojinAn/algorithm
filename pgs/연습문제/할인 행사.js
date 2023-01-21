function solution(want, number, discount, len = discount.length) {
  const wantCntArr = want.map((str, i) => [str, number[i]]);
  const discountCounter = discount.slice(0, 10).reduce((counter, el) => {
    counter[el] = (counter[el] ?? 0) + 1;
    return counter;
  }, {});

  const checkIsPossible = () =>
    wantCntArr.every(([str, cnt]) => discountCounter[str] >= cnt);

  let ans = checkIsPossible(discountCounter) ? 1 : 0;

  for (let i = 0; i < len - 10; i++) {
    discountCounter[discount[i]]--;
    discountCounter[discount[i + 10]] =
      (discountCounter[discount[i + 10]] ?? 0) + 1;
    checkIsPossible() && ans++;
  }
  return ans;
}
