import React from "react";
<<<<<<< Updated upstream
import { Link } from "react-router-dom"; // Import for routing
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import { Home, Person, Settings, Article } from "@mui/icons-material"; // Import Article icon
=======
import { Link } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import { Home, Article, Settings, Person } from "@mui/icons-material";
>>>>>>> Stashed changes

const Navbar = () => {
  return (
    <AppBar
<<<<<<< Updated upstream
      position="static"
      sx={{
        backgroundColor: "#333", // Dark gray background
        borderRadius: "12px",
        width: "90%",
        margin: "10px auto",
        padding: "8px 0",
        color: "white", // Set text/icons to white
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Light shadow
        zIndex: 2, // Ensure navbar stays on top
        position: "relative", // Required for z-index to take effect
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-around" }}>
        <IconButton sx={{ color: "white" }}>
          <Home fontSize="small" />
          <Typography variant="body2" sx={{ marginLeft: 0.5, color: "white" }}>
            Home
          </Typography>
        </IconButton>
        <IconButton sx={{ color: "white" }}>
          <Person fontSize="small" />
          <Typography variant="body2" sx={{ marginLeft: 0.5, color: "white" }}>
            Profile
          </Typography>
        </IconButton>
        <IconButton sx={{ color: "white" }}>
          <Settings fontSize="small" />
          <Typography variant="body2" sx={{ marginLeft: 0.5, color: "white" }}>
            Settings
          </Typography>
        </IconButton>
        {/* New Modern News Icon with Routing */}
        <Link to="/news" style={{ textDecoration: "none", color: "white" }}>
          <IconButton sx={{ color: "white" }}>
            <Article fontSize="small" />
            <Typography variant="body2" sx={{ marginLeft: 0.5, color: "white" }}>
=======
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
>>>>>>> Stashed changes
              Modern News
            </Typography>
          </IconButton>
        </Link>
<<<<<<< Updated upstream
=======
        
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
>>>>>>> Stashed changes
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
