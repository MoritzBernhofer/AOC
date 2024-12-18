import fs from 'fs';
import {task1} from "./task1";

export class task2 {
    public run(): string {
        const content = fs.readFileSync('./input2.txt', 'utf8');

        const lines = content.split('\n');

        const convertedLines = lines.map(line => {
                const result: string[] = [];

                let tmp = "";
                for (let i = 0; i < line.length; i++) {
                    if (Number.isInteger(+line[i])) {
                        result.push(line[i]);
                        tmp = "";
                    } else {
                        tmp += line[i];
                        this.map.forEach((value, index) => {
                            if (tmp.includes(value)) {
                                result.push((index + 1).toString());
                                tmp = value.slice(1, value.length);
                            }
                        })
                    }
                }
                return result.join('');
            }
        );

        return convertedLines
            .map(line => line.replace(/\D/gm, ''))
            .map(line => line[0] + line[line.length - 1])
            .map(number => +number)
            .reduce((a, b) => a + b).toString();

    }


    map: string[] = [
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
        "ten"
    ];
}
