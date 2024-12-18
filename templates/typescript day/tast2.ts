import fs from 'fs';

export class task2 {
    public run(): string {
        const content = fs.readFileSync('./input2.txt', 'utf8');

        return 'task2 output';
    }
}