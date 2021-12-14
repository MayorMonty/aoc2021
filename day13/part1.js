const { promises: fs } = require("fs");

function foldUp(grid, y) {
    for (let i = y; i < grid.length; i++) {
        for (let x = 0; x < grid[i].length; x++) {
            if (grid[i][x] === '#') {
                let down = i - y;
                let position = y - down;
                grid[position][x] = '#';
            }
        };
    };

    return grid.slice(0, y);
};


function foldLeft(grid, x) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === '#') {
                let left = j - x;
                let position = x - left;
                grid[i][position] = '#';
            }
        };
    };

    return grid.map(row => row.slice(0, x));
};


(async function () {
    const input = await fs.readFile("in", "utf8");
    const sections = input.split("\r\n\r\n");
    const points = sections[0].split("\r\n").map(l => l.split(",").map(Number));
    const folds = sections[1].split("\r\n").map(l => l.split("fold along ")[1].split("="));

    let maxX = 0;
    let maxY = 0;
    for (const point of points) {
        maxX = Math.max(maxX, point[0]);
        maxY = Math.max(maxY, point[1]);
    };

    let grid = new Array(maxY + 1).fill(".").map(() => new Array(maxX + 1).fill("."));
    for (const point of points) {
        grid[point[1]][point[0]] = "#";
    };

    for (const fold of folds) {
        if (fold[0] === "x") {
            grid = foldLeft(grid, Number(fold[1]));
        } else {
            grid = foldUp(grid, Number(fold[1]));
        };
    };


    console.log(grid.map(l=>l.map(r => r == "." ? " " : "#").join("")).join("\n"));

})();