function solution(arr1, arr2) {
  return arr1.reduce((ans, r1) => {
    ans.push(
      arr2.reduce((li, _, j) => {
        li.push(r1.reduce((acc, cur, k) => acc + cur * arr2[k][j], 0));
        return li;
      }, [])
    );
    return ans;
  }, []);
}

// map으로 하는거
function solution(arr1, arr2) {
  return arr1.map((row) =>
    arr2[0].map((_, r) => row.reduce((acc, el, c) => acc + el * arr2[c][r], 0))
  );
}
