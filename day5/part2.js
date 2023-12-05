const fs = require("fs");

// Split the data into chunks divided by an empty line
const input = fs.readFileSync(__dirname + "/input.txt", "utf8").split(/\r?\n\s*\r?\n/).filter(Boolean);

let seedPairs = [];
let categories = [];
let locationFound = false;

// the location which is used to check if it is reachable by any of the available seeds
let currentLocation = 0;

parseData();

do {
    // Keep track of the location which is parsed back to the original seed number
    let parsedSeed = currentLocation;

    categories.forEach(category => {
        for (const map of category) {
            const destinationStart = map[0];
            const sourceStart = map[1];
            const range = map[2]

            // If the parsed seed is in range of a map, convert it using that map
            if (parsedSeed >= destinationStart && parsedSeed <= destinationStart + range) {
                parsedSeed += sourceStart - destinationStart;
                break;
            }
        }
    });

    // When the location is mapped to a seed number, check if that seed is available in all available seed numbers
    for (const [start, range] of seedPairs) {
        // If the parsed seed (mapped location) is available in the seeds, stop the search
        if (parsedSeed >= start && parsedSeed <= start + range) {
            locationFound = true;
            break;
        }
    }

    // restart the loop on the next location if there was no seed found for that location
    if (!locationFound) currentLocation++;
} while (!locationFound);

console.log(currentLocation);

function parseData() {
    input.forEach(categoryWithData => {
        // Split the category name and the associated data
        const [category, data] = categoryWithData.split(':');

        // If it's 'seeds', create an array filled with seed pairs: the first seed and the range for all following seeds
        if (category === 'seeds') return seedPairs = makePairs(data.trim().split(' ').map(number => +number));

        // Split the category data by row, convert all string representations of numbers into actual numbers
        // and remove rows with incomplete arrays
        categories.push(data.split('\r\n')
            .map(row => row.split(' ')
                .map(number => +number))
            .filter(arr => arr.length === 3));
    });

    // Reverse the categories to map from the end to the beginning
    categories.reverse();
}

// Convert an array of items into arrays containing 2 numbers, creating pairs.
function makePairs(items) {
    const result = [];
    let pairIndex = 0;

    items.forEach((item, index) => {
        if (index % 2 === 0) {
            result.push([+item])
        } else {
            result[pairIndex].push(+item);
            pairIndex++;
        }
    });

    return result;
}
