import React from "react";
import { Box, Typography, Icon } from "@mui/material";

const NewsArticle = ({ title, icon }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "16px",
        backgroundColor: "#1a1a1a",
        borderRadius: "8px",
        border: "2px solid white",
        marginBottom: "16px",
        color: "white",
      }}
    >

      <Box sx={{ marginRight: "12px", display: "flex", justifyContent: "center", alignItems: "center" }}>
        {icon && <Icon sx={{ color: "white", fontSize: "30px" }}>{icon}</Icon>}
      </Box>


      <Typography variant="h6" sx={{ flexGrow: 1, margin: 0 }}>
        {title}
      </Typography>
    </Box>
  );
};

export default NewsArticle;
