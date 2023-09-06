import "./reset.css";
import "./App.css";
import { useEffect, useState } from "react";

import Bug from "./components/Bug";

function App() {
  const [bugDuration, setBugDuration] = useState(4);
  const [numberOfBugs, setNumberOfBugs] = useState(20);
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
    let left;
    let top;

    function getBugCoords() {
      left = Math.floor(Math.random() * 10) * 100;
      top = Math.floor(Math.random() * 6) * 100;
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

      bugLocations.push({ left: left, top: top });
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
        Math.random() * (numberOfBugs - bugDuration) * 1000
      );

      setTimeout(() => {
        bug.classList.remove("hidden");
        bug.classList.add("unhidden");
        bug.classList.add("visible");

        setTimeout(() => {
          hideBug(bug);
        }, 4000);
      }, randomMS);
    }
  }

  function zapBug(e) {
    if (e.target.dataset.bug || e.target.parentElement.dataset.bug) {
      let bug;
      if (e.target.dataset.bug === "bug") {
        bug = e.target;
      } else if (e.target.parentElement.dataset.bug === "bug") {
        bug = e.target.parentElement;
      }

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
          zapBug={zapBug}
          bugDuration={bugDuration}
        />
      );
    }
  }

  return (
    <div className="App">
      <header>
        <div className="container header-container">
          <h1>Bust That Bug!</h1>
          <button onClick={clearInterval}>stop</button>
        </div>
      </header>
      <main>
        {gameEnded ? (
          <div className="container main-container">
            <h2>
              Well done, you zapped {score} bugs out of {numberOfBugs}!
            </h2>
          </div>
        ) : (
          <div className="container main-container">
            <h2>How many bugs can you zap?</h2>
            <h3>Click on the bugs as they emerge from the grain!</h3>
            <div className="controls-container">
              <button className="start-button" onClick={playGame}>
                start
              </button>
              <div className="score">Score: {score}</div>
              <div className="time-remaining">
                Time remaining: {timeLeft} seconds
              </div>
            </div>
            <div className="board-container">{bugMarkup}</div>
          </div>
        )}
      </main>
      <footer>
        <div className="container footer-container">
          <h5>Hitchcock Enterprises 2023</h5>
        </div>
      </footer>
    </div>
  );
}

export default App;
