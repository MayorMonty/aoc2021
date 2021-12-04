const { promises: fs } = require('fs');

function common(lines) {
    let gamma = [...Array(lines[0].length).fill(0)].map((a,i) => {
        let ones = 0;
        let zeros = 0;

        for (const line of lines) {
            if (line[i] === '1') {
                ones++;
            } else {
                zeros++;
            }
        }

        return ones >= zeros ? '1' : '0';
    }).join('');

    let epsilon = [...Array(lines[0].length).fill(0)].map((a,i) => {
        let ones = 0;
        let zeros = 0;

        for (const line of lines) {
            if (line[i] === '1') {
                ones++;
            } else {
                zeros++;
            }
        }

        return ones >= zeros ? '0' : '1';
    }).join('');

    return [gamma, epsilon];
}

(async function() {
    const input = await fs.readFile('in', 'utf8');
    const lines = input.split('\n');

    let oxygen = lines;
    let co2 = lines;

    let i = 0;
    while (oxygen.length > 1) {
        let [gamma, epsilon] = common(oxygen);
        oxygen = oxygen.filter(item => item[i] == gamma[i]);
        i++;
    };
    oxygen = parseInt(oxygen[0], 2);

    i = 0;
    while (co2.length > 1) {
        let [gamma, epsilon] = common(co2);
        co2 = co2.filter(item => item[i] == epsilon[i]);
        i++;
    };
    co2 = parseInt(co2[0], 2);


    console.log(oxygen, co2);
    console.log(oxygen * co2);

})();