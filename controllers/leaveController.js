const Leave = require("../models/Leave");

// Submit leave request
exports.submitLeave = async (req, res) => {
  const { studentId, room, fromDate, toDate, reason } = req.body;

  if (!studentId || !room || !fromDate || !toDate || !reason) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    const leave = await Leave.create({ studentId, room, fromDate, toDate, reason });
    console.log("Leave saved:", leave.toJSON());
    res.status(201).json({ status: "Success", data: leave });
  } catch (err) {
    console.error("Error saving leave:", err);
    res.status(500).json({ message: "Database error." });
  }
};

// Get all leave records
exports.getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.findAll();
    res.status(200).json(leaves);
  } catch (err) {
    console.error("Failed to fetch leaves:", err);
    res.status(500).json({ message: "Database error." });
  }
};