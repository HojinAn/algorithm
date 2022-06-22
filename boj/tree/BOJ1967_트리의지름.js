"use strict";
exports.__esModule = true;
var fs = require("fs");
var inputList = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
// 이상 입력
var str1 = inputList[0], strN = inputList.slice(1);
var n = +str1.trim();
var answer = 0;
var Node = /** @class */ (function () {
    function Node(no) {
        this.no = no;
        this.children = [];
        this.maxW = 0;
    }
    return Node;
}());
var Edge = /** @class */ (function () {
    function Edge(to, weight) {
        this.to = to;
        this.weight = weight;
    }
    return Edge;
}());
var nodeList = Array(n + 1).fill(Node);
var visited = Array(n + 1).fill(0);
for (var i = 1; i <= n; i++) {
    nodeList[i] = new Node(i);
}
strN.forEach(function (el) {
    var _a = el.trim().split(" ").map(Number), parentNo = _a[0], childNo = _a[1], weight = _a[2];
    nodeList[parentNo].children.push(new Edge(nodeList[childNo], weight));
});
var dfs = function (no, nodeList) {
    var nextList = nodeList[no].children;
    if (!nextList.length)
        return;
    var maxW = 0;
    nextList.forEach(function (el) {
        var nextNode = el.to;
        var next = nextNode.no;
        if (!visited[next]) {
            visited[next] = 1;
            dfs(next, nodeList);
            maxW = Math.max(maxW, el.weight + nextNode.maxW);
        }
    });
    nextList.sort(function (a, b) { return b.to.maxW + b.weight - (a.to.maxW + a.weight); });
    answer = Math.max(nextList.length
        ? nextList[0].to.maxW +
            nextList[0].weight +
            (nextList.length > 1 ? nextList[1].to.maxW + nextList[1].weight : 0)
        : 0, answer);
    nodeList[no].maxW = maxW;
};
dfs(1, nodeList);
console.log(answer);
