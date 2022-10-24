function safelyGet(object, path) {
  const [cur, ...children] = path.trim().split(".");
  return children.length
    ? object[cur]
      ? safelyGet(object, children.join("."))
      : undefined
    : object[cur];
}

const object1 = {
  repository: undefined,
};

const object2 = {
  repository: {
    readme: undefined,
  },
};

const object3 = {
  repository: {
    readme: {
      extension: "md",
      content: "금융을 쉽고 간편하게",
    },
  },
};

console.log(safelyGet(object2, "repository.readme.extension")); // -> undefined
console.log(safelyGet(object2, "repository.readme")); // -> undefined
console.log(safelyGet(object1, "repository")); // -> { readme: undefined }
// console.log(object1["readme"]);
