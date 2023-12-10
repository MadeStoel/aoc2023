const fs = require("fs");

const input = fs.readFileSync(__dirname + "/input.txt", "utf8").split("\r\n").filter(Boolean);

let currentCoords = getStartingCoordinates();
let nextDirection = null;
let enteredFrom = null;
let pipeType = convertCoordsToPipeType(currentCoords);
const loop = [];

while (!loop.includes(`${currentCoords[0]}-${currentCoords[1]}`)) {
    loop.push(`${currentCoords[0]}-${currentCoords[1]}`);

    setNextDirectionAndCoordinates();

    pipeType = input[currentCoords[0]][currentCoords[1]];
    enteredFrom = flipDirection(nextDirection);
}

console.log(loop.length / 2);


function setNextDirectionAndCoordinates() {
    nextDirection = getValidAdjacentPositions(pipeType).filter(direction => direction !== enteredFrom)[0];
    currentCoords = getAdjacentCoordinates(currentCoords)[nextDirection];
}

function flipDirection(direction) {
    switch (direction) {
        case 'up':
            return 'down';
        case 'down':
            return 'up';
        case 'left':
            return 'right';
        case 'right':
            return 'left';
    }
}

function convertCoordsToPipeType(coordinates) {
    const adjacentCoords = getAdjacentCoordinates(coordinates);

    Object.keys(adjacentCoords).map((direction) => {
        const [row, column] = adjacentCoords[direction];

        try {
            adjacentCoords[direction] = input[row][column];
        } catch (_) {
            adjacentCoords[direction] = undefined;
        }
    });

    let entrances = '';

    if (['7', '|', 'F', 'S'].includes(adjacentCoords['up'])) entrances = entrances.concat('up');
    if (['J', '|', 'L', 'S'].includes(adjacentCoords['down'])) entrances = entrances.concat('down');
    if (['L', '-', 'F', 'S'].includes(adjacentCoords['left'])) entrances = entrances.concat('left');
    if (['J', '-', '7', 'S'].includes(adjacentCoords['right'])) entrances = entrances.concat('right');


    return getPipeTypeForEntrances(entrances);
}

function getPipeTypeForEntrances(entrances) {
    switch (entrances) {
        case 'updown':
            return '|';
        case 'upleft':
            return 'J';
        case 'upright':
            return 'L';
        case 'downleft':
            return '7';
        case 'downright':
            return 'F';
        case 'leftright':
            return '-';
    }
}

function getValidAdjacentPositions(pipeType) {
    switch (pipeType) {
        case 'S':
            return ['up', 'down', 'left', 'right'];
        case '|':
            return ['up', 'down'];
        case '-':
            return ['left', 'right'];
        case 'L':
            return ['up', 'right'];
        case 'J':
            return ['up', 'left'];
        case '7':
            return ['down', 'left'];
        case 'F':
            return ['down', 'right'];
    }
}

function getAdjacentCoordinates(coordinates) {
    const [row, column] = coordinates;

    return {
        up: [row - 1, column],
        down: [row + 1, column],
        left: [row, column - 1],
        right: [row, column + 1]
    };
}

function getStartingCoordinates() {
    for (let row = 0; row < input.length; row++) {
        for (let column = 0; column < input[row].length; column++) {
            if (input[row][column] === 'S') return [row, column];
        }
    }
}
