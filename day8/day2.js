const fs = require("fs");

const input = fs.readFileSync(__dirname + "/input.txt", "utf8").split("\r\n").filter(Boolean);

const stepSequence = getStepSequence();
const data = parseData();

let currentKeys = getStartingKeys();
let stepSequenceIndex = 0;
let stepAmount = 0;

let loopAmounts = [];
let divisor = 2;

currentKeys.forEach(currentKey => {
    while (currentKey.charAt(2) !== 'Z') {
        currentKey = data[currentKey][stepSequence[stepSequenceIndex]];

        stepAmount++;
        // Loop the step sequence if we reach the end
        stepSequenceIndex = stepSequenceIndex === stepSequence.length - 1 ? 0 : stepSequenceIndex + 1;
    }

    loopAmounts.push(stepAmount);
    stepAmount = 0;
    stepSequenceIndex = 0;
});

while(loopAmounts.some(loopAmount => loopAmount % divisor !== 0)) {
    divisor++;
}

console.log(loopAmounts.reduce((total, loopAmount) => getLeastCommonMultiple(total, loopAmount)));

function getStartingKeys() {
    return Object.keys(data).filter(key => key.charAt(2) === 'A');
}

// Returns the least common multiple of 2 numbers
function getLeastCommonMultiple(number1, number2) {
    return (number1 * number2) / divisor;
}

// Maps the values of a key to an array.
function parseData() {
    const result = {};

    for (let row = 1; row < input.length; row++) {
        let [key, value] = input[row].split(' = ');

        value = value.replace('(', '').replace(')', '');

        result[key] = value.split(', ');
    }

    return result;
}

// Converts the step sequence to 0 and 1 to use as array indexes.
function getStepSequence() {
    const rawSequence = input[0];

    return rawSequence.split('').map(direction => direction === 'L' ? 0 : 1);
}
