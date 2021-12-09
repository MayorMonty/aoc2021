const { promises: fs } = require("fs");

function get_neighbors(map, x, y) {
  const n = [];

  if (map[y - 1] && map[y - 1][x] != undefined) {
    n.push([x, y - 1]);
  }
  if (map[y + 1] && map[y + 1][x] != undefined) {
    n.push([x, y + 1]);
  }
  if (map[y][x - 1] != undefined) {
    n.push([x - 1, y]);
  }
  if (map[y][x + 1] != undefined) {
    n.push([x + 1, y]);
  }

  return n;
}

function get_neighbors_sizes(map, x, y) {
  const n = [];

  if (map[y - 1] && map[y - 1][x] != undefined) {
    n.push(map[y - 1][x]);
  }
  if (map[y + 1] && map[y + 1][x] != undefined) {
    n.push(map[y + 1][x]);
  }
  if (map[y][x - 1] != undefined) {
    n.push(map[y][x - 1]);
  }
  if (map[y][x + 1] != undefined) {
    n.push(map[y][x + 1]);
  }

  return n;
}

let overlap = new Map();

function size(x, y, map) {
  let frontier = [];

  frontier.push([x, y]);

  while (frontier.length > 0) {
    let current = frontier.shift();
    overlap.set(JSON.stringify(current), [x, y]);
    const currentHeight = map[current[1]][current[0]];

    let neighbors = get_neighbors(map, current[0], current[1]);

    for (let i = 0; i < neighbors.length; i++) {
      const [x, y] = neighbors[i];
      const height = map[y][x];

      if (height == 9) continue;
      if (height > currentHeight) {
        frontier.push(neighbors[i]);
      }

    }
  }
}

(async function () {
  const input = await fs.readFile("in", "utf8");
  const heights = input.split("\r\n").map((l) => l.split("").map(Number));

  // The origin point of all basins
  let lows = heights.map((l, y) =>
    l.map((h, x) => {
      let neighbors = get_neighbors_sizes(heights, x, y);
      return neighbors.every((n) => n > h) ? 1 : 0;
    })
  );

  const basins = [];
  for (const [y, row] of heights.entries()) {
    for (const [x, height] of row.entries()) {
      if (lows[y][x]) {
        basins.push([x, y]);
      }
    }
  }

  let counts = Object.fromEntries(basins.map((b) => [JSON.stringify(b), 0]));

  basins.map(([x, y]) => size(x, y, heights));
  for (const [key, value] of overlap.entries()) {
    counts[JSON.stringify(value)]++;
  }
  
  let sizes = Object.values(counts).sort((a, b) => b - a);
  const total = sizes[0] * sizes[1] * sizes[2];
  console.log(total);
})();
