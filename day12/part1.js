const { promises: fs } = require("fs");

const visited = new Set();
function getPaths(neighbors, start, end, path = [start]) {
  if (start === end) {
    return [path];
  }
  if (visited.has(start)) {
    return [];
  }

  if (start.toLowerCase() == start) visited.add(start);
  let nbrs = neighbors.get(start);
  if (!nbrs) {
    return [];
  };
  const paths = nbrs.map(
    neighbor => getPaths(neighbors, neighbor, end, [...path, neighbor])
  );
  visited.delete(start);
  return paths.flat();
};

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
    };
    neighbors.get(a).push(b);
    neighbors.get(b).push(a);
  };

  console.log(neighbors);

  const p = getPaths(neighbors, "start", "end");
  console.log(p.length);

 
})();
