import * as fs from 'fs';

type Cache = [number, number[]];

class Node {
  no: number;
  weight: number;
  links: number[];
  cache: [Cache, Cache];
  visited: boolean;
  constructor(no: number, weight: number) {
    this.no = no;
    this.weight = weight;
    this.links = [];
    this.cache = [
      [0, []],
      [weight, [no]],
    ];
    this.visited = false;
  }

  push(no: number) {
    this.links.push(no);
  }

  visit() {
    if (!this.visited) {
      this.visited = true;
      return true;
    }
    return false;
  }
}

const [s1, s2, ...input] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');

const n = Number(s1);
const weights = toNums(s2);
const edges = input.map((li) => toNums(li));
const nodes = [
  new Node(0, 0),
  ...[...Array(n)].map((_, i) => new Node(i + 1, weights[i])),
];

edges.forEach(pushNodes);

nodes[1].visit();
dp(1);

const ansCache = nodes[1].cache;
const ans = ansCache[0][0] > ansCache[1][0] ? ansCache[0] : ansCache[1];

console.log(
  ans
    .map((li) => (Array.isArray(li) ? li.sort((a, b) => a - b).join(' ') : li))
    .join('\n')
);

function dp(no: number) {
  const curNode = nodes[no];
  const { cache, links } = curNode;
  const [cache0, cache1] = cache.map(addCache);

  while (links.length) {
    const next = links.pop()!;
    const nextNode = nodes[next];
    if (nextNode.visit()) {
      const [prev0, prev1] = dp(next);
      const [v0] = prev0;
      const [v1] = prev1;
      cache0(v0 > v1 ? prev0 : prev1);
      cache1(prev0);
    }
  }

  return cache;
}

function addCache(cache: Cache) {
  return function ([v, nos]: Cache) {
    cache[0] += v;
    cache[1].push(...nos);
  };
}

function toNums(str: string) {
  return str.trim().split(' ').map(Number);
}

function pushNodes([u, v]: number[]) {
  nodes[u].push(v);
  nodes[v].push(u);
}
