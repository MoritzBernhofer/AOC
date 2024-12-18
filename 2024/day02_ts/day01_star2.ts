import fs from "fs";

const content = fs.readFileSync("./start1.txt").toString();

const lines = content.split("\n");

const numbers = lines.map(line => line.split(" ").map(element => +element));
let resultsWith1Error = 0;

const rules = (list: number[], isSecondTry: boolean = false) => {
    let lastV = list[0];
    let result = true;
    let allowedUnsafe = 1;
    let errorEncountered = false;

    let rule1 = list[0] > list[1] ?
        (a: number, b: number) => a > b : (a: number, b: number) => a < b;

    let rule2 = list[0] > list[1] ?
        (a: number, b: number) => a - b >= 1 && a - b <= 3 : (a: number, b: number) => b - a >= 1 && b - a <= 3

    list.slice(1).forEach((current, index) => {
        if (!rule1(lastV, current)) {
            error();
        }

        if (!rule2(lastV, current) && !errorEncountered) {
            error();
        }

        errorEncountered = false;
        lastV = current;

        function error() {
            if (isSecondTry) {
                result = false;
            } else {
                errorEncountered = true;
                if (allowedUnsafe > 0) {

                    for (let i = -1; i <= 1; i++) {
                       let t = rules(getWithoutIndex(list, index + i), true) ? 1 : 0;
                       if(t){
                           resultsWith1Error++;
                           break;
                       }
                    }

                    allowedUnsafe--;
                    result = false;
                }
            }
        }
    });

    return result;
};

let result = numbers.reduce((sum, current) => sum + (rules(current) ? 1 : 0), 0);

console.log(result + resultsWith1Error);

function getWithoutIndex(array: number[], index: number) {
    return [...array.slice(0, index), ...array.slice(index + 1)];
}