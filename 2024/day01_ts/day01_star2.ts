import fs from "fs";

const content = fs.readFileSync("./start1.txt").toString();

const lines = content.split("\n");

let lists: number[][] = [[], []];

let trim = lines.map(l => l.trim());

lines.map(line => line.trim().split("  ")).forEach(elements => {
    lists[0].push(+elements[0]);
    lists[1].push(+elements[1]);
})

const result = lists[0].reduce((total, currentValue) => total + currentValue *
    lists[1].reduce((amountOfMatches, currentOtherListValue) =>
        amountOfMatches + (currentValue === currentOtherListValue ? 1 : 0), 0), 0);

console.log(result);