import { readFileSync } from "fs";

const file = readFileSync("./Bible.txt", "utf-8");
console.log(file);
