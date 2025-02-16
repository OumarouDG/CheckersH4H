import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5050/api/data")
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start", // Align to top instead of centering
  minHeight: "100vh",
  minWidth: "100vw",
  background: "url('your-image.jpg') no-repeat center center fixed",
  backgroundSize: "cover",
  color: "white",
  padding: "20px",
  textAlign: "center",
}}>
  {loading ? (
    <p>Loading...</p>
  ) : data === null ? (
    <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>Nothing to analyze</h2>
  ) : (
    <div style={{
      textAlign: "left",
      maxWidth: "600px", // ✅ Keeps width fixed
      width: "90%",
      padding: "27px",
      background: "black",
      borderRadius: "10px",
      boxShadow: "0px 4px 10px rgba(0,0,0,0.5)", // Optional for better visuals
      overflow: "hidden",
      height: "auto", // ✅ Allows vertical growth
    }}>
          <div style={{ border: "1px solid white", padding: "22px", borderRadius: "10px", marginBottom: "22px" }}>
            <h2>Paragraph:</h2>
            <p style={{ fontSize: "15px", fontWeight: "normal", color: "lightgray", margin: "5px 0" }}>
              {data.test.paragraph}
            </p>
          </div>

          <div style={{ border: "1px solid white", padding: "22px", borderRadius: "10px" }}>
            <h2>Links and Scores:</h2>
            <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
              {data.test.list.map((item, index) => (
                <li key={index} style={{
                  marginBottom: "22px",
                  padding: "12px",
                  background: "#222",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}>
                  <div style={{ flexGrow: 1, marginRight: "10px", wordBreak: "break-word" }}>
                    <div style={{ fontWeight: "bold", fontSize: "14px", color: "white" }}>
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

                  <div style={{
                    width: "50px",
                    height: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative"
                  }}>
                    <motion.svg
                      width="50"
                      height="50"
                      viewBox="0 0 100 100"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0
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
                      position: "absolute",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      height: "100%"
                    }}>
                      {item.number}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModernPage;
