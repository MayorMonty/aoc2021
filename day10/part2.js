const { promises: fs } = require("fs");

const opening = ["{", "[", "(", "<"];
const closing = ["}", "]", ")", ">"];

const values = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137
};

const completion = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4
};

(async function () {
  const input = await fs.readFile("in", "utf8");
  const lines = input.split("\r\n");

  let scores = [];
  for (const line of lines) {
    let score = 0;
    let stack = [];
    let corrupt = false;
    for (const char of line) {
      if (opening.includes(char)) {
        stack.push(char);
      } else if (closing.includes(char)) {
        const last = stack.pop();
        if (last !== opening[closing.indexOf(char)]) {
          score += values[char];
          corrupt = true;
        }
      }
    }

    if (!corrupt && stack.length > 0) {
        while (stack.length > 0) {
            const last = closing[opening.indexOf(stack.pop())];
            score *= 5;
            score += completion[last];
        }
        scores.push(score);

    };

  };

    const sorted = scores.sort((a, b) => a - b);
    console.log(sorted[Math.floor(sorted.length / 2)]);

})();

// 390271