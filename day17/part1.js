const { promises: fs, read } = require("fs");

function contains(trench, x, y) {
    const [xmin, xmax] = trench.x;
    const [ymin, ymax] = trench.y;

    return xmin <= x && x <= xmax && ymin <= y && y <= ymax;
}

function hits(trench, [vx, vy]) {

    let [x, y] = [0, 0];
    let ymax = 0;
    let steps = 0;
    while (!contains(trench, x, y)) {
        [x, y] = [x + vx, y + vy];
        vx -= Math.sign(vx);
        vy--;

        if (y < trench.y[0]) {
            return [false, 0];
        };

        ymax = Math.max(ymax, y);
        steps++;
    };

    return [true, ymax];
};

(async function () {
    const input = await fs.readFile("in", "utf8");
    const [x,y] = input.split(": ")[1].split(", ").map(s => s.split("=")[1].split("..").map(Number));
    const trench = { x, y };

    let total = 0;
    let [mvx, mvy] = [0, 0];
    for (let vy = -150; vy < 1000; vy++) {
        for (let vx = 0; vx < 1000; vx++) {
            const [hit, ymax] = hits(trench, [vx, vy]);
            if (hit) {
                total++;
            }
            
        }
    }

    console.log(total);

})();