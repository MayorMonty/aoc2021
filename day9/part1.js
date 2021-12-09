const { promises: fs } = require("fs");

function get_neighbors(map, x, y) {
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

(async function () {
  const input = await fs.readFile("in", "utf8");
  const heights = input.split("\r\n").map((l) => l.split("").map(Number));

  let lows = heights.map((l, y) => l.map((h, x) => {
    let neighbors = get_neighbors(heights, x, y);
    return neighbors.every((n) => n > h) ? 1 : 0;
  }));

  let risk = 0;
  let y = 0;
  for (const row of heights) {
      let x = 0;
      for (const cell of row) {
          if (lows[y][x] === 1) risk += (1 + cell);
          x++;
      }
        y++;
  }
  
  console.log(risk);
})();
