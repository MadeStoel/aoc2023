const fs = require("fs");

let input = fs.readFileSync(__dirname + "/input.txt", "utf8").split("\n")
              .filter(Boolean)
              .map(row => row.split("")
                             .map(number => +number)
                             .filter(Boolean)
              );

const goalBlockKey  = `${ input[ 0 ].length - 1 }-${ input.length - 1 }`;
const maxX          = input[ 0 ].length - 1;
const maxY          = input.length - 1;
const checkedBlocks = [];

const blocks = {
    "0-0": {
        heatLoss: 0,
        fromBlock: null,
        x: 0,
        y: 0
    }
};
//
// while ( checkedBlocks.length !== (maxX + 1) * (maxY + 1)) {
//     const lowestBlock = getLowestHeatLossBlock();
//
//     stepSouth(lowestBlock);
// }

for ( let i = 0; i < 5; i++ ) {
    const lowestBlock = getLowestHeatLossBlock();

    stepSouth(lowestBlock);

    checkedBlocks.push(`${ lowestBlock.x }-${ lowestBlock.y }`);
}

console.log(blocks);

function stepSouth(lowestBlock) {
    const nextBlockY = lowestBlock.y + 1;

    if ( nextBlockY > maxY ) return;

    const nextBlockX           = lowestBlock.x;
    const lowestBlockKey       = `${ lowestBlock.x }-${ lowestBlock.y }`;
    const nextBlockKey         = `${ nextBlockX }-${ nextBlockY }`;
    const nextBlockNewHeatLoss = lowestBlock.heatLoss + input[ nextBlockY ][ nextBlockX ];
    const nextBlock            = blocks[ nextBlockKey ];

    if ( !nextBlock ) {
        blocks[ nextBlockKey ] = {
            heatLoss: nextBlockNewHeatLoss,
            fromBlock: lowestBlockKey,
            x: nextBlockX,
            y: nextBlockY
        };
    }
    else if ( nextBlock.heatLoss > nextBlockNewHeatLoss ) {
        nextBlock.heatLoss  = nextBlockNewHeatLoss;
        nextBlock.fromBlock = lowestBlockKey;
    }
}

function getLowestHeatLossBlock() {
    return Object.values(blocks).filter(block => !checkedBlocks.includes(`${ block.x }-${ block.y }`))
                 .reduce((resultBlock, currentBlock) => {
                     if ( resultBlock.heatLoss > currentBlock.heatLoss ) {
                         return currentBlock;
                     }

                     return resultBlock;
                 });
}
