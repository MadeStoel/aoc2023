const fs = require("fs");

const input = fs.readFileSync(__dirname + "/input.txt", "utf8").split("\n").filter(Boolean);

const hands = categorizeHands();

sortHands(hands);

const singleArrayOfHands = Object.values(hands).reduce((result, categorizedHands) => {
    result.push(...categorizedHands);
    return result;
}, []);

console.log(singleArrayOfHands.reduce((answer, hand, index) => answer + (hand.bid * (index + 1)), 0));

function getCardStrength(card) {
    switch (card) {
        case '2':
            return 2;
        case '3':
            return 3;
        case '4':
            return 4;
        case '5':
            return 5;
        case '6':
            return 6;
        case '7':
            return 7;
        case '8':
            return 8;
        case '9':
            return 9;
        case 'T':
            return 10;
        case 'J':
            return 11;
        case 'Q':
            return 12;
        case 'K':
            return 13;
        case 'A':
            return 14;
    }
}

function sortHands(allHands) {
    Object.values(allHands).forEach(categorizedHands => {
        categorizedHands.sort((a, b) => {
            const firstCards = a.hand.split('');
            const secondCards = b.hand.split('');

            for (let i = 0; i < firstCards.length; i++) {
                if (firstCards[i] !== secondCards[i]) {
                    return getCardStrength(firstCards[i]) > getCardStrength(secondCards[i]) ? 1 : -1;
                }
            }
        });
    });
}

function categorizeHands() {
    return input.reduce((result, row) => {
        const [hand, bid] = row.split(' ');
        const handType = getHandType(hand);
        const handTypeStrength = getHandTypeStrength(handType);

        const parsedHand = {
            hand,
            handType,
            bid: +bid
        };

        !!result[handTypeStrength] ? result[handTypeStrength].push(parsedHand) : result[handTypeStrength] = [parsedHand];

        return result;
    }, {});
}

function getHandTypeStrength(handType) {
    switch (handType) {
        case 'high-card':
            return 1;
        case 'one-pair':
            return 2;
        case 'two-pair':
            return 3;
        case 'three-of-a-kind':
            return 4;
        case 'full-house':
            return 5;
        case 'four-of-a-kind':
            return 6;
        case 'five-of-a-kind':
            return 7;
    }
}

function getHandType(hand) {
    const occurrencesMap = {};

    hand.split('').forEach(card => {
        !occurrencesMap[card] ? occurrencesMap[card] = 1 : occurrencesMap[card]++;
    });

    const occurrences = Object.values(occurrencesMap);

    if (occurrences.includes(5)) return 'five-of-a-kind';
    if (occurrences.includes(4)) return 'four-of-a-kind';
    if (occurrences.includes(3)) {
        return occurrences.includes(2) ? 'full-house' : 'three-of-a-kind';
    }
    if (occurrences.includes(2)) {
        const pairAmounts = occurrences.filter((occurrence) => occurrence === 2).length;
        return pairAmounts === 2 ? 'two-pair' : 'one-pair';
    }

    return 'high-card';
}
