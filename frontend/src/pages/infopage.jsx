import React from "react";

const jsonData = {
  test: {
    paragraph: "analysis.",
    list: [
      { title: "Understanding Resource Management", link: "https://example.com/resource1", number: 85 },
      { title: "The Future of Web Development", link: "https://example.com/resource2", number: 72 },
      { title: "AI and Its Impact on Society", link: "https://example.com/resource3", number: 90 }
    ]
  }
};

const ModernPage = () => {
  return (
    <div style={{ backgroundColor: "black", height: "100vh", color: "white", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ textAlign: "center", maxWidth: "600px", width: "100%", padding: "22px" }}>
        {/* Header */}
        <h1 style={{ lineHeight: "1.8" }}>Formatted JSON Data</h1>
        <p style={{ lineHeight: "1.6" }}>This page displays JSON data in a clean format.</p>

        {/* Paragraph Section */}
        <div style={{ border: "1px solid white", padding: "22px", borderRadius: "10px", marginBottom: "22px" }}>
          <h2 style={{ lineHeight: "1.8" }}>Paragraph:</h2>
          <p style={{ fontSize: "15px", fontWeight: "normal", color: "lightgray", margin: "5px 0", lineHeight: "1.8" }}>
            {jsonData.test.paragraph}
          </p>
        </div>

        {/* List Section */}
        <div style={{ border: "1px solid white", padding: "22px", borderRadius: "10px" }}>
          <h2 style={{ lineHeight: "1.8" }}>Links and Scores:</h2>
          <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
            {jsonData.test.list.map((item, index) => (
              <li key={index} style={{ marginBottom: "22px", padding: "22px", background: "#222", borderRadius: "8px", display: "flex", flexDirection: "column", alignItems: "flex-start", position: "relative", lineHeight: "1.8" }}>
                {/* Title Row */}
                <div style={{ fontWeight: "bold", fontSize: "16px", color: "white", lineHeight: "1.8" }}>
                  {item.title}
                </div>

                {/* Link Row */}
                <a href={item.link} style={{ color: "lightblue", textDecoration: "none", fontSize: "14px", wordBreak: "break-word", lineHeight: "1.8" }} target="_blank" rel="noopener noreferrer">
                  {item.link}
                </a>

                {/* Score (Right-Aligned, Smaller Font) */}
                <span style={{ position: "absolute", right: "22px", top: "50%", transform: "translateY(-50%)", fontWeight: "bold", color: "#FFD700", fontSize: "14px" }}>
                  {item.number}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ModernPage;
