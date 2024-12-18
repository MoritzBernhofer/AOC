import fs from "fs";

const content = fs.readFileSync("./start1.txt").toString();

const lines = content.split("\n");

const numbers = lines.map(line => line.split(" ").map(element => +element));

const rules = (list: number[]) => {
    let lastV = list[0];
    let result = true;

    const rule1 = list[0] > list[1] ?
        (a:number, b: number) => a > b: (a:number, b: number) => a < b;

    const rule2= list[0] > list[1] ?
        (a:number, b: number) => a - b >= 1 && a - b <= 3: (a:number, b: number) => b - a >= 1 && b - a <= 3;

    list.slice(1).forEach(current => {
        if(!rule1(lastV, current) || !rule2(lastV, current)){
            result = false;
        }
        lastV = current;
    })

    return result;
};

const result = numbers.reduce((sum, current) => sum + (rules(current) ? 1 : 0),0);

console.log(result);