import fs from "fs";

const content = fs.readFileSync("./start1.txt").toString();

const sections = content.split("\n\n");

const rules = sections[0].split("\n").map(line => line.split("|").map(Number));
const updates = sections[1].split("\n");

const correctupdates = updates
    .filter(line => {
        const numbers = line.split(",").map(Number);

        for (let index = 0; index < numbers.length - 1; index++) {
            const numbersBefore = numbers.slice(0, index);
            const numbersAfter = numbers.slice(index + 1);
            const number = numbers[index];

            const mustBeBefore = rules.filter(rule => rule[1] === number).map(rule => rule[0]);
            const mustBeAfter = rules.filter(rule => rule[2] === number).map(rule => rule[1]);

            if (numbersAfter.some(numberAfter => mustBeBefore.includes(numberAfter))) {
                return false;
            }

            if (numbersBefore.some(numberBefore => mustBeAfter.includes(numberBefore))) {
                return false;
            }
        }
        return true;
    });

const result = correctupdates
    .map(update =>
        update.split(",").map(Number)).map(update => update[Math.ceil(update.length/2) - 1]).reduce((acc, currentValue) => acc + currentValue);
console.log(result)