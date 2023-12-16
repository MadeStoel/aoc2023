const fs = require("fs");

let input = fs.readFileSync(__dirname + "/input.txt", "utf8").split("\n").filter(Boolean)
    .map(row => row.split(""));

const maxX = input[0].length - 1;
const maxY = input.length - 1;
let visitedTiles = new Set();
const answers = [];

let beams;

input[0].forEach((_, columnIndex) => {
    console.log(`parsing column: ${columnIndex + 1}/${maxX}`);
    setInitialBeams(columnIndex, 0, 2);

    addTilesToAnswers();

    setInitialBeams(columnIndex, maxY, 0);

    addTilesToAnswers();
});

input.forEach((_, rowIndex) => {
    console.log(`parsing row: ${rowIndex + 1}/${maxY}`);
    setInitialBeams(0, rowIndex, 1);

    addTilesToAnswers();

    setInitialBeams(maxX, rowIndex, 3);

    addTilesToAnswers();
});

console.log(Math.max(...answers))

function addTilesToAnswers() {
    while (!!beams.length) {
        advanceBeams();
    }

    answers.push(visitedTiles.size);
    visitedTiles = new Set();
}

function setInitialBeams(x, y, direction) {
    beams = [
        {
            x,
            y,
            direction,
            history: []
        }
    ]
}

function advanceBeams() {
    beams = beams.flatMap((beam, index) => {
        beam = updateHistory(beam);
        const newBeams = processMirror(beam, input[beam.y][beam.x]);

        return newBeams.map(beam => {
            beam = moveBeam(beam);
            beam = filterBeam(beam);

            return beam;
        }).filter(Boolean);
    });
}

function filterBeam(beam) {
    if (beam.x < 0 || beam.x > maxX || beam.y < 0 || beam.y > maxY) return null;
    if (beam.history.includes(`${beam.x}-${beam.y}_${beam.direction}`)) return null;
    return beam;
}

function moveBeam(beam) {
    switch (beam.direction) {
        case 0:
            beam.y--;
            break;
        case 1:
            beam.x++;
            break;
        case 2:
            beam.y++;
            break;
        case 3:
            beam.x--;
            break;
    }

    return beam;
}

function updateHistory(beam) {
    visitedTiles.add(`${beam.x}-${beam.y}`);
    beam.history.push(`${beam.x}-${beam.y}_${beam.direction}`);
    return beam;
}

function processMirror(beam, mirror) {
    switch (mirror) {
        case ".": {
            return [beam];
        }
        case "/":
        case "\\": {
            const [a, b] = mirror === '/' ? [0, 2] : [1, 3];

            if (beam.direction === a || beam.direction === b) {
                return [
                    {
                        x: beam.x,
                        y: beam.y,
                        direction: (beam.direction + 1) % 4,
                        history: beam.history
                    }
                ];
            }

            return [{
                x: beam.x,
                y: beam.y,
                direction: (beam.direction + 3) % 4,
                history: beam.history

            }];
        }
        case "|": {
            if (beam.direction === 0 || beam.direction === 2) {
                return [beam];
            }

            return [{
                x: beam.x,
                y: beam.y,
                direction: 0,
                history: beam.history

            }, {
                x: beam.x,
                y: beam.y,
                direction: 2,
                history: beam.history

            }]
        }
        case "-": {
            if (beam.direction === 1 || beam.direction === 3) {
                return [beam];
            }

            return [{
                x: beam.x,
                y: beam.y,
                direction: 1,
                history: beam.history

            }, {
                x: beam.x,
                y: beam.y,
                direction: 3,
                history: beam.history
            }]
        }
    }
}
