const fs = require("fs");

const input = fs.readFileSync(__dirname + "/input.txt", "utf8").split("\r\n").filter(Boolean);

const stepSequence = getStepSequence();
const data = parseData();

let currentKey = 'AAA';
let stepSequenceIndex = 0;
let stepAmount = 0;

while(currentKey !== 'ZZZ') {
    // Get the new key by using the left (0) or right(1) of the current step in the sequence
    currentKey = data[currentKey][stepSequence[stepSequenceIndex]];

    stepAmount++;
    // Loop the step sequence if we reach the end
    stepSequenceIndex = stepSequenceIndex === stepSequence.length - 1 ? 0 : stepSequenceIndex + 1;
}

// Maps the values of a key to an array.
function parseData() {
    const result = {};

    for ( let row = 1; row < input.length; row++ ) {
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
