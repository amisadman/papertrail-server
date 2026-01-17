import path from "path";
import fs from "fs";

const filePath = path.join(process.cwd(), "./access.log");

export const accessLogStream = fs.createWriteStream(filePath, { flags: "a" });
