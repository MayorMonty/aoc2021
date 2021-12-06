const { promises: fs } = require('fs');

function straight(vector) {
    const vertical = vector[0][0] === vector[1][0];
    const horizontal = vector[0][1] === vector[1][1];

    return vertical || horizontal;
};


function contains(point, vector) {
    const [[x1, y1], [x2, y2]] = vector;
    const [x, y] = point;

    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);

    const range = x >= minX && x <= maxX && y >= minY && y <= maxY;
    if (!range) {
        return false;
    }

    let dx = Math.sign(x2 - x1);
    let dy = Math.sign(y2 - y1);

    let [a,b] = [x1, y1];
    while (a !== x2 || b !== y2) {
        if (a === x && b === y) {
            return true;
        }
        a += dx;
        b += dy;
    }

    return a === x && b === y;
    
};

(async function() {
    const input = await fs.readFile("in", "utf8");
    const vectors = input.split("\r\n").map(x => x.split(" -> ").map(x => x.split(",").map(Number)));
    
    let overlap = 0;

    // let output = "";
    for (let y = 0; y < 1000; y++) {
        if (y % 10 === 0) console.log(y);
        for (let x = 0; x < 1000; x++) {
            
            let num = 0;
            for (const vector of vectors) {
                if (contains([x, y], vector)) {
                    num++;
                };
            };

            // if (num > 0) {
            //     output += num;
            // } else {
            //     output += ".";
            // }

            if (num >= 2) {
                overlap++;
            }
 
        };
        // output += "\n";  
    };

    // console.log(output);
    console.log(overlap);
})();