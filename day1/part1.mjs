import input from "./input.mjs";

const answer = input.reduce((sum, line) => {
    const numbers = line.split("").filter(char => !isNaN(+char));

    let twoDigit = +`${ numbers[ 0 ] }${ numbers[ numbers.length - 1 ] }`;

    sum += twoDigit;

    return sum;
}, 0);

console.log(answer);
