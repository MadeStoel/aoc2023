const fs = require("fs");

const input = fs.readFileSync(__dirname + "/input.txt", "utf8").split("\n").filter(Boolean);

const gears = {};
let  answer = 0;

input.forEach((row, rowIndex) => {
    let digits = '';
    let startCharIndex = null;

    for (let charIndex = 0; charIndex < input.length; charIndex++) {
        // if current character is a digit, add it to the digits.
        if (!isNaN(+row[charIndex])) {
            if(startCharIndex === null) startCharIndex = charIndex;

            digits = digits.concat(row[charIndex]);
            continue;
        }

        // check if we're not at the end of a number
        if (!digits.length) continue;

        // store the digit in an array corresponding to the gear's coordinates
        setGearCoords(digits, rowIndex, startCharIndex);

        digits = '';
        startCharIndex = null;
    }
})

calculateGearRatios();

console.log(answer);

function calculateGearRatios() {
    // loop over all gears
    Object.values(gears).forEach(gear => {
        const valueSets = Object.values(gear);

        // Loop over all value sets
        valueSets.forEach(valueSet => {
            if(valueSet.length === 2) {
                answer += +valueSet[0] * +valueSet[1];
            }
        })
    });
}

function setGearCoords(digits, rowIndex, startCharIndex) {
    // Check if a surrounding character is a * sign, add it to the coordinates store if so.
    for (let i = rowIndex - 1; i <= rowIndex + 1; i++) {
        for (let j = startCharIndex - 1; j <= startCharIndex + digits.length; j++) {
            if(!!input[i] && input[i][j] === '*') {
                setGearCoord(digits, i,j);
            }
        }
    }
}

// Sets the digits in the store according to it's coordinates
function setGearCoord(digits, rowIndex, gearIndex) {
    if(!gears[rowIndex]) gears[rowIndex] = {};

    if(!gears[rowIndex][gearIndex]) {
        gears[rowIndex][gearIndex] = [digits]
    } else {
        gears[rowIndex][gearIndex].push(digits);
    }
}
