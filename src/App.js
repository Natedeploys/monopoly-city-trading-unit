import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Card, Modal, Stack } from "@mui/material";
import Confetti from "react-confetti";
import useSound from "use-sound";
import buildSound from "./build.mp3";
import diceSound from "./dice.mp3";
import tickSound from "./tictac.mp3";
import trumpetSound from "./trumpet.mp3";
import finalCountdownSound from "./finaltictac.mp3";
import backgroundImage from "./bg.jpeg";
import CasinoOutlinedIcon from "@mui/icons-material/CasinoOutlined";
import MapsHomeWorkOutlinedIcon from "@mui/icons-material/MapsHomeWorkOutlined";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";

function App() {
  const [open, setOpen] = useState(false);
  const [diceNumber, setDiceNumber] = useState(1);
  const [buildNumber, setBuildNumber] = useState(1);
  const [rollingDice, setRollingDice] = useState(false);
  const [building, setBuilding] = useState(false);
  const [auctionTime, setAuctionTime] = useState(50);
  const [auctionActive, setAuctionActive] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const [playBuild, { stop: stopBuild }] = useSound(buildSound, {
    volume: 0.25,
  });
  const [playDice, { stop: stopDice }] = useSound(diceSound, { volume: 0.25 });
  const [playTrumpet] = useSound(trumpetSound, { volume: 0.25 });
  const [playTick, { stop: stopTick }] = useSound(tickSound, { volume: 0.25 });
  const [playFinalCountdown, { stop: stopFinalCountdown }] = useSound(
    finalCountdownSound,
    { volume: 1 }
  );

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
        stopDice();
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
      if (buildCount > 20) {
        clearInterval(interval);
        setBuilding(false);
        stopBuild();

        // 1 in 6 chances to win station
        if (Math.floor(Math.random() * 6) + 1 === 1) {
          setOpen(true);
          playTrumpet();
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
    stopTick();
    stopFinalCountdown();
  };

  // useEffect for auction timer countdown
  useEffect(() => {
    let timer;
    if (auctionActive && auctionTime > 0) {
      // sound effect
      if (auctionTime === 5) {
        playFinalCountdown();
        stopTick();
      }

      if (auctionTime === 50) {
        stopFinalCountdown();
        playTick();
      }

      timer = setTimeout(() => setAuctionTime(auctionTime - 1), 1000);
    } else if (auctionTime === 0) {
      triggerConfetti();
      setAuctionActive(false);
      stopTick();
      stopFinalCountdown();
      playTrumpet();
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
        minHeight: "100vh",
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
          padding: "20px",
          boxSizing: "border-box",
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
        <Typography variant="h3" gutterBottom>
          {diceNumber}
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={rollDice}
          disabled={rollingDice}
          sx={{ marginBottom: "5px" }}
        >
          {rollingDice ? "Rolling..." : "Roll"}
        </Button>
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
          padding: "20px",
          boxSizing: "border-box",
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
        <Typography variant="h3" gutterBottom>
          {buildNumber}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {building ? `block(s)` : `block(s) to build`}
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={buildBlocks}
          disabled={building}
          sx={{ marginBottom: "5px" }}
        >
          {building ? "Building..." : "Build"}
        </Button>
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
          padding: "20px",
          boxSizing: "border-box",
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
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            color: auctionTime <= 5 ? "red" : "black",
          }}
        >
          {auctionTime}
        </Typography>
        <Typography variant="h6" gutterBottom>
          second(s)
        </Typography>
        <Stack direction={"row"} spacing={2}>
          <Button
            variant="outlined"
            color="primary"
            onClick={startAuction}
            disabled={auctionActive}
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
        </Stack>
      </Card>
    </Box>
  );
}

export default App;
