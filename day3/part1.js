const { promises: fs } = require('fs');

(async function() {
    const input = await fs.readFile('in', 'utf8');
    const lines = input.split('\r\n');
    console.log(lines);

    let gamma = [...Array(12).fill(0)].map((a,i) => {
        let ones = 0;
        let zeros = 0;

        for (const line of lines) {
            if (line[i] === '1') {
                ones++;
            } else {
                zeros++;
            }
        }

        return ones > zeros ? '1' : '0';
    }).join('');

    let epsilon = [...Array(12).fill(0)].map((a,i) => {
        let ones = 0;
        let zeros = 0;

        for (const line of lines) {
            if (line[i] === '1') {
                ones++;
            } else {
                zeros++;
            }
        }

        return ones > zeros ? '0' : '1';
    }).join('');

    gamma = parseInt(gamma, 2);
    epsilon = parseInt(epsilon, 2);

    console.log(gamma);
    console.log(epsilon);
    console.log(gamma * epsilon);

})();