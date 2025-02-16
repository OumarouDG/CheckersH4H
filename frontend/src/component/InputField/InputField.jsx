import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const InputField = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleRunClick = async () => {
    if (!query) {
      alert("Please enter a claim.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/master-query/userquery/", {  // Use the correct endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),  // Send JSON in the body
      });
    
      const data = await response.json();
      console.log("Backend response:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    
    navigate(`/pageinfo?query=${encodeURIComponent(query)}`);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        position: "absolute",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 2,
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
          input: { color: "black" },
          width: "180px",
        }}
      />
      <Button
        variant="contained"
        sx={{
          backgroundColor: "white",
          color: "black",
          height: "56px",
          marginLeft: "10px",
          "&:hover": { backgroundColor: "#f0f0f0" },
        }}
        onClick={handleRunClick}
      >
        Run
      </Button>
    </div>
  );
};

export default InputField;
