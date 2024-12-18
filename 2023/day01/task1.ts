import fs from 'fs';

export class task1 {
    public run(): string {
        const content = fs.readFileSync('./input1.txt', 'utf8');

        const lines = content.split('\n');


        return lines
            .map(line => line.replace(/\D/gm, ''))
            .map(line => line[0] + line[line.length - 1])
            .map(number => +number)
            .reduce((a, b) => a + b).toString();
    }
}