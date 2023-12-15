const fs = require("fs");

let input = fs.readFileSync(__dirname + "/input.txt", "utf8").split("\n").filter(Boolean);

const columnLength   = input.length;
let answer           = 0;
let turnedIndex      = [];
const configurations = [];

console.log((1000000000 - 80.5) % 280);

setup();
cycle();
calculateWeight();

console.log(answer);

function setup() {
    for ( let i = 0; i < 80; i++ ) {
        cycleVertical("north");
        cycleHorizontal("west");
        cycleVertical("south");
        cycleHorizontal("east");
    }

    cycleVertical("north");
    cycleHorizontal("west");
}

function cycle() {
    for ( let i = 0; i < 79; i++ ) {
        cycleVertical("south");
        cycleHorizontal("east");
        cycleVertical("north");
        cycleHorizontal("west");

    }

    cycleVertical("south");
    cycleHorizontal("east");
}



function calculateWeight() {
    input.forEach((row, index) => {
        row.split("").forEach(char => {
            if ( char === "O" ) answer += columnLength - index;
        });
    });
}

function cycleHorizontal(direction) {
    const [sortA, sortB] = direction === "west" ? [1, -1] : [-1, 1];

    input.forEach((rowLine, rowIndex) => {
        let row = rowLine.split(/(#)/g).filter(Boolean);

        row.forEach((segment, index) => {
            row[ index ] = segment.split("").sort((a, b) => a === "." ? sortA : sortB).join("");
        });

        input[ rowIndex ] = row.join("");
    });

    configurations.push(`${ JSON.stringify(input) }-${ direction }`);
}

function cycleVertical(direction) {
    const [sortA, sortB] = direction === "north" ? [1, -1] : [-1, 1];

    for ( let columnIndex = 0; columnIndex < columnLength; columnIndex++ ) {
        let column = input.reduce((result, row, index) => {
            result = result.concat(row.charAt(columnIndex));
            return result;
        }, "");

        column = column.split(/(#)/g).filter(Boolean);

        column.forEach((segment, index) => {
            column[ index ] = segment.split("").sort((a, b) => a === "." ? sortA : sortB).join("");
        });

        column = column.join("");

        column.split("").forEach((char, index) => {
            if ( !turnedIndex[ index ] ) turnedIndex[ index ] = "";

            turnedIndex[ index ] = turnedIndex[ index ].concat(char);
        });
    }

    input       = turnedIndex;
    turnedIndex = [];

    configurations.push(`${ JSON.stringify(input) }-${ direction }`);
}
