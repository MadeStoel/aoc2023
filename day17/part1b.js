const fs = require("fs");

let input = fs.readFileSync(__dirname + "/input.txt", "utf8").split("\n")
    .filter(Boolean)
    .map(row => row.split("")
        .map(number => +number)
        .filter(Boolean)
    );


const blocks = [[0, 0, 0, 0, 0, 0]];

while (blocks.length) {
    const [heatLoss, row, column, rowDirection, columnDirection, steps] = blocks.shift();

    if (row === input.length - 1 && column === input[0].length - 1) console.log(heatLoss);

    const availableDirections = [[1, 0], [0, 1], [-1, 0], [0, -1]].filter(([nextRowDirection, nextColumnDirection]) => {
        return (rowDirection !== nextRowDirection || columnDirection !== nextColumnDirection) &&
            (rowDirection !== -nextRowDirection || columnDirection !== -nextColumnDirection);
    })

    if(rowDirection !== 0 || columnDirection !== 0) {
        for (let i = steps; i < 3; i++) {
            const nextRow = row + rowDirection;
            const nextColumn = column + columnDirection;

            // out of bounds check
            if(nextRow < 0 || nextRow >= input.length || nextColumn < 0 || nextColumn >= input[0].length) return;

            blocks.push([heatLoss + input[nextRow][nextColumn], nextRow, nextColumn, rowDirection, columnDirection, steps + 1]);
        }
    }

    console.log({availableDirections, rowDirection, columnDirection});

    availableDirections.forEach(([nextRowDirection, nextColumnDirection]) => {
        const nextRow = row + nextRowDirection;
        const nextColumn = column + nextColumnDirection;

        // out of bounds check
        if(nextRow < 0 || nextRow >= input.length || nextColumn < 0 || nextColumn >= input[0].length) return;

        blocks.push([heatLoss + input[nextRow][nextColumn], nextRow, nextColumn, nextRowDirection, nextColumnDirection, 1]);
    });

    blocks.sort((a,b) => a[0] - b[0]);
}