import React from "react";

const jsonData = {
  test: {
    paragraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
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
      <div style={{ textAlign: "center", maxWidth: "600px", width: "100%", padding: "20px" }}>
        {/* Header */}

        {/* Paragraph Section */}
        <div style={{ border: "1px solid white", padding: "3px 5px 8px", borderRadius: "10px", marginBottom: "15px" }}>
          <h2>Paragraph:</h2>
          <p style={{ fontSize: "18px", fontWeight: "normal", color: "lightgray", margin: "5px 0" }}>
            {jsonData.test.paragraph}
          </p>
        </div>

        {/* List Section */}
        <div style={{ border: "1px solid white", padding: "3px 5px 8px", borderRadius: "10px" }}>
          <h2>Links and Scores:</h2>
          <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
            {jsonData.test.list.map((item, index) => (
              <li key={index} style={{ marginBottom: "8px", padding: "8px", background: "#222", borderRadius: "8px", display: "flex", flexDirection: "column", alignItems: "flex-start", position: "relative" }}>
                {/* Title Row */}
                <div style={{ fontWeight: "bold", fontSize: "16px", color: "white" }}>
                  {item.title}
                </div>

                {/* Link Row */}
                <a href={item.link} style={{ color: "lightblue", textDecoration: "none", fontSize: "14px", wordBreak: "break-word" }} target="_blank" rel="noopener noreferrer">
                  {item.link}
                </a>

                {/* Score (Right-Aligned) */}
                <span style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", fontWeight: "bold", color: "#FFD700", fontSize: "16px" }}>
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
