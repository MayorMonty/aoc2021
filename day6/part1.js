const { promises: fs } = require("fs");

(async function () {
  const input = await fs.readFile("in", "utf8");
  const timers = input.split(",").map(Number);

  console.log("Day 0", timers.join(","));

  for (let day = 0; day < 18; day++) {
    for (let i = 0; i < timers.length; i++) {

        timers[i]--;
        
        if (timers[i] === -1) {
            timers[i] = 6;
            timers.push(8);
        };
    };
    console.log("Day", day  +1 , timers.join(","));
  };

  console.log(timers.length);


})();
