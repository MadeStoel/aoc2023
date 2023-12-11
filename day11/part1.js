const fs = require("fs");

let input = fs.readFileSync(__dirname + "/input.txt", "utf8").split("\r\n").filter(Boolean);

expandSpace();

const galaxyCoords = getGalaxyCoords();

input.forEach(row => console.log(row));

const distanceSum = getDistanceSum();

console.log(distanceSum);

function getDistanceSum() {
    let distanceSum = 0;

    for (let galaxy = 0; galaxy < galaxyCoords.length; galaxy++) {
        for (let distantGalaxy = galaxy + 1; distantGalaxy < galaxyCoords.length; distantGalaxy++) {
            const horizontalDistance = Math.abs(galaxyCoords[distantGalaxy][0] - galaxyCoords[galaxy][0]);
            const verticalDistance = Math.abs(galaxyCoords[distantGalaxy][1] - galaxyCoords[galaxy][1]);
           distanceSum += horizontalDistance + verticalDistance;
        }
    }

    return distanceSum;
}

function getGalaxyCoords() {
    const result = [];

    input.forEach((row, rowIndex) => {
        row.split('').forEach((char, colIndex) => {
            if(char === '#') result.push([rowIndex, colIndex]);
        })
    })

    return result;
}

function expandSpace() {
    // Expand rows
    input = input.map((row, rowIndex) => {
        if (row.split('').every(char => char === '.')) {
            return [row, row];
        }
        return row
    });

    input = input.flat();

    // Expand columns
    const columnLength = input.length;

    const sameColumns = [];

    for (let column = 0; column < columnLength; column++) {
        if (input.every(row => row[column] === '.')) {
            sameColumns.splice(0, 0, column);
        }
    }

    input = input.map(row => {
       const chars = row.split('');
       sameColumns.forEach(column => chars.splice(column, 0, '.'));

       return chars.join('');
    });
}
