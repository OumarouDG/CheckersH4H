const express = require("express");
const cors = require("cors");
const axios = require("axios"); // Import axios

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors()); // Allow frontend requests
app.use(express.json()); // To parse JSON request body

// API Endpoint for frontend to send queries
app.post("/api/query", async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required." });
  }

  try {
    // Send the request to the Django API (MasterQueryView endpoint)
    const response = await axios.post("http://127.0.0.1:8000/masterquery/", { query });

    // Send the result back to the frontend
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching from Django API:", error);
    res.status(500).json({ error: "Failed to fetch data from Django API" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
