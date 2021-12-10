const { promises: fs } = require("fs");

const opening = ["{", "[", "(", "<"];
const closing = ["}", "]", ")", ">"];

const values = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137
};

(async function () {
  const input = await fs.readFile("in", "utf8");
  const lines = input.split("\r\n");

  let score = 0;
  for (const line of lines) {
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
          console.log(char, score);
        }
      }
    }

  };
  console.log(score);


})();

// 390271