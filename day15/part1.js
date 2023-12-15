const fs = require("fs");

let input = fs.readFileSync(__dirname + "/input.txt", "utf8");

const answer = input.split(",").reduce((total, step) => {
    total += hashStep(step.split("\n").length === 1 ? `${ step }\n` : step);
    return total;
}, 0);

console.log(answer);

function hashStep(step) {
    return Array(step.length - 1).fill(0).reduce((total, _, index) => {
        total += step.charCodeAt(index);
        total *= 17;
        total = total % 256;
        return total;
    }, 0);
}
