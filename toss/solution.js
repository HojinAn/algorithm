function solution(codeOwnersMap, directory) {
  const answer = [];
  const path = directory.trim().split("/");
  let idx = 0;
  const getOwner = (obj) => {
    for (const key in obj)
      key === path[idx] &&
        (idx++,
        Array.isArray(obj[key])
          ? obj[key].forEach((el) => answer.push(el))
          : getOwner(obj[key]));
  };
  getOwner(codeOwnersMap);
  return answer;
}
const codeOwnersMap = {
  scripts: ["배수진"],
  services: {
    "business-ledger": ["고찬균", "배수진"],
    "toss-card": ["채주민", "유재섭"],
    payments: ["유재섭"],
  },
};
console.log(solution(codeOwnersMap, "services/business-ledger"));
