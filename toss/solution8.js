function parse(route, path) {
  const routeArr = route.split("/");
  const pathArr = path.split("/");
  const n = routeArr.length > pathArr.length ? routeArr.length : pathArr.length;
  for (let i = 1; i < n; i += 2) {
    if (routeArr[i] !== pathArr[i])
      return {
        matches: false,
      };
  }
  const answer = {
    matches: true,
  };
  const params = {};
  for (let i = 2; i < n; i += 2) params[routeArr[i].slice(1, -1)] = pathArr[i];
  answer["params"] = params;
  return answer;
}

function solution(route, path) {
  var result = parse(route, path);
  return JSON.stringify(result);
}
console.log(
  solution(
    "/service/[serviceId]/deployment/[deploymentId]",
    "/service/1/deployment/9"
  )
);
