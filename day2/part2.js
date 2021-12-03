const { promises: fs } = require('fs');

(async function() {
    const input = await fs.readFile('in', 'utf8');
    const lines = input.split('\n').map(n => n.split(" "));

    let depth = 0;
    let position = 0;
    let aim = 0;

    for (const [command, value] of lines) {
        switch (command) {
            case 'forward': 
                position += Number(value);
                depth += aim * Number(value);
                break;
            case 'down':
                aim += Number(value);
                break;
            case 'up':
                aim -= Number(value);
                break;
        }
    };

    console.log(position * depth);
})();