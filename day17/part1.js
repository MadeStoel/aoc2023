const fs = require("fs");

let input = fs.readFileSync(__dirname + "/input.txt", "utf8").split("\n")
    .filter(Boolean)
    .map(row => row.split("")
        .map(number => +number)
        .filter(Boolean)
    );

const goalBlockKey = `${input[0].length - 1}-${input.length - 1}`;
const maxX = input[0].length - 1;
const maxY = input.length - 1;
const checkedBlocks = [];

const blocks = {
    "0-0": {
        heatLoss: 0,
        fromBlock: null,
        x: 0,
        y: 0
    }
};

while (!checkedBlocks.includes(goalBlockKey)) {
    const lowestBlock = getLowestHeatLossBlock();

    const availableDirections = ['north',
        'east',
        'south',
        'west'];

    availableDirections.forEach(direction => {
        step(lowestBlock, direction);
    });

    checkedBlocks.push(`${lowestBlock.x}-${lowestBlock.y}`);
}

// ===============DEBUGGING=====================
let blockToDraw = blocks[goalBlockKey]

while (blockToDraw.heatLoss !== 0) {
    input[blockToDraw.y][blockToDraw.x] = '#';

    blockToDraw = blocks[blockToDraw.fromBlock];
}

input.forEach(row => {
    console.log(row.join(''));
});

// ===============DEBUGGING=====================

console.log(blocks[goalBlockKey].heatLoss);

function getNextBlockCoords(block, direction) {
    switch (direction) {
        case 'north':
            return [block.x, block.y - 1];
        case 'east':
            return [block.x + 1, block.y];
        case 'south':
            return [block.x, block.y + 1];
        case 'west':
            return [block.x - 1, block.y];
    }
}

function step(lowestBlock, direction) {
    const nextBlockCoords = getNextBlockCoords(lowestBlock, direction);

    if (nextBlockCoords[0] < 0 || nextBlockCoords[0] > maxX ||
        nextBlockCoords[1] < 0 || nextBlockCoords[1] > maxY) return;

    const lowestBlockKey = `${lowestBlock.x}-${lowestBlock.y}`;
    const nextBlockKey = `${nextBlockCoords[0]}-${nextBlockCoords[1]}`;
    const nextBlockNewHeatLoss = lowestBlock.heatLoss + input[nextBlockCoords[1]][nextBlockCoords[0]];
    const nextBlock = blocks[nextBlockKey];

    if (!nextBlock) {
        blocks[nextBlockKey] = {
            heatLoss: nextBlockNewHeatLoss,
            fromBlock: lowestBlockKey,
            x: nextBlockCoords[0],
            y: nextBlockCoords[1]
        };
    } else if (nextBlock.heatLoss > nextBlockNewHeatLoss) {
        nextBlock.heatLoss = nextBlockNewHeatLoss;
        nextBlock.fromBlock = lowestBlockKey;
    }
}

function getLowestHeatLossBlock() {
    return Object.values(blocks).filter(block => !checkedBlocks.includes(`${block.x}-${block.y}`))
        .reduce((resultBlock, currentBlock) => {
            if (resultBlock.heatLoss > currentBlock.heatLoss) {
                return currentBlock;
            }

            return resultBlock;
        });
}
