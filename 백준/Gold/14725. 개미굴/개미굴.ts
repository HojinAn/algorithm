import * as fs from 'fs';

const [, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

type Trie = Map<string, Trie>;
const trie: Trie = new Map();

inp.forEach((li) => {
  const [, ...infos] = li.trim().split(' ');
  let pointer = trie;
  infos.forEach((info) => {
    const next: Trie = pointer.get(info) ?? new Map();
    pointer.set(info, next);
    pointer = next;
  });
});

const dfs = (trie: Trie, ans: string[], depth = '') => {
  Array.from(trie)
    .sort(([a], [b]) => (a > b ? 1 : a < b ? -1 : 0))
    .forEach(([key, child]) => {
      ans.push(`${depth}${key}`);
      dfs(child, ans, depth + '--');
    });
  return ans;
};

console.log(dfs(trie, []).join('\n'));
