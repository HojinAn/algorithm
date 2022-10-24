function solution(today, terms, privacies) {
  const answer = [];
  const termsMap = new Map(
    terms.map((el) => {
      const arr = el.split(" ");
      return [arr[0], +arr[1]];
    })
  );
  const todayToNo = +today.split(".").join("");
  console.log(todayToNo);
  privacies.forEach((privacy, i) => {
    const [date, termKey] = privacy.split(" ");
    const term = termsMap.get(termKey);
    const [sY, sM, sD] = date.split(".").map(Number);
    const year = Math.floor(term / 12);
    const month = term % 12;
    const dueDate = [sY + year, sM + month, sD - 1];
    if (dueDate[2] === 0) {
      dueDate[2] = 28;
      dueDate[1]--;
    }
    if (dueDate[1] > 12) {
      dueDate[0] += Math.floor(dueDate[1] / 12);
      dueDate[1] %= 12;
    }
    const dueToNo = +`${dueDate[0]}${("" + dueDate[1]).padStart(2, "0")}${(
      "" + dueDate[2]
    ).padStart(2, "0")}`;
    if (todayToNo > dueToNo) answer.push(i + 1);
  });
  return answer;
}
