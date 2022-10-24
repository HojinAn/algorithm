function solution(paths) {
  let wholePaths = "";
  paths.forEach((el) => {
    let tmp = el;
    el[0] === "/" && (tmp = tmp.slice(1));
    el[el.length - 1] === "/" && (tmp = tmp.slice(0, -1));
    wholePaths += `${tmp}/`;
  });
  const answer = [];
  wholePaths.split("/").forEach((el) => {
    switch (el) {
      case "...":
        answer.pop();
      case "..":
        answer.pop();
        break;
      case ".":
        break;
      default:
        answer.push(el);
        break;
    }
  });
  return `/${answer.join("/").slice(0, -1)}`;
}

console.log(solution(["/foo", "bar", "baz/asdf"]));
console.log(solution(["/foo", "bar", "baz/asdf", "quux", ".."]));
console.log(solution(["/foo", "bar", "baz", "...", "asdf"]));
console.log(solution(["/foo", "bar", "/baz", "...", "ab/"]));
console.log(solution(["/foo", ".."]));
console.log(solution(["/foo", "..", "..", "ab"]));
