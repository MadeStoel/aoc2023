const fs = require("fs");

const input = fs.readFileSync(__dirname + "/input.txt", "utf8").split("\n").filter(Boolean);

const amounts = {};

// Set up a card amount for each game
input.forEach((_, index) => amounts[index] = 1);

// Loop over each game
input.forEach((row, index) => {
    // Loop over the game for the amount of cards you have for that game
    for (let i = 0; i < amounts[index]; i++) {
        // Extract game numbers
        const game = row.split(': ')[1];
        // Keep track of which game to add a copy to when you win
        let addTo = index + 1;
        let [playingNumbers, winningNumbers] = game.split(' | ');

        // Convert number strings into actual numbers
        winningNumbers = winningNumbers.split(' ').map(number => +number);

        playingNumbers.split(' ').forEach(playingNumber => {
            // If a number wins, add a copy of the card the 'addTo' variable currently points to
            if (winningNumbers.includes(+playingNumber) && +playingNumber !== 0) {
                amounts[addTo]++
                addTo++
            }
        });
    }
})

// Add up all copies of all cards
const answer = Object.values(amounts).reduce((total, cards) => total + cards, 0);

console.log(answer);

