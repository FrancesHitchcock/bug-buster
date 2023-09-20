import "./reset.css";
import "./App.css";
import { useEffect, useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Bug from "./components/Bug";
import Home from "./pages/Home";
import SingleGame from "./pages/SingleGame";
import AccountGame from "./pages/AccountGame";

function App() {
  // const [bugDuration, setBugDuration] = useState(4);
  // const [numberOfBugs, setNumberOfBugs] = useState(20);
  const [bugDuration, setBugDuration] = useState(6);
  const [numberOfBugs, setNumberOfBugs] = useState(10);
  const [gameDuration, setGameDuration] = useState(20);
  const [timeLeft, setTimeLeft] = useState(20);
  const [bugData, setBugData] = useState([]);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameInProgress, setGameInProgress] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);

  useEffect(() => {
    createBugs();
  }, []);

  function createBugs() {
    const bugLocations = [];
    let left = null;
    let top = null;
    let angle = null;

    function getBugCoords() {
      left = Math.floor(Math.random() * 10) * 100;
      top = Math.floor(Math.random() * 6) * 100;
    }

    function getBugAngle() {
      angle = Math.floor(Math.random() * 360);
    }

    function checkBugLocations() {
      const locationArr = bugLocations.filter((location) => {
        return location.top === top && location.left === left;
      });
      return locationArr.length > 0 ? true : false;
    }

    for (let i = 0; i < numberOfBugs; i++) {
      getBugCoords();

      while (checkBugLocations()) {
        getBugCoords();
      }

      getBugAngle();

      bugLocations.push({ left: left, top: top, angle: angle });
    }
    setBugData(bugLocations);
  }

  function playGame() {
    setGameInProgress(true);
    setGameEnded(false);
    showBugs();
    countDown();
  }

  function countDown() {
    let time = timeLeft;
    let interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
      time -= 1;
      if (time <= 0) {
        clearInterval(interval);
        endSession();
      }
    }, 1000);
  }

  function endSession() {
    setGameInProgress(false);
    setGameEnded(true);
  }

  function hideBug(bug) {
    bug.classList.add("hidden");
    bug.classList.remove("unhidden");
    bug.classList.remove("visible");
  }

  function showBugs() {
    for (let i = 0; i < numberOfBugs; i++) {
      const bug = document.getElementById(`bug-${i}`);
      const randomMS = Math.floor(
        Math.random() * (gameDuration - bugDuration) * 1000
      );

      setTimeout(() => {
        bug.classList.remove("hidden");
        bug.classList.add("unhidden");
        bug.classList.add("visible");

        setTimeout(() => {
          hideBug(bug);
        }, bugDuration * 1000);
      }, randomMS);
    }
  }

  function zapBug(e) {
    if (e.target.dataset.bug) {
      const bug = e.target;

      hideBug(bug);

      setScore((prev) => prev + 1);
    }
  }

  function playAgain() {
    createBugs();
  }

  const bugMarkup = [];

  if (bugData.length > 0) {
    for (let i = 0; i < numberOfBugs; i++) {
      bugMarkup.push(
        <Bug
          key={i}
          idFragment={i}
          left={bugData[i].left}
          top={bugData[i].top}
          angle={bugData[i].angle}
          zapBug={zapBug}
          bugDuration={bugDuration}
        />
      );
    }
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trial" element={<SingleGame />} />
          <Route path="/account" element={<AccountGame />} />
        </Routes>
      </BrowserRouter>

      {/* <main>
        {gameEnded ? (
          <div className="container main-container">
            <h2>
              Well done, you zapped {score} bugs out of {numberOfBugs}!
            </h2>
          </div>
        ) : (
          <div className="container main-container game-container">
            <div className="controls-container">
              <div className="score">Score: {score}</div>
              <div className="time-remaining">
                Time remaining: {timeLeft} seconds
              </div>
            </div>
            <div className="board-container">{bugMarkup}</div>
            <button className="start-button" onClick={playGame}>
              start game
            </button>
          </div>
        )}
      </main> */}
    </div>
  );
}

export default App;
