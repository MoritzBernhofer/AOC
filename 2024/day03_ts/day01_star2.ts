import fs from "fs";

const content = fs.readFileSync("./start2.txt").toString();

const lines = content.split("\n");