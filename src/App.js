import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Card, Modal } from "@mui/material";
import Confetti from "react-confetti";
import useSound from "use-sound";
import buildSound from "./build.mp3";
import diceSound from "./dice.mp3";
import tickSound from "./tictac.mp3"; // Replace with your tick sound file path
import finalCountdownSound from "./finaltictac.mp3"; // Replace with your final countdown sound file path
import backgroundImage from "./bg.jpeg";
import CasinoOutlinedIcon from "@mui/icons-material/CasinoOutlined";
import MapsHomeWorkOutlinedIcon from "@mui/icons-material/MapsHomeWorkOutlined";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";

function App() {
  const [open, setOpen] = useState(true);
  const [diceNumber, setDiceNumber] = useState(1);
  const [buildNumber, setBuildNumber] = useState(1);
  const [rollingDice, setRollingDice] = useState(false);
  const [building, setBuilding] = useState(false);
  const [auctionTime, setAuctionTime] = useState(50);
  const [auctionActive, setAuctionActive] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const [playBuild] = useSound(buildSound, { volume: 0.25 });
  const [playDice] = useSound(diceSound, { volume: 0.25 });
  const [playTick] = useSound(tickSound, { volume: 0.25 });
  const [playFinalCountdown] = useSound(finalCountdownSound, { volume: 1 });

  const rollDice = () => {
    playDice();
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
    playBuild();
    setBuilding(true);
    let buildCount = 0;
    const interval = setInterval(() => {
      const newBuildNumber = Math.floor(Math.random() * 3) + 1;
      setBuildNumber(newBuildNumber);
      buildCount++;
      if (buildCount > 30) {
        clearInterval(interval);
        setBuilding(false);

        // 1 in 6 chances to win station
        if (Math.floor(Math.random() * 6) + 1 === 1) {
          setOpen(true);
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
      // sound effect
      if (auctionTime <= 5) {
        playFinalCountdown();
      } else {
        playTick();
      }

      timer = setTimeout(() => setAuctionTime(auctionTime - 1), 1000);
    } else if (auctionTime === 0) {
      triggerConfetti();
      setAuctionActive(false);
    }
    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, [auctionTime, auctionActive]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100vw",
        boxSizing: "border-box",
        height: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "20px",
        overflowX: "hidden",
      }}
    >
      <Confetti run={showConfetti} recycle={false} />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="train-win"
        aria-describedby="you-win-a-train-station"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "100%", md: "400px" },
            bgcolor: "background.paper",
            outline: "none",
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography id="train-win" variant="h6" component="h2">
            You've won a train station! 🚂
          </Typography>
          <Typography id="you-win-a-train-station" sx={{ m: 2 }}>
            Build a train station according to the rules
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
        </Box>
      </Modal>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          fontStyle: "italic",
        }}
      >
        Monopoly City Trading Unit
      </Typography>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: { xs: "100%", md: "400px" },
          background: "whitesmoke",
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Roll
          <CasinoOutlinedIcon
            sx={{
              marginLeft: "10px",
            }}
          />
        </Typography>
        <Button
          variant="outlined"
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
        <Typography
          variant="caption"
          gutterBottom
          sx={{
            textAlign: "center",
          }}
        >
          Simply press roll twice for simulating two dice
        </Typography>
      </Card>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: { xs: "100%", md: "400px" },
          margin: "10px",
          background: "whitesmoke",
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Build blocks
          <MapsHomeWorkOutlinedIcon
            sx={{
              marginLeft: "10px",
            }}
          />
        </Typography>
        <Button
          variant="outlined"
          color="primary"
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
      </Card>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: { xs: "100%", md: "400px" },
          background: "whitesmoke",
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Auction Timer
          <TimerOutlinedIcon
            sx={{
              marginLeft: "10px",
            }}
          />
        </Typography>
        <Button
          variant="outlined"
          color="primary"
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
          sx={{
            marginBottom: "20px",
          }}
        >
          Reset
        </Button>
        <Typography
          variant="h6"
          sx={{
            color: auctionTime <= 5 ? "red" : "black",
          }}
        >
          {auctionTime} second(s)
        </Typography>
      </Card>
    </Box>
  );
}

export default App;
