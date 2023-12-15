const fs = require("fs");

let input  = fs.readFileSync(__dirname + "/input.txt", "utf8").split(/\r?\n\s*\r?\n/).filter(Boolean);
let answer = 0;

input.forEach((pattern, index) => {
    const rows = pattern.split("\n").filter(Boolean);

    checkHorizontalReflections(rows);
    checkVerticalReflections(rows);
});

console.log(answer);

function stringDiffAmount(a, b) {
    return a.split("").reduce((acc, char, index) => {
        if ( b.charAt(index) !== char ) acc++;
        return acc;
    }, 0);
}

function checkVerticalReflections(rows) {
    const patternSize = rows[ 0 ].length;

    for ( let column = 0; column < patternSize; column++ ) {
        let leftIndex   = column;
        let rightIndex  = column + 1;
        let reflecting  = true;
        let checkedOne  = false;
        let fixedSmudge = false;

        while ( leftIndex >= 0 && rightIndex < patternSize && reflecting ) {
            const leftColumn  = rows.reduce((acc, row) => acc.concat(row[ leftIndex ]), "");
            const rightColumn = rows.reduce((acc, row) => acc.concat(row[ rightIndex ]), "");

            if ( leftColumn !== rightColumn ) reflecting = false;

            if ( stringDiffAmount(leftColumn, rightColumn) === 1 && !fixedSmudge ) {
                fixedSmudge = true;
                reflecting  = true;
            }

            leftIndex -= 1;
            rightIndex += 1;
            checkedOne = true;
        }

        if ( reflecting && checkedOne && fixedSmudge ) {
            answer += column + 1;
        }
    }
}

function checkHorizontalReflections(rows) {
    const patternSize = rows.length;

    rows.forEach((row, index) => {
        let aboveIndex  = index;
        let belowIndex  = index + 1;
        let reflecting  = true;
        let checkedOne  = false;
        let fixedSmudge = false;

        while ( aboveIndex >= 0 && belowIndex < patternSize && reflecting ) {
            if ( rows[ aboveIndex ] !== rows[ belowIndex ] ) reflecting = false;

            if ( stringDiffAmount(rows[ aboveIndex ], rows[ belowIndex ]) === 1 && !fixedSmudge ) {
                fixedSmudge = true;
                reflecting  = true;
            }

            aboveIndex -= 1;
            belowIndex += 1;
            checkedOne = true;
        }

        if ( checkedOne && reflecting && fixedSmudge ) {
            answer += (index + 1) * 100;
        }
    });
}

