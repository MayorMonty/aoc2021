const { promises: fs } = require("fs");

(async function () {
  const input = await fs.readFile("in", "utf8");
  const sections = input.split("\r\n\r\n");
  let template = sections[0].split("");
  const rules = Object.fromEntries(
    sections[1].split("\r\n").map((line) => line.split(" -> "))
  );

  console.log(template.join(""));

  let counts = {};
  let letters = {};
  for (let i = 0; i < template.length - 1; i++) {
    const pair = template[i] + template[i + 1];
    counts[pair] = (counts[pair] || 0) + 1;
    letters[template[i]] = (letters[template[i]] || 0) + 1;
  }

  letters[template[template.length - 1]] = (letters[template.length - 1] || 0) + 1;

  for (let step = 0; step < 40; step++) {
    let newCounts = {};
    for (const [key, value] of Object.entries(counts)) {
      let match = rules[key];
      newCounts[key[0] + match] = (newCounts[key[0] + match] || 0) + value;
      newCounts[match + key[1]] = (newCounts[match + key[1]] || 0) + value;
      letters[match] = (letters[match] || 0) + value;
    }
    counts = Object.assign({}, newCounts);
  }

  for (const [key, value] of Object.entries(letters)) {
    console.log(`${key} ${value}`);
  };

  // find most common and least common

  let most = Object.entries(letters).reduce((a, b) => (a[1] > b[1] ? a : b));
  let least = Object.entries(letters).reduce((a, b) => (a[1] < b[1] ? a : b));

  console.log(most, least);
  console.log(most[1] - least[1]);
})();
