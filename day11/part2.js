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

  if (map[y - 1] && map[y - 1][x - 1] != undefined) {
    n.push([x - 1, y - 1]);
  }
  if (map[y - 1] && map[y - 1][x + 1] != undefined) {
    n.push([x + 1, y - 1]);
  }
  if (map[y + 1] && map[y + 1][x - 1] != undefined) {
    n.push([x - 1, y + 1]);
  }
  if (map[y + 1] && map[y + 1][x + 1] != undefined) {
    n.push([x + 1, y + 1]);
  }

  return n;
}

(async function () {
  const input = await fs.readFile("in", "utf8");
  const energy = input.split("\r\n").map((l) => l.split("").map(Number));

  let total = 0;
  let step = 0;
  while(true) {
    const flashed = new Set();
    for (let y = 0; y < energy.length; y++) {
      for (let x = 0; x < energy[y].length; x++) {
        energy[y][x]++;
      }
    }

    for (let y = 0; y < energy.length; y++) {
      for (let x = 0; x < energy[y].length; x++) {
        if (energy[y][x] > 9) {
          const neighbors = get_neighbors(energy, x, y);
          energy[y][x] = 0;
          total++;

          flashed.add(JSON.stringify([x, y]));
          for (let i = 0; i < neighbors.length; i++) {
            const [a, b] = neighbors[i];
            energy[b][a]++;
            if (energy[b][a] > 9 && !flashed.has(JSON.stringify([a, b]))) {
              energy[b][a] = 0;
              total++;
              neighbors.push(...get_neighbors(energy, a, b));
              flashed.add(JSON.stringify([a, b]));
            }
          }

          for (const coord of flashed) {
            const [a, b] = JSON.parse(coord);
            energy[b][a] = 0;
          }
        }
      }
    }


    let full = true;
    for (let y = 0; y < energy.length; y++) {
      for (let x = 0; x < energy[y].length; x++) {
        if (energy[y][x] > 0) {
          full = false;
          break;
        }
      }
    }

    if (full) {
      console.log(step + 1);
      return;
    }
    step++;
  }

  console.log(energy.map((l) => l.join("")).join("\r\n"));
  console.log(total);
})();
