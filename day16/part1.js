const fs = require("fs");

let input = fs.readFileSync(__dirname + "/input.txt", "utf8").split("\n").filter(Boolean)
    .map(row => row.split(""));

const maxX = input[0].length - 1;
const maxY = input.length - 1;
const visitedTiles = new Set();

let beams = [
    {
        x: 0,
        y: 0,
        direction: 1,
        history: []
    }
];

while(!!beams.length) {
    advanceBeams();
    console.log(beams);
    console.log("==============");
}

console.log(visitedTiles.size)

function advanceBeams() {
    beams = beams.flatMap((beam, index) => {
        beam = updateHistory(beam);
        const newBeams = processMirror(beam, input[beam.x][beam.y]);

        return newBeams.map(beam => {
            beam = moveBeam(beam);
            visitedTiles.add(`${beam.x}-${beam.y}`);
            beam = filterBeam(beam);

            return beam;
        }).filter(Boolean);
    });
}

function filterBeam(beam) {
    if (beam.x < 0 || beam.x > maxX || beam.y < 0 || beam.y > maxY) return null;
    if(beam.history.includes(`${beam.x}-${beam.y}_${beam.direction}`)) return null;
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
