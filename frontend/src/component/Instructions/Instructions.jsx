import React from "react";
import { Typography, Box } from "@mui/material";

const Instructions = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        padding: "120px 20px 20px", // Added 100px padding at the top
        backgroundColor: "transparent", // Set background to transparent
        borderRadius: "12px",
        zIndex: 1000, // Ensures it stays above other elements
        position: "relative",
      }}
    >
      {/* Team Name Header */}
      <Typography variant="h4" sx={{ color: "white", fontWeight: "bold", marginBottom: "16px" }}>
        Team Name
      </Typography>

      {/* Instructions */}
      <Typography variant="h6" sx={{ color: "white", marginBottom: "12px" }}>
        Step 1: Enter the claim you want to fact-check (e.g., social media claim)
      </Typography>
      <Typography variant="h6" sx={{ color: "white", marginBottom: "12px" }}>
        Step 2: Wait for results to load
      </Typography>
      <Typography variant="h6" sx={{ color: "white", marginBottom: "12px" }}>
        Step 3: Review and explore the provided resources
      </Typography>
    </Box>
  );
};

export default Instructions;
