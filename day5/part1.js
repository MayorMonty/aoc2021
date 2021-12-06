const { promises: fs } = require('fs');

function straight(vector) {
    const vertical = vector[0][0] === vector[1][0];
    const horizontal = vector[0][1] === vector[1][1];

    return vertical || horizontal;
};

function contains(point, vector) {
    const [[x1, y1], [x2, y2]] = vector;
    const [x, y] = point;

    if (y == y1 || y == y2) {
        const min = Math.min(x1, x2);
        const max = Math.max(x1, x2);

        return x >= min && x <= max;
    };

    if (x == x1 || x == x2) {
        const min = Math.min(y1, y2);
        const max = Math.max(y1, y2);

        return y >= min && y <= max;
    };

    return false;
};

(async function() {
    const input = await fs.readFile("in", "utf8");
    const vectors = input.split("\r\n").map(x => x.split(" -> ").map(x => x.split(",").map(Number)));
    
    const segments = vectors.filter(straight);

    let overlap = 0;

    let output = "";
    for (let y = 0; y < 1000; y++) {
        for (let x = 0; x < 1000; x++) {
            
            let num = 0;
            for (const vector of segments) {
                if (contains([x, y], vector)) {
                    num++;
                };
            };

            if (num >= 2) {
                overlap++;
            }
 
        };  
    };

    console.log(output);
    console.log(overlap);
})();