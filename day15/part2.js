const { promises: fs } = require("fs");
const { MinPriorityQueue, MaxPriorityQueue } = require("@datastructures-js/priority-queue");

function getNeighbors(map, x, y) {
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

function dijkstra(grid) {
  const parents = new Map();
  const distances = new Map();
  const frontier = new MinPriorityQueue();

  frontier.enqueue([0, 0], 0);
  distances.set(JSON.stringify([0, 0]), 0);

  while (frontier.size() > 0) {
    let { element: current } = frontier.dequeue();

    if (current[0] == grid.length - 1 && current[1] == grid[0].length - 1) {
      let cost = 0;

      while (parents.get(current) != undefined) {
        cost += grid[current[1]][current[0]];
        grid[current[1]][current[0]] = " ";
        current = parents.get(current);
      }

      return cost;
    }

    let distance = distances.get(JSON.stringify(current)) ?? Infinity;
    let neighbors = getNeighbors(grid, current[0], current[1]);

    for (let neighbor of neighbors) {
      let weight = grid[neighbor[1]][neighbor[0]];
      let neighborDist = distances.get(JSON.stringify(neighbor)) ?? Infinity; 
    
      if (distance + weight < neighborDist) {
        distances.set(JSON.stringify(neighbor), distance + weight);
        parents.set(neighbor, current);
        frontier.enqueue(neighbor, distance + weight);
      }
    }
  }
}

(async function () {
  const input = await fs.readFile("in", "utf8");
  const begin = input.split("\r\n").map((line) => line.split("").map(Number));

  const grid = new Array(begin.length * 5).fill(0).map(() => new Array(begin[0].length * 5).fill(0));
  for (let y = 0; y < begin.length; y++) {
    for (let x = 0; x < begin[0].length; x++) {
      grid[y][x] = begin[y][x];
    };
  };

  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) {
      if (x == 0 && y == 0) continue;
      let offset = x + y;
      for (let yy = 0; yy < begin.length; yy++) {
        for (let xx = 0; xx < begin[0].length; xx++) {
          grid[y * begin.length + yy][x * begin[0].length + xx] = grid[yy][xx] + offset;
          if (grid[y * begin.length + yy][x * begin[0].length + xx] > 9) {
            grid[y * begin.length + yy][x * begin[0].length + xx] -= 9;
          }
        }
      }
    };
  };

  console.log(grid.map((line) => line.join("")).join("\n"));


  let cost = dijkstra(grid);
  console.log(cost);
})();
