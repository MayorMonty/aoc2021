const { promises: fs } = require('fs');


(async function() {
    const input = await fs.readFile("in", "utf8");
    const lines = input.split("\r\n\r\n");
  
    const numbers = lines[0].split(",").map(Number);
    const boards = lines.slice(1).map(r => r.split("\r\n").map(c => c.trim().split(/ +/g).map(Number)));
    const marked = boards.map(b => b.map(c => c.map(() => false)));

    function mark(i, num) {
        for (let y = 0; y < boards[i].length; y++) {
            for (let x = 0; x < boards[i][y].length; x++) {
                if (boards[i][y][x] === num) {
                    marked[i][y][x] = true;
                }
            }
        }
    };

    function isWinning(i) {
        const rows = boards[i].some((row,r) => row.every((_,c) => marked[i][r][c]));
        const cols = boards[i].some((row,r) => row.every((_,c) => marked[i][c][r]));

        return rows || cols;
    };

    let i = 0;
    while (i < numbers.length) {
        const num = numbers[i++];
        for (const [i, board] of boards.entries()) {
            mark(i, num);
            if (isWinning(i)) {
                
                let sum = 0;
                for (let y = 0; y < boards[i].length; y++) {
                    for (let x = 0; x < boards[i][y].length; x++) {
                        if (!marked[i][y][x]) {
                            sum += boards[i][y][x];
                        }
                    }
                }

                console.log(sum * num);
                return;
            }
        }
    }


})();