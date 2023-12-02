const fs = require("fs");

const input = fs.readFileSync(__dirname + "/input.txt", "utf8").split("\n").filter(Boolean);

const maxReds = 12;
const maxGreens = 13;
const maxBlues = 14;

let answer = 0;

input.forEach((row, index) => {
    // Extract game data
    const gameData = row.split(': ').pop();
    const gameNumber = index + 1;
    let validGame = true;

    // Loop over each game
    gameData.split('; ').forEach(gameSet => {
        const cubes = {
            red: 0,
            green: 0,
            blue: 0
        }

        // Loop over each color in a set
        gameSet.split(', ').forEach(colorData => {
            const [amount, color] = colorData.split(' ');

            cubes[color] = amount;
        });

        // Check if any of the amount of cubes is higher than the allowed amount of cubes
        if(cubes.red > maxReds || cubes.green > maxGreens || cubes.blue > maxBlues) validGame = false;
    });

    if (validGame) answer += gameNumber;
});

console.log(answer);