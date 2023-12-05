const fs = require("fs");

// Split the data into chunks divided by an empty line
const input = fs.readFileSync(__dirname + "/input.txt", "utf8").split(/\r?\n\s*\r?\n/).filter(Boolean);

let seeds = [];
let categories = [];
let mappedSeeds = [];

parseData();

seeds.forEach(seed => {
    categories.forEach(category => {
        // Loop over every map inside a category
       for (const map of category) {
            const destinationStart = map[0];
            const sourceStart = map[1];

            // Check if the seed is in range specified in the map and set the mapped seed value if it is.
           if(seed >= sourceStart && seed <= sourceStart + map[2]) {
               const offset = sourceStart - destinationStart;
               seed = seed - offset;

               break;
           }
       }
    });

    // add the mapped seed to the array of mapped seeds after all mappings.
    mappedSeeds.push(seed);
});

// Log the smallest mapped seed (e.g. location)
console.log(Math.min(...mappedSeeds));

function parseData() {
    input.forEach(categoryWithData => {
        // Split the category name and the associated data
        const [category, data] = categoryWithData.split(':');

        // If it's 'seeds', create a single array of seed numbers
        if (category === 'seeds') return seeds = data.trim().split(' ').map(number => +number);

        // Split the category data by row, convert all string representations of numbers into actual numbers
        // and remove rows with incomplete arrays.
        categories.push(data.split('\r\n')
            .map(row => row.split(' ')
                .map(number => +number))
            .filter(arr => arr.length === 3));
    })
}
