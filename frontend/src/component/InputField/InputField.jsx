import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const InputField = () => {
  const [query, setQuery] = useState("");

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleRunClick = async () => {
    if (!query) {
      alert("Please enter a claim.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/masterquery/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Response from Django:", data);
        // Handle the response from the server, e.g., display the summary or sources.
      } else {
        console.error("Failed to fetch data from Django:", response.status);
      }
    } catch (error) {
      console.error("Error during the request:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        position: "absolute",
        bottom: "20px", // Adjusts how far it is from the bottom
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 2, // Ensures it's above other elements
      }}
    >
      <TextField
        id="outlined-basic"
        placeholder="Enter Claim"
        variant="outlined"
        value={query}
        onChange={handleQueryChange}
        sx={{
          backgroundColor: "white",
          borderRadius: "5px",
          input: { color: "black" }, // Ensure text inside is visible
          width: "180px", // Adjust as needed
        }}
      />
      <Button
        variant="contained"
        sx={{
          backgroundColor: "white",
          color: "black",
          height: "56px", // Matches MUI TextField default height
          marginLeft: "10px",
          "&:hover": { backgroundColor: "#f0f0f0" }, // Slightly darker hover effect
        }}
        onClick={handleRunClick}
      >
        Run
      </Button>
    </div>
  );
};

export default InputField;
