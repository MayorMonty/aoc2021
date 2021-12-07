const { promises: fs } = require("fs");

(async function () {
  const input = await fs.readFile("in", "utf8");
  const positions = input.split(",").map(Number);

  const lookup = {
    0: 0,
  };

  for (let i = 1; i < 2000; i++) {
    lookup[i] = lookup[i - 1] + i;
  };

  let minCost = Infinity;
  for (let target = 0; target < 1000; target++) {
    const costs = positions.map((p) => lookup[Math.abs(p - target)]);
    const cost = costs.reduce((a, b) => a + b);
    if (cost < minCost) {
      minCost = cost;
    }
  }

  console.log(minCost);
})();
