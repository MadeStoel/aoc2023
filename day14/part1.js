const fs = require("fs");

let input = fs.readFileSync(__dirname + "/input.txt", "utf8").split("\n").filter(Boolean);

const columnLength = input.length;
let answer         = 0;


for ( let columnIndex = 0; columnIndex < columnLength; columnIndex++ ) {
    let column = input.reduce((result, row, index) => {
        result = result.concat(row.charAt(columnIndex));
        return result;
    }, "");

    column = column.split(/(#)/g).filter(Boolean);

    column.forEach((segment, index) => {
        column[ index ] = segment.split("").sort((a, b) => a === "." ? 1 : -1).join("");
    });

    column = column.join("");

    calculateWeight(column);
}

console.log(answer);

function calculateWeight(column) {
    column.split("").forEach((char, index) => {
        if ( char === "O" ) answer += columnLength - index;
    });
}
