import React from "react";
import Navbar from "../component/Navbar/Navbar"; 
import { Box, Icon } from "@mui/material"; 
import HowToVoteIcon from '@mui/icons-material/HowToVote'; 
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety'; 
import PhonelinkLockIcon from '@mui/icons-material/PhonelinkLock'; 
import ThunderstormIcon from '@mui/icons-material/Thunderstorm'; 
import Groups2Icon from '@mui/icons-material/Groups2'; 
import PolicyIcon from '@mui/icons-material/Policy'; 
import PermScanWifiIcon from '@mui/icons-material/PermScanWifi'; 

const jsonData = [
  {
    title: "The 2020 U.S. Presidential Election was rigged or stolen.",
    icon: <HowToVoteIcon sx={{ color: 'white', fontSize: 30 }} />,
    factCheck: "Various audits, recounts, and court rulings have shown no evidence of widespread fraud.",
    link: "https://www.factcheck.org/"
  },
  {
    title: "COVID-19 vaccines cause severe adverse effects, including death.",
    icon: <HealthAndSafetyIcon sx={{ color: 'white', fontSize: 30 }} />,
    factCheck: "The benefits of COVID-19 vaccines far outweigh the risks, and there is no substantial evidence linking vaccines to death.",
    link: "https://www.factcheck.org/"
  },
  {
    title: "5G technology causes COVID-19 or worsens the pandemic.",
    icon: <PhonelinkLockIcon sx={{ color: 'white', fontSize: 30 }} />,
    factCheck: "There is no scientific evidence linking 5G technology to COVID-19. The two are unrelated.",
    link: "https://www.politifact.com/"
  },
  {
    title: "Climate Change is a hoax created by scientists.",
    icon: <ThunderstormIcon sx={{ color: 'white', fontSize: 30 }} />,
    factCheck: "The overwhelming majority of climate scientists agree that climate change is real and significantly driven by human activities.",
    link: "https://www.scientificamerican.com/"
  },
  {
    title: "The U.S. government is planning to create a New World Order.",
    icon: <Groups2Icon sx={{ color: 'white', fontSize: 30 }} />,
    factCheck: "There is no credible evidence supporting the claim of a global conspiracy to create a New World Order.",
    link: "https://www.snopes.com/"
  },
  {
    title: "The COVID-19 vaccine has microchips for tracking.",
    icon: <PolicyIcon sx={{ color: 'white', fontSize: 30 }} />,
    factCheck: "This is a baseless conspiracy theory. Vaccines do not contain microchips or tracking devices.",
    link: "https://www.factcheck.org/"
  },
  {
    title: "The stock market is rigged by the elites to harm average investors.",
    icon: <PermScanWifiIcon sx={{ color: 'white', fontSize: 30 }} />,
    factCheck: "While there is wealth inequality in the stock market, it is not a coordinated conspiracy to harm regular investors.",
    link: "https://www.politifact.com/"
  }
];

const ModernPage = () => {
  return (
    <div style={{ backgroundColor: "black", height: "100vh", color: "white" }}>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h1>Trending Misinformation Topics</h1>
        <p>Here are some claims that need to be fact-checked to help you understand the truth!</p>
        <Box
          sx={{
            height: "75vh",
            overflowY: "auto",
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "10px"
          }}
        >
          {jsonData.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "16px",
                backgroundColor: "#1a1a1a",
                borderRadius: "8px",
                border: "2px solid white",
                marginBottom: "16px",
                color: "white"
              }}
            >
              <Box sx={{ marginRight: "12px" }}>
                {item.icon}
              </Box>
              <div style={{ flexGrow: 1 }}>
                <h3>{item.title}</h3>
                <p>{item.factCheck}</p>
                <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ color: "white", textDecoration: "underline" }}>
                  Read more
                </a>
              </div>
            </Box>
          ))}
        </Box>
      </div>
    </div>
  );
};

export default ModernPage;
