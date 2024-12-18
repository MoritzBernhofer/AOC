import fs from "fs";

const content = fs.readFileSync("./start1.txt").toString();
const regex = new RegExp("(mul\\((?<firstNumber>\\d{1,3}),(?<secondNumber>\\d{1,3})\\)|(?<end>don't\\(\\)))|(?<start>(do\\(\\)))", "gm");

let doing = true;

let acc = Array.from(content.matchAll(regex), match => {
    const {firstNumber, secondNumber, start, end} = match.groups!;

    if (start !== undefined)
        doing = true;

    if (end !== undefined)
        doing = false;

    if (doing && !start && !end ) {
        return +firstNumber * +secondNumber;
    } else {
        return 0;
    }
}).reduce((sum, value) => sum + value, 0);

console.log(acc);