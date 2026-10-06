import fs from "node:fs/promises";
import sharp from "sharp";

const input = "C:/Users/18811/Desktop/摩托车相关/diagram/motorcycle-sales-newbie/摩托车新人销售思维导图.svg";
const output = "C:/Users/18811/Desktop/摩托车相关/diagram/motorcycle-sales-newbie/摩托车新人销售思维导图@2x.png";
const data = await fs.readFile(input);
await sharp(data, { density: 144 }).resize(3840, 2400).png().toFile(output);
console.log(output);
