function solution(n, words) {
  const answer = [0, 0];
  let idx = 0;
  let cnt = 1;
  let lastChar = words[0][0];
  const set = new Set();
  for (const word of words) {
    if (set.has(word) || word[0] !== lastChar)
      return [(idx % n) + 1, Math.ceil(cnt / n)];
    set.add(word);
    lastChar = word.slice(-1);
    idx++, cnt++;
  }
  return answer;
}
