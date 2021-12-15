const { promises: fs } = require("fs");

(async function () {
  const input = await fs.readFile("in", "utf8");
  const sections = input.split("\r\n\r\n");
  let template = sections[0].split("");
  const rules = Object.fromEntries(
    sections[1].split("\r\n").map((line) => line.split(" -> "))
  );

  for (let step = 0; step < 10; step++) {
    let output = Array.from(template);
    for (let i = 0; i < template.length - 1; i++) {
      let match = [template[i], template[i + 1]].join("");
      const insert = rules[match];
      if (insert) {
        output.splice(2 * i + 1, 0, insert);
      }
    }
    template = output;
  }

  // Find frequency of the most and least common element
  const counts = template.reduce((acc, cur) => {
    acc[cur] = (acc[cur] || 0) + 1;
    return acc;
  }, {});

    const most = Object.entries(counts).reduce((acc, cur) => {
        return acc[1] > cur[1] ? acc : cur;
        }
    )[1];
    const least = Object.entries(counts).reduce((acc, cur) => {
        return acc[1] < cur[1] ? acc : cur;
    }
    )[1];

    console.log(most - least);
  
})();
