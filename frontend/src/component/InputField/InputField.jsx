import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const InputField = () => {
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
      >
        Run
      </Button>
    </div>
  );
};

export default InputField;
