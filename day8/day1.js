const fs = require("fs");

const input = fs.readFileSync(__dirname + "/input.txt", "utf8").split("\n").filter(Boolean);

const stepSequence = getStepSequence();
const data = parseData();

let currentKey = Object.keys(data)[0];
let stepSequenceIndex = 0;
let stepAmount = 0;

while(currentKey !== 'ZZZ') {
    console.log(stepAmount);
    currentKey = data[currentKey][stepSequence[stepSequenceIndex]];

    stepAmount++;
    stepSequenceIndex = stepSequenceIndex === stepSequence.length - 1 ? 0 : stepSequenceIndex + 1;
}

console.log(stepAmount);

function parseData() {
    const result = {};

    for ( let row = 1; row < input.length; row++ ) {
        let [key, value] = input[row].split(' = ');

        value = value.replace('(', '').replace(')', '');

        result[key] = value.split(', ');
    }

    return result;
}

function getStepSequence() {
    const rawSequence = input[0];

    return rawSequence.split('').map(direction => direction === 'L' ? 0 : 1);
}
