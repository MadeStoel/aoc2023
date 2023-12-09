const fs = require("fs");

const input = fs.readFileSync(__dirname + "/input.txt", "utf8").split("\r\n").filter(Boolean);

let answer = 0;

input.forEach(row => {
    const numbers = row.split(' ').map(number => +number);

    const differenceTree = generateDifferenceTree(numbers);

    for (let node = differenceTree.length - 1; node > 0; node--) {
        const lastNumberOfCurrentNode = differenceTree[node][differenceTree[node].length - 1];
        const lastNumberOfNextNode = differenceTree[node - 1][differenceTree[node - 1].length - 1];

        differenceTree[node - 1].push(lastNumberOfCurrentNode + lastNumberOfNextNode);
    }

    answer += differenceTree[0].pop();
})

console.log(answer);

function generateDifferenceTree(numbers, result = [numbers]) {
    const differences = [];

    for (let i = 1; i < numbers.length; i++) {
        differences.push(numbers[i] - numbers[i - 1]);
    }

    if (differences.some(difference => difference !== 0)) {
        return generateDifferenceTree(differences, [...result, differences]);
    }

    return result;
}
