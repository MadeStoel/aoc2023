const fs = require("fs");

// Split the data into chunks divided by an empty line
const input = fs.readFileSync(__dirname + "/input.txt", "utf8").split("\n").filter(Boolean);

let time = null;
let recordDistance = null;

parseData();

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


console.log(waysToWin);


// Parse the data to concatenate all numbers in a row to one number.
function parseData() {
    input.forEach((row, index) => {
        // Take the data for the current row
        const numbers = row.split(':')[1];
        const parsedNumber = parseInt(numbers.replaceAll(' ', ''));

        index === 0 ? time = parsedNumber : recordDistance = parsedNumber;
    });
}
