// 
const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "leaveData.csv");
const headers = "Student ID,Room,From,To,Reason\n";
console.log("Writing to:", filePath);

// Write headers once if file doesn't exist
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, headers);
}

router.post("/", (req, res) => {
  const { studentId, room, fromDate, toDate, reason } = req.body;

  if (!studentId || !room || !fromDate || !toDate || !reason) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  const newRow = `${studentId},${room},${fromDate},${toDate},${reason}\n`;
  fs.appendFileSync(filePath, newRow);
  console.log("✅ Leave recorded:", newRow);

  res.status(200).json({ status: "Success", message: "Leave recorded!" });
});

module.exports = router;