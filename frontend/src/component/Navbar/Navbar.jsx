import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import { Home, Article, Settings, Person } from "@mui/icons-material";

const Navbar = () => {
  return (
    <AppBar
      position="fixed" // Keeps it at the top
      sx={{
        backgroundColor: "#000000",
        borderRadius: "0 0 12px 12px", // Round only the bottom two corners
        width: "100%",
        top: 0, // Ensure it's always on top
        padding: "8px 0",
        color: "white",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        zIndex: 1100, // Ensure it’s above other elements
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-around" }}>
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          <IconButton sx={{ color: "white" }}>
            <Home fontSize="small" />
            <Typography variant="body2" sx={{ marginLeft: 0.5 }}>
              Home
            </Typography>
          </IconButton>
        </Link>
        <Link to="/news" style={{ textDecoration: "none", color: "white" }}>
          <IconButton sx={{ color: "white" }}>
            <Article fontSize="small" />
            <Typography variant="body2" sx={{ marginLeft: 0.5 }}>
              News
            </Typography>
          </IconButton>
        </Link>
        
        {/* Profile button updated to link to /info page */}
        <Link to="/info" style={{ textDecoration: "none", color: "white" }}>
          <IconButton sx={{ color: "white" }}>
            <Person fontSize="small" />
            <Typography variant="body2" sx={{ marginLeft: 0.5 }}>
              Profile
            </Typography>
          </IconButton>
        </Link>
        
        <IconButton sx={{ color: "white" }}>
          <Settings fontSize="small" />
          <Typography variant="body2" sx={{ marginLeft: 0.5 }}>
            Settings
          </Typography>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
