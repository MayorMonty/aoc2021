const { promises: fs } = require("fs");

const visited = new Set();
const visits = new Map();
function getPaths(neighbors, start, path = [start], twice) {
  
  if (path.at(-1) === "end") {
    return 1;
  };

  let total = 0;
  const nbrs = neighbors.get(path.at(-1)) ?? [];

  for (const node of nbrs) {

    if (node == "start") continue;
    if (node.toLowerCase() === node) {
      if (path.includes(node)) {
        if (twice) continue;
        total += getPaths(neighbors, node, [...path, node], true);
      } else {
        total += getPaths(neighbors, node, [...path, node], twice);
      }
    } else {
      total += getPaths(neighbors, node, [...path, node], twice);
    }

  };

  return total;
}

(async function () {
  const input = await fs.readFile("in", "utf8");
  const edges = input.split("\r\n").map((line) => line.split("-"));

  const neighbors = new Map();
  for (const [a, b] of edges) {
    if (!neighbors.has(a)) {
      neighbors.set(a, []);
    }
    if (!neighbors.has(b)) {
      neighbors.set(b, []);
    }
    neighbors.get(a).push(b);
    neighbors.get(b).push(a);
  }

  let p = getPaths(neighbors, "start", "end");
  console.log(p);
})();
