import fs from 'fs';

export class task1 {
    public run(): string {
        const content = fs.readFileSync('./input1.txt', 'utf8');

        return 'task1 output';
    }
}