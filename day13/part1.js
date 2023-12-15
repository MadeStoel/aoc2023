const fs = require("fs");

let input  = fs.readFileSync(__dirname + "/input.txt", "utf8").split(/\r?\n\s*\r?\n/).filter(Boolean);
let answer = 0;

input.forEach(pattern => {
    const rows = pattern.split("\n").filter(Boolean);

    checkHorizontalReflections(rows);
    checkVerticalReflections(rows);
});

console.log(answer);

function checkVerticalReflections(rows) {
    const patternSize = rows[ 0 ].length;

    for ( let column = 0; column < patternSize; column++ ) {
        let leftIndex  = column;
        let rightIndex = column + 1;
        let reflecting = true;
        let checkedOne = false;

        while ( leftIndex >= 0 && rightIndex < patternSize && reflecting ) {
            const leftColumn  = rows.reduce((acc, row) => acc.concat(row[ leftIndex ]), "");
            const rightColumn = rows.reduce((acc, row) => acc.concat(row[ rightIndex ]), "");

            if ( leftColumn !== rightColumn ) reflecting = false;

            leftIndex -= 1;
            rightIndex += 1;
            checkedOne = true;
        }

        if ( reflecting && checkedOne ) {
            answer += column + 1;
        }
    }
}


function checkHorizontalReflections(rows) {
    const patternSize = rows.length;

    rows.forEach((row, index) => {
        let aboveIndex = index;
        let belowIndex = index + 1;
        let reflecting = true;
        let checkedOne = false;

        while ( aboveIndex >= 0 && belowIndex < patternSize && reflecting ) {
            if ( rows[ aboveIndex ] !== rows[ belowIndex ] ) reflecting = false;

            aboveIndex -= 1;
            belowIndex += 1;
            checkedOne = true;
        }

        if ( checkedOne && reflecting ) {
            answer += (index + 1) * 100;
        }
    });
}

