import fs from "fs";

const content = fs.readFileSync("./start1.txt").toString();

const lines = content.split("\n");

// let lists: string[][] = [[], []];
//
// let trim = lines.map(l => l.trim());
//
// lines.map(line => line.trim().split("  ")).forEach(elements => {
//     lists[0].push(elements[0]);
//     lists[1].push(elements[1]);
// })

const lists = lines
    .map(line => line.trim().split("   ").map(Number))
    .reduce(
        (acc, cur) => [[...acc[0], cur[0]], [...acc[1], cur[1]]],
        [[], []] as number[][]
    );

const numberLists = lists.map(lists => lists.map(element => +element).sort());

let result = 0;

for (let i = 0; i < numberLists[0].length; i++) {
    if (numberLists[0][i] > numberLists[1][i]) {
        result += numberLists[0][i] - numberLists[1][i];
    } else {
        result += numberLists[1][i] - numberLists[0][i];
    }
}

console.log(result)