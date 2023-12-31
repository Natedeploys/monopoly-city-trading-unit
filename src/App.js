import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import Confetti from "react-confetti";

function App() {
  const [diceNumber, setDiceNumber] = useState(1);
  const [buildNumber, setBuildNumber] = useState(1);
  const [rollingDice, setRollingDice] = useState(false);
  const [building, setBuilding] = useState(false);
  const [auctionTime, setAuctionTime] = useState(50);
  const [auctionActive, setAuctionActive] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const rollDice = () => {
    setRollingDice(true);
    let rollCount = 0;
    const interval = setInterval(() => {
      const newNumber = Math.floor(Math.random() * 6) + 1;
      setDiceNumber(newNumber);
      rollCount++;
      if (rollCount > 10) {
        clearInterval(interval);
        setRollingDice(false);
      }
    }, 100);
  };

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 10000); // Confetti stops after 3 seconds
  };

  const buildBlocks = () => {
    setBuilding(true);
    let buildCount = 0;
    const interval = setInterval(() => {
      const newBuildNumber = Math.floor(Math.random() * 3) + 1;
      setBuildNumber(newBuildNumber);
      buildCount++;
      if (buildCount > 10) {
        clearInterval(interval);
        setBuilding(false);
        // Trigger confetti if the final build number is 3
        if (newBuildNumber === 3) {
          triggerConfetti();
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
      triggerConfetti();
      setAuctionActive(false);
    }
    return () => clearTimeout(timer);
  }, [auctionTime, auctionActive]);

  // Cleanup the interval on component unmount
  useEffect(() => {
    return () => {
      setRollingDice(false);
      setBuilding(false);
      setShowConfetti(false);
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
      {showConfetti && <Confetti />}
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Monopoly City Trading Unit
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "400px",
          border: "1px solid grey",
          margin: "10px",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Dice roll:
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
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "400px",
          border: "1px solid grey",
          margin: "10px",
        }}
      >
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
          {building
            ? `${buildNumber} block(s)`
            : `${buildNumber} block(s) to build`}
        </Typography>
        <Typography
          variant="caption"
          gutterBottom
          sx={{
            textAlign: "center",
          }}
        >
          You may win the opportunity to build a train station
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "400px",
          border: "1px solid grey",
          margin: "10px",
        }}
      >
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
    </Box>
  );
}

export default App;
