function solution(queries) {
  let answer = 0;
  const arrMap = new Map();
  queries.forEach(([idx, toAdd]) => {
    const idxCnt = arrMap.get(idx);
    if (idxCnt === undefined) {
      let idxSize = 1;
      while (idxSize < toAdd) idxSize <<= 1;
      arrMap.set(idx, [idxSize, toAdd]);
    } else {
      const [curSize, curCnt] = idxCnt;
      let idxSize = curSize;
      if (toAdd + curCnt > curSize) {
        while (idxSize < toAdd + curCnt) idxSize <<= 1;
      }
      if (idxSize > curSize) answer += curCnt;
      arrMap.set(idx, [idxSize, toAdd + curCnt]);
    }
  });
  return answer;
}
