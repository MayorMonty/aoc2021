const { promises: fs } = require("fs");

(async function () {
  const input = await fs.readFile("in", "utf8");
  const positions = input.split(",").map(Number);

  let minCost = Infinity;
  for (let target = 0; target < 1000; target++) {
    const costs = positions.map((p) => Math.abs(p - target));
    const cost = costs.reduce((a, b) => a + b);
    if (cost < minCost) {
      minCost = cost;
    }
  }

  console.log(minCost);
})();
