const fs = require("fs");

let input = fs.readFileSync(__dirname + "/input.txt", "utf8").split("\r\n").filter(Boolean);

const table = new Map();

let total = 0;

input.forEach(row => {
    let [data, numbers] = row.split(" ");
    const numbersArray  = numbers.split(",");

    numbers = [
        ...numbersArray,
        ...numbersArray,
        ...numbersArray,
        ...numbersArray,
        ...numbersArray
    ].map(number => parseInt(number));
    data    = `.${ data }?${ data }?${ data }?${ data }?${ data }.`;

    total += isValid(data, numbers);
});

console.log(total);

function isValid(data, numbers) {
    if ( table.has(`${ data }-${ numbers }`) ) return table.get(`${ data }-${ numbers }`);

    let result = 0;
    if ( !numbers.length ) {
        return data.includes("#") ? 0 : 1;
    }

    const groupNumber = numbers[ 0 ];
    const searchEnd   = data.length - 1 - groupNumber;

    for ( let i = 1; i <= searchEnd; i++ ) {
        if ( fits(data, groupNumber, i) ) {
            result += isValid(data.slice(i + groupNumber), numbers.slice(1));
        }
    }

    table.set(`${ data }-${ numbers }`, result);

    return result;
}

function fits(data, groupNumber, index) {
    if ( data.slice(0, index).includes("#") || data.charAt(index + groupNumber) === "#" ) return false;

    return !data.slice(index, index + groupNumber).includes(".");


}

