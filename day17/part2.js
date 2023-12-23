const fs = require("fs");

let input = fs.readFileSync(__dirname + "/input.txt", "utf8").split("\n")
    .filter(Boolean)
    .map(row => row.split("")
        .map(number => +number)
        .filter(Boolean)
    );


const blocks = [[0, 0, 0, 0, 0, 0]];
const seen = {};

while (!!blocks.length) {
    const [heatLoss, row, column, rowDirection, columnDirection, steps] = blocks.shift();
    if (seen[`${row}-${column}_${rowDirection}-${columnDirection}_${steps}`]) continue;

    seen[`${row}-${column}_${rowDirection}-${columnDirection}_${steps}`] = true;

    if (row === input.length - 1 && column === input[0].length - 1 && steps >= 4) {
        console.log(heatLoss);
        break;
    }

    if (steps < 10 && (rowDirection !== 0 || columnDirection !== 0)) {
        const nextRow = row + rowDirection;
        const nextColumn = column + columnDirection;

        // out of bounds check
        if (nextRow >= 0 && nextRow < input.length && nextColumn >= 0 && nextColumn < input[0].length) {
            const index = blocks.findIndex(block => block[0] > heatLoss + input[nextRow][nextColumn]);
            const newBlock = [heatLoss + input[nextRow][nextColumn], nextRow, nextColumn, rowDirection, columnDirection, steps + 1];

            index !== -1 ? blocks.splice(index, 0, newBlock) : blocks.push(newBlock);
        }
    }

    if (steps >= 4 || (rowDirection === 0 && columnDirection === 0)) {
        const availableDirections = [[1, 0], [0, 1], [-1, 0], [0, -1]].filter(([nextRowDirection, nextColumnDirection]) => {
            return (rowDirection !== nextRowDirection || columnDirection !== nextColumnDirection) &&
                (rowDirection !== -nextRowDirection || columnDirection !== -nextColumnDirection);
        })


        for (const [nextRowDirection, nextColumnDirection] of availableDirections) {
            const nextRow = row + nextRowDirection;
            const nextColumn = column + nextColumnDirection;

            // out of bounds check
            if (nextRow >= 0 && nextRow < input.length && nextColumn >= 0 && nextColumn < input[0].length) {
                const index = blocks.findIndex(block => block[0] > heatLoss + input[nextRow][nextColumn]);
                const newBlock = [heatLoss + input[nextRow][nextColumn], nextRow, nextColumn, nextRowDirection, nextColumnDirection, 1];

                index !== -1 ? blocks.splice(index, 0, newBlock) : blocks.push(newBlock);
            }
        }
    }
}