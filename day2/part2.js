const fs = require("fs");

const input = fs.readFileSync(__dirname + "/input.txt", "utf8").split("\n").filter(Boolean);

let answer = 0;

input.forEach((row) => {
    const gameData = row.split(': ').pop();

    // track cubes per game
    const cubes = {
        red: null,
        green: null,
        blue: null
    }

    // Loop over each set in a game
    gameData.split('; ').forEach(gameSet => {
        // Loop over each color in a set
        gameSet.split(', ').forEach(colorData => {
            const [amount, color] = colorData.split(' ');

            // Set the minimum amount of cubes if it's higher than the previous amount
            if(cubes[color] < +amount || cubes[color] === null) {
                cubes[color] = +amount;
            }
        });
    });

    // Multiply all cubes of a game together and add to total
    answer += (cubes['red'] ?? 1) * (cubes['green'] ?? 1) * (cubes['blue'] ?? 1);
});

console.log(answer);