const fs = require("fs");

let input = fs.readFileSync(__dirname + "/input.txt", "utf8").split("\r\n").filter(Boolean);

let questionMarkIndexes;
let data;
let numbers;

let answer = 0;

input.forEach(row => {
    [data, numbers] = row.split(' ');

    questionMarkIndexes = data.split('').reduce((result, char, index) => {
        if (char === '?') result.push(index);

        return result;
    }, []);

    generateCombinations(data.split(''), 0);
});

console.log(answer);

function checkIfValid(data) {
    let damagedSpringGroups = data.split('.').filter(Boolean);

    damagedSpringGroups = damagedSpringGroups.map(group => group.length).join(',');

    if (damagedSpringGroups === numbers) answer++;
}


function generateCombinations(row, index) {
    if (index === questionMarkIndexes.length) {
        checkIfValid(row.join(''));
        return;
    }

    // Set the current index to 0 and generate combinations
    row[questionMarkIndexes[index]] = '.';
    generateCombinations([...row], index + 1);

    // Set the current index to 1 and generate combinations
    row[questionMarkIndexes[index]] = '#';
    generateCombinations([...row], index + 1);
}
