const fs = require("fs");

// Split the data into chunks divided by an empty line
const input = fs.readFileSync(__dirname + "/input.txt", "utf8").split("\n").filter(Boolean);

const data = [];
const waysToWinPerRace = [];
parseData();

data.forEach(([time, recordDistance]) => {
    let waysToWin = 0;

    // Loop over the possible times to hold the button
    for (let millisecondsHold = 0; millisecondsHold < time; millisecondsHold++) {
        // Calculate the time left over to race after holding the button
        const raceTime = time - millisecondsHold;

        // Calculate the distance travelled with the speed set by the holding of the button
        const distance = raceTime * millisecondsHold;

        // If the race is won, add it to the ways to win counter
        if (distance > recordDistance) waysToWin++;
    }

    waysToWinPerRace.push(waysToWin);
})

console.log(waysToWinPerRace.reduce((margin, waysToWin) => margin * waysToWin));

// Parse the data to make Time/Distance array pairs
function parseData() {
    input.forEach((row, index) => {
        // Take the data for the current row
        const numbers = row.split(':')[1];

        // Remove all spaces
        const parsedNumbers = numbers.split(' ').filter(Boolean).map(number => parseInt(number.trim()));

        // If the first row is being parsed, put it in a new array
        // Else, add it to that array
        if (index === 0) {
            parsedNumbers.forEach(number => data.push([number]));
        } else {
            parsedNumbers.forEach((number, index) => data[index].push(number))
        }
    });
}
