import input from "./input.mjs";

const replacements = {
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9',
    'zero': '0',
}

const answer = input.reduce((sum, line) => {
    const numbers = extractNumbers(line);
    let twoDigit = +`${ numbers[ 0 ] }${ numbers[ numbers.length - 1 ] }`;

    sum += twoDigit;

    return sum;
}, 0);

console.log(answer);

function extractNumbers(line) {
    let result = '';

    // Start at every character of the line.
    line.split('').forEach((char, index) => {
        // Loop over the line from the start character to the end of the string,
        // shortening the end of the string every loop.
        for(let i = line.length; i >= index; i--) {
            const testString = line.substring(index, i);

            // If the substring is a single digit, add it and go to the next starting character.
            if(!isNaN(+testString) && testString.length === 1) {
                result = result.concat(testString);
                break;
            }

            // Find if the substring is a valid written number (e.g. 'one').
            const replacementIndex = Object.keys(replacements).findIndex((replacement) => replacement === testString);

            // If the substring is valid, add it and go to the next starting character.
            if(replacementIndex !== -1) {
                result = result.concat(Object.values(replacements)[replacementIndex]);
                break;
            }
        }
    });

    return result;
}
