function solution(numbers) {
  const answer = [];
  const f = (no) => {
    if (no % 2 === 0) return no + 1;
    const bit = '0' + no.toString(2);
    const idx = bit.lastIndexOf('0');
    return parseInt(`${bit.slice(0, idx)}10${bit.slice(idx + 2)}`, 2);
  };
  numbers.forEach((no) => answer.push(f(no)));
  return answer;
}
