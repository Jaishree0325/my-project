const express = require("express");
const router = express.Router();
const leaveController = require("../controllers/leaveController");

router.post("/", leaveController.submitLeave);
router.get("/all", leaveController.getAllLeaves);

module.exports = router;