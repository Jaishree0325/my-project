const express = require("express");
const cors = require("cors");
const leaveRoutes = require("./routes/leaveRoutes");
const mealRoutes = require("./routes/mealRoutes");
const getValidIds = require("./utils/loadValidIds");

const app = express();
const PORT = 3000;

// Load IDs from Excel file
const validIds = getValidIds();

app.use(cors());
app.use(express.json());

// Static access for CSV downloads
app.use("/files", express.static(__dirname + "/routes"));

// 🛣️ Mount leave & meal routes
app.use("/api/leave", leaveRoutes);
app.use("/api/meals", mealRoutes);

// Expose valid student IDs to frontend
app.get("/api/valid-ids", (req, res) => {
  res.json({ ids: validIds });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});