import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const src = "C:/Users/18811/Desktop/摩托车相关/outputs/motorcycle-sales-20260906/摩托车销售车型清单_2026-09-06.xlsx";
const outDir = "C:/Users/18811/Desktop/摩托车相关/outputs/motorcycle-sales-training-20260906/source-preview";
await fs.mkdir(outDir, { recursive: true });
const wb = await SpreadsheetFile.importXlsx(await FileBlob.load(src));
const sheets = await wb.inspect({ kind: "sheet", include: "id,name" });
console.log("SHEETS", sheets.ndjson ?? sheets);
const table = await wb.inspect({ kind: "table", range: "车型总表!A1:O12", include: "values,formulas", tableMaxRows: 12, tableMaxCols: 15 });
console.log("TABLE", table.ndjson ?? table);
const img = await wb.render({ sheetName: "车型总表", range: "A1:O18", scale: 1, format: "png" });
await fs.writeFile(`${outDir}/source-models.png`, new Uint8Array(await img.arrayBuffer()));
