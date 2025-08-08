const XLSX = require("xlsx");
const path = require("path");

function getValidIds() {
  const filePath = path.join(__dirname, "../validStudents.xlsx"); 
  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(sheet);
  return data.map(row => row.studentId.toString());
}

module.exports = getValidIds;