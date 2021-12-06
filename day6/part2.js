const { promises: fs } = require("fs");

(async function () {
  const input = await fs.readFile("in", "utf8");
  const timers = input.split(",").map(Number);

    const counts = timers.reduce((a, b) => (a[b] ? a[b]++ : a[b] = 1, a), {0: 0, 6: 0, 7: 0, 8: 0});

    for (let day = 0; day < 256; day++) {
        let newFish = 0;
        for  (let num in counts) {
            num = Number(num);
            if (num == 0) {
                newFish += counts[num];
                counts[num] = 0;
            } else {
                counts[num - 1] = counts[num];
                counts[num] = 0;
            }
        }
        counts[8] = newFish;
        counts[6] += newFish;
    };

    console.log(Object.values(counts).reduce((a, b) => a + b));
})();
