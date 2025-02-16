const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors()); // Allow frontend requests

const jsonData = {
  test: {
    paragraph: "This is a test paragraph from the API.",
    list: [
      { title: "Understanding Resource Management", link: "https://example.com/resource1", number: 85 },
      { title: "The Future of Web Development", link: "https://example.com/resource2", number: 72 },
      { title: "AI and Its Impact on Society", link: "https://example.com/resource3", number: 90 }
    ]
  }
};

// API Endpoint
app.get("/api/data", (req, res) => {
  res.json(jsonData);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
 