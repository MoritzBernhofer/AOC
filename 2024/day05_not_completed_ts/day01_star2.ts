import fs from "fs";

const content = fs.readFileSync("./start1.txt").toString();

const sections = content.split("\n\n");

const rules = sections[0].split("\n").map(line => line.split("|").map(Number));
const updates = sections[1].split("\n");

const correctUpdates = updates
    .map(line => {
            let numbers = line.split(",").map(Number);
            let changed = false;

            while (notFixed(numbers)) {
                numbers = fixStuff(numbers)
                changed = true;
            }

            return {numbers, changed};

            function notFixed(numbers: number[]) {
                for (let index = 0; index < numbers.length - 1; index++) {
                    const numbersBefore = numbers.slice(0, index);
                    const numbersAfter = numbers.slice(index + 1);
                    const number = numbers[index];

                    const mustBeBefore = rules.filter(rule => rule[1] === number).map(rule => rule[0]);
                    const mustBeAfter = rules.filter(rule => rule[2] === number).map(rule => rule[1]);

                    if (numbersAfter.some(numberAfter => mustBeBefore.includes(numberAfter))) {
                        return true;
                    }

                    if (numbersBefore.some(numberBefore => mustBeAfter.includes(numberBefore))) {
                        return true;
                    }
                }
                return false;
            }

            function fixStuff(numbers: number[]): number[] {
                for (let index = 0; index < numbers.length - 1; index++) {
                    const numbersBefore = numbers.slice(0, index);
                    const numbersAfter = numbers.slice(index + 1);
                    const number = numbers[index];

                    const mustBeBefore = rules.filter(rule => rule[1] === number).map(rule => rule[0]);
                    const mustBeAfter = rules.filter(rule => rule[2] === number).map(rule => rule[1]);

                    for (let i = 0; i < numbersAfter.length; i++) {
                        for (let j = 0; j < mustBeBefore.length; j++) {
                            if (numbersAfter[i] === mustBeBefore[j]) {
                                numbers = insertBefore(numbers, index, numbersAfter[i]);
                            }
                        }
                    }

                    for (let i = 0; i < numbersBefore.length; i++) {
                        for (let j = 0; j < mustBeAfter.length; j++) {
                            if (numbersBefore[i] === mustBeAfter[j]) {
                                numbers = insertAfter(numbers, index, numbersBefore[i]);
                            }
                        }
                    }
                }
                return numbers;
            }

            function insertBefore(arr: number[], index: number, value: number): number[] {
                return [...arr.slice(0, index), value, arr[index], ...arr.slice(index + 1).filter(e => e !== value)]
            }

            function insertAfter(arr: number[], index: number, value: number): number[] {
                return [...arr.slice(0, index).filter(e => e !== value), arr[index], value, ...arr.slice(index + 1)]
            }
        }
    ).filter(update => update.changed);

const result = correctUpdates.map(update => update.numbers[Math.ceil(update.numbers.length / 2) - 1]).reduce((acc, currentValue) => acc + currentValue);
console.log(result)