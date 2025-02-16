import React from "react";
import { motion } from "framer-motion";

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

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i) => {
    const delay = i * 0.5;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
        opacity: { delay, duration: 0.01 }
      }
    };
  }
};

const getColorForScore = (score) => {
  if (score <= 30) return "darkred";
  if (score <= 50) return "orange";
  if (score <= 70) return "yellow";
  if (score <= 85) return "yellowgreen";
  return "darkgreen";
};

const ModernPage = () => {
  return (
    <div style={{
      minHeight: "100vh",
      minWidth: "100vw",
      margin: 0,
      paddingTop: 54,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "url('your-image.jpg') no-repeat center center fixed",
      backgroundSize: "cover",
      color: "white",
    }}>
      <div style={{
        textAlign: "left",
        maxWidth: "600px",
        width: "90%",
        padding: "27px",
        background: "black",
        borderRadius: "10px",
        overflow: "hidden",
      }}>
        <div style={{ border: "1px solid white", padding: "22px", borderRadius: "10px", marginBottom: "22px" }}>
          <h2 style={{ lineHeight: "1.8" }}>Paragraph:</h2>
          <p style={{ fontSize: "15px", fontWeight: "normal", color: "lightgray", margin: "5px 0", lineHeight: "1.8" }}>
            {jsonData.test.paragraph}
          </p>
        </div>

        <div style={{ border: "1px solid white", padding: "22px", borderRadius: "10px" }}>
          <h2 style={{ lineHeight: "1.8" }}>Links and Scores:</h2>
          <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
            {jsonData.test.list.map((item, index) => (
              <li key={index} style={{
                marginBottom: "22px",
                padding: "12px",
                background: "#222",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                lineHeight: "1.8",
              }}>
                {/* Left Section (Title + Link) - 70% */}
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                  width: "75%",
                  minWidth: "0",
                  marginRight: "10px",
                  wordBreak: "break-word"
                }}>
                  <div style={{
                    fontWeight: "bold",
                    fontSize: "14px",
                    color: "white"
                  }}>
                    {item.title}
                  </div>
                  <a href={item.link} style={{
                    color: "lightblue",
                    textDecoration: "none",
                    fontSize: "12px",
                    wordBreak: "break-word"
                  }} target="_blank" rel="noopener noreferrer">
                    {item.link}
                  </a>
                </div>

                {/* Right Section with Draw Animation */}
                <div style={{
                  width: "30%",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                }}>
                  <motion.svg
                    width="50"
                    height="50"
                    viewBox="0 0 100 100"
                    style={{
                      position: "absolute",
                      transform: "rotate(-90deg)"
                    }}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke={getColorForScore(item.number)}
                      strokeWidth="4"
                      fill="transparent"
                      variants={draw}
                      custom={index}
                    />
                  </motion.svg>
                  <span style={{
                    fontWeight: "bold",
                    color: getColorForScore(item.number),
                    fontSize: "18px",
                    zIndex: 1,
                  }}>
                    {item.number}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ModernPage;