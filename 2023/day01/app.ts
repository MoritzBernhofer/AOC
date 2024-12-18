import {task1} from "./task1";
import {task2} from "./tast2";
import fs from "fs";

const app1 = new task1();
const app2 = new task2();


fs.writeFileSync('./output/output1.txt', app1.run());
fs.writeFileSync('./output/output2.txt', app2.run());