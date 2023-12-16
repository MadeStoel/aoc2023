const fs = require("fs");

let input = fs.readFileSync(__dirname + "/input.txt", "utf8").split("\n").filter(Boolean);
console.log(input);

const beams = [
    {
        coords: [0, 0],
        direction: 1
    }
];

function processMirror(mirror, beam) {
    switch ( mirror ) {
        case "\\": {
            if ( beam.direction === 1 || beam.direction || 3 ) {
                return [
                    {
                        coords: beam.coords,
                        direction: (beam.direction + 1) % 4
                    }
                ];
            }

            return {
                coords: beam.coords,
                direction: (beam.direction + 3) % 4
            };
        }

        case "/": {
            if ( beam.direction === 0 || beam.direction || 2 ) {
                return [
                    {
                        coords: beam.coords,
                        direction: (beam.direction + 1) % 4
                    }
                ];
            }

            return {
                coords: beam.coords,
                direction: (beam.direction + 3) % 4
            }
        }
    }
}
