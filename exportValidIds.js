const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");

const workbook = XLSX.readFile(path.join(__dirname, "validStudents.xlsx"));
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const data = XLSX.utils.sheet_to_json(sheet);

fs.writeFileSync(path.join(__dirname, "validIds.json"), JSON.stringify(data, null, 2));
console.log("JSON generated: validIds.json");