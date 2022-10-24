function createQueryString(object) {
  let query = "?";
  Object.entries(object).forEach(
    ([key, value]) =>
      value !== undefined &&
      value !== null &&
      (Array.isArray(value)
        ? value.forEach((el) => {
            query += `${encodeURIComponent(key)}=${encodeURIComponent(el)}&`;
          })
        : (query += `${encodeURIComponent(key)}=${encodeURIComponent(value)}&`))
  );

  return query.slice(0, -1);
}

function solution(input) {
  var object = JSON.parse(input);
  var answer = createQueryString(object);
  return answer;
}
console.log(
  createQueryString({
    foo: "bar",
    nope: null,
    npe: undefined,
    enabled: true,
    bar: [1, 2, 3],
    cat: "this is test",
  })
);
