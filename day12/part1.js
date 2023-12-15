const fs = require("fs");

let input = fs.readFileSync(__dirname + "/input.txt", "utf8").split("\r\n").filter(Boolean);

let total = 0;

input.forEach(row => {
    let [data, numbers] = row.split(" ");

    numbers = numbers.split(",").map(number => parseInt(number));
    data    = `.${ data }.`;

    isValid(data, numbers);
});

console.log(total);

function isValid(data, numbers) {
    if ( !numbers.length && !data.includes("#") ) {
        total++;
        return;
    }

    const groupNumber = numbers[ 0 ];
    const searchEnd   = data.length - 1 - groupNumber;

    for ( let i = 1; i <= searchEnd; i++ ) {
        if ( fits(data, groupNumber, i) ) {
            isValid(data.slice(i + groupNumber), numbers.slice(1));
        }
    }
}

function fits(data, groupNumber, index) {
    if ( data.slice(0, index).includes("#") || data.charAt(index + groupNumber) === "#" ) return false;

    return !data.slice(index, index + groupNumber).includes(".");
}

