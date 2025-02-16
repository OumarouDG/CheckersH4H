import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./InputField.scss"; // Import SCSS for styling

const InputField = () => {
  return (
    <div className="input-container">
      <TextField
        id="outlined-basic"
        placeholder="Enter Claim"
        variant="outlined"
        className="text-field"
        sx={{
          backgroundColor: "white",
          borderRadius: "5px",
          input: { color: "black" }, // Ensure text inside is visible
        }}
      />
      <Button
        variant="contained"
        className="run-button"
        sx={{
          backgroundColor: "white",
          color: "black",
          height: "56px", // Matches MUI TextField default height
          marginLeft: "10px",
          "&:hover": { backgroundColor: "#f0f0f0" }, // Slightly darker hover effect
        }}
      >
        run
      </Button>
    </div>
  );
};

export default InputField;
