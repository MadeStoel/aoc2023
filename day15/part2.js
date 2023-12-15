const fs = require("fs");

let input   = fs.readFileSync(__dirname + "/input.txt", "utf8");
const boxes = {};
let answer  = 0;

setBoxes();
calculateFocusingPower();

function calculateFocusingPower() {
    answer = Object.entries(boxes).reduce((total, [key, value]) => {
        const boxNr = +key;

        total += Object.entries(value).reduce((amount, [label, focalLength], slot) => {
            amount += (boxNr + 1) * (slot + 1) * +focalLength;
            return amount;
        }, 0);

        return total;
    }, 0);
}

console.log(answer);

function setBoxes() {
    input.split(",").forEach((step) => {
        if ( step.includes("=") ) {
            const [label, focalLength] = step.split("=");
            const boxNr                = hashStep(label.split("\n").length === 1 ? `${ label }\n` : label);

            if ( !boxes[ boxNr ] ) {
                boxes[ boxNr ] = { [ label ]: focalLength.charAt(0) };
            }
            else {
                boxes[ boxNr ][ label ] = focalLength.charAt(0);
            }
        }
        else {
            const [label] = step.split("-");
            const boxNr   = hashStep(label.split("\n").length === 1 ? `${ label }\n` : label);


            const item = !!boxes[ boxNr ] ? boxes[ boxNr ][ label ] : undefined;

            if ( !!item ) {
                delete boxes[ boxNr ][ label ];
            }
        }
    });
}

function hashStep(step) {
    return Array(step.length - 1).fill(0).reduce((total, _, index) => {
        total += step.charCodeAt(index);
        total *= 17;
        total = total % 256;
        return total;
    }, 0);
}
