import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";
const path = "C:/Users/18811/Desktop/摩托车相关/outputs/motorcycle-sales-training-20260906/摩托车销售与官网价格核验手册_2026-09-06.xlsx";
const wb = await SpreadsheetFile.importXlsx(await FileBlob.load(path));
console.log((await wb.inspect({kind:"sheet",include:"id,name"})).ndjson);
console.log((await wb.inspect({kind:"table",range:"官网核验汇总!A1:C7",include:"values,formulas",tableMaxRows:7,tableMaxCols:3})).ndjson);
console.log((await wb.inspect({kind:"table",range:"聊天话术!A4:E8",include:"values,formulas",tableMaxRows:5,tableMaxCols:5})).ndjson);
console.log((await wb.inspect({kind:"match",searchTerm:"#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!",options:{useRegex:true,maxResults:300}})).ndjson);
