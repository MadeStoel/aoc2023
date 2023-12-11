const fs = require("fs");

let input = fs.readFileSync(__dirname + "/input.txt", "utf8").split("\r\n").filter(Boolean);

const expandedCoords = expandSpace();
const galaxyCoords = getGalaxyCoords();
const distanceSum = getDistanceSum();


console.log(distanceSum);

function getDistanceSum() {
    let distanceSum = 0;

    for (let galaxy = 0; galaxy < galaxyCoords.length; galaxy++) {
        for (let distantGalaxy = galaxy + 1; distantGalaxy < galaxyCoords.length; distantGalaxy++) {
            let verticalDistance = Math.abs(galaxyCoords[distantGalaxy][0] - galaxyCoords[galaxy][0]);

            const verticalCoords = [galaxyCoords[distantGalaxy][0], galaxyCoords[galaxy][0]].sort((a,b) => a < b ? -1:1);
            const extraVerticalSteps = expandedCoords.rows.reduce((steps, row) => {
                if (row >= verticalCoords[0] && row <= verticalCoords[1]) steps += 999999;
                return steps;
            }, 0);

            verticalDistance += extraVerticalSteps;


            let horizontalDistance = Math.abs(galaxyCoords[distantGalaxy][1] - galaxyCoords[galaxy][1]);

            const horizontalCoords = [galaxyCoords[distantGalaxy][1], galaxyCoords[galaxy][1]].sort((a,b) => a < b ? -1:1);
            const extraHorizontalSteps = expandedCoords.cols.reduce((steps, col) => {
                if (col >= horizontalCoords[0] && col <= horizontalCoords[1]) steps += 999999;
                return steps
            }, 0);

            horizontalDistance += extraHorizontalSteps;

            distanceSum += horizontalDistance + verticalDistance;
        }
    }

    return distanceSum;
}

function getGalaxyCoords() {
    const result = [];

    input.forEach((row, rowIndex) => {
        row.split('').forEach((char, colIndex) => {
            if (char === '#') result.push([rowIndex, colIndex]);
        })
    })

    return result;
}

function expandSpace() {
    const result = {
        rows: [],
        cols: []
    }
    // Expand rows
    input.forEach((row, rowIndex) => {
        if (row.split('').every(char => char === '.')) {
            result.rows.push(rowIndex)
        }
    });

    // Expand columns
    const columnLength = input.length;

    for (let column = 0; column < columnLength; column++) {
        if (input.every(row => row[column] === '.')) {
            result.cols.push(column);
        }
    }

    return result;
}
