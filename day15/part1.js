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
  const grid = input.split("\r\n").map((line) => line.split("").map(Number));



  let cost = dijkstra(grid);
  console.log(cost);
})();
