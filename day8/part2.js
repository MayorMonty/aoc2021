const { promises: fs } = require("fs");

function perms(xs) {
  if (!xs.length) return [[]];
  return xs.flatMap((x) => {
    return perms(xs.filter((v) => v !== x)).map((vs) => [x, ...vs]);
  });
}

(async function () {
  const input = await fs.readFile("in", "utf8");
  const lines = input.split("\r\n").map((r) =>
    r
      .split(" | ")[0]
      .split(" ")
      .map((w) => [...w].sort().join(""))
  );

  const outputs = input.split("\r\n").map((r) => r.split(" | ")[1].split(" "));
  const mappings = perms("abcdefg".split(""));
  
  // Map letters to number
  const correspondence = {
    abcefg: 0,
    cf: 1,
    acdeg: 2,
    acdfg: 3,
    bcdf: 4,
    abdfg: 5,
    abdefg: 6,
    acf: 7,
    abcdefg: 8,
    abcdfg: 9,
  };
  
  let total = 0;
  
  let i = 0;
  for (const line of lines) {
    for (const order of mappings) {
      const mapping = {
        a: order[0],
        b: order[1],
        c: order[2],
        d: order[3],
        e: order[4],
        f: order[5],
        g: order[6],
      };
      
      const ok = Object.keys(correspondence).map(key => key.split("").map(letter => mapping[letter]).sort().join(""))

      let valid = true;
      for (let word of line) {
        if(!ok.includes(word)) {
          valid = false;
        }
      };
      
      // If its a valid mapping, then map output to it, and determine the number
      if (valid) {
        const map = Object.fromEntries(Object.entries(mapping).map(([k, v]) => [v, k]));
        const output = outputs[i].map(word => word.split("").map(letter => map[letter]).sort().join(""));
        const digits = output.map(word => correspondence[word]);
        const num = parseInt(digits.join(""));
        total += num;
      };

    }
    i++;
  }

  console.log(total);
})();
