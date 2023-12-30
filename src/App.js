import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";

function App() {
  const [diceNumber, setDiceNumber] = useState(1);
  const [buildNumber, setBuildNumber] = useState(1);
  const [rollingDice, setRollingDice] = useState(false);
  const [building, setBuilding] = useState(false);
  const [auctionTime, setAuctionTime] = useState(50);
  const [auctionActive, setAuctionActive] = useState(false);

  // Function to generate a random number between 1 and 6 for dice
  const rollDice = () => {
    setRollingDice(true);
    let rollCount = 0;
    const interval = setInterval(() => {
      setDiceNumber(Math.floor(Math.random() * 6) + 1);
      rollCount++;
      if (rollCount > 10) {
        clearInterval(interval);
        setRollingDice(false);
        setDiceNumber(Math.floor(Math.random() * 6) + 1); // Set the final number
      }
    }, 100);
  };

  // Function to generate a random number between 1 and 3 for building
  const buildBlocks = () => {
    setBuilding(true);
    let buildCount = 0;
    const interval = setInterval(() => {
      setBuildNumber(Math.floor(Math.random() * 3) + 1);
      buildCount++;
      if (buildCount > 10) {
        clearInterval(interval);
        setBuilding(false);
        setBuildNumber(Math.floor(Math.random() * 3) + 1); // Set the final number

        // Check for a 1 in 6 chance to win a station
        if (Math.floor(Math.random() * 6) + 1 === 1) {
          alert("You can build a station 🚂");
        }
      }
    }, 100);
  };

  // Function to start the auction timer
  const startAuction = () => {
    setAuctionActive(true);
    setAuctionTime(50);
  };

  // Function to reset the auction timer
  const resetAuction = () => {
    setAuctionActive(false);
    setAuctionTime(50);
  };

  // useEffect for auction timer countdown
  useEffect(() => {
    let timer;
    if (auctionActive && auctionTime > 0) {
      timer = setTimeout(() => setAuctionTime(auctionTime - 1), 1000);
    } else if (auctionTime === 0) {
      setAuctionActive(false);
    }
    return () => clearTimeout(timer);
  }, [auctionTime, auctionActive]);

  // Cleanup the interval on component unmount
  useEffect(() => {
    return () => {
      setRollingDice(false);
      setBuilding(false);
    };
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          textAlign: "center",
        }}
      >
        Monopoly City Trading Unit
      </Typography>
      <Typography variant="h6" gutterBottom>
        Normal Dice:
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={rollDice}
        disabled={rollingDice}
        sx={{ marginBottom: "20px" }}
      >
        {rollingDice ? "Rolling..." : "Roll"}
      </Button>
      <Typography variant="h6" gutterBottom>
        {diceNumber}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Build Blocks:
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={buildBlocks}
        disabled={building}
        sx={{ marginBottom: "20px" }}
      >
        {building ? "Building..." : "Build"}
      </Button>
      <Typography variant="h6">
        {building ? "Building..." : `${buildNumber} block(s) to build`}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Auction Timer:
      </Typography>
      <Button
        variant="contained"
        color="success"
        onClick={startAuction}
        disabled={auctionActive}
        sx={{ marginBottom: "20px" }}
      >
        Auction
      </Button>
      <Button
        variant="outlined"
        color="error"
        onClick={resetAuction}
        disabled={!auctionActive}
      >
        Reset
      </Button>
      <Typography variant="h6">{auctionTime} second(s)</Typography>
    </Box>
  );
}

export default App;
