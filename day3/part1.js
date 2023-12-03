const fs = require("fs");

const input = fs.readFileSync(__dirname + "/input.txt", "utf8").split("\n").filter(Boolean);

const numberOrDotRegex = new RegExp('^(?:[0-9.]+|undefined)$');
let  answer = 0;

input.forEach((row, rowIndex) => {
    let digits = '';

    for (let charIndex = 0; charIndex < input.length; charIndex++) {
        // if current character is a digit, add it to the digits.
        if (!isNaN(+row[charIndex])) {
            digits = digits.concat(row[charIndex]);
            continue;
        }

        // check if we're not at the end of a number
        if (!digits.length) continue;

        if(isPartNumber(digits.length, rowIndex, charIndex)) {
            answer += +digits;
        }

        digits = '';
    }
})

console.log(answer)

function isPartNumber(digitLength, rowIndex, afterLastCharIndex) {
    //check the spaces above the number, including diagonals
    const above = input[rowIndex - 1]?.substring(afterLastCharIndex - digitLength - 1, afterLastCharIndex + 1);
    const sides = `${input[rowIndex][afterLastCharIndex - digitLength - 1]}${input[rowIndex][afterLastCharIndex]}`;
    const below = input[rowIndex + 1]?.substring(afterLastCharIndex - digitLength - 1, afterLastCharIndex + 1);

    return !numberOrDotRegex.test(`${above ?? '.'}${sides ?? '.'}${below ?? '.'}`.replace('undefined', '.'));
}