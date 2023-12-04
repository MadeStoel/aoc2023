const fs = require("fs");

const input = fs.readFileSync(__dirname + "/input.txt", "utf8").split("\n").filter(Boolean);

answer = [];

// Loop over each game

input.forEach(row => {
    let score = 0;
    const game = row.split(': ')[1];
    let [playingNumbers, winningNumbers] = game.split(' | ');

    // Convert number strings into actual numbers
    winningNumbers = winningNumbers.split(' ').map(number => +number);

    playingNumbers.split(' ').forEach(playingNumber => {
        // If a number wins, multiply the current score by 2.
        if (winningNumbers.includes(+playingNumber) && +playingNumber !== 0) {
            score === 0 ? score = 1 : score *= 2;
        }
    });

    answer.push(score);
})

// Add up all scores
console.log(answer.reduce((total, score) => total + score, 0));
