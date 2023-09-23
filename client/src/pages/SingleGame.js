import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Bug from "../components/Bug";

export default function SingleGame({ bugData, numberOfBugs, createBugs }) {
  const [bugDuration, setBugDuration] = useState(6);
  //   const [numberOfBugs, setNumberOfBugs] = useState(10);
  const [gameDuration, setGameDuration] = useState(20);
  const [timeLeft, setTimeLeft] = useState(20);
  //   const [bugData, setBugData] = useState([]);
  const [score, setScore] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);

  useEffect(() => {
    createBugs();
  }, []);

  function playGame() {
    // setGameInProgress(true);
    setGameEnded(false);
    showBugs();
    countDown();
  }

  function countDown() {
    let time = timeLeft;
    let interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
      time -= 1;
      if (time < 0) {
        clearInterval(interval);
        endSession();
      }
    }, 1000);
  }

  function endSession() {
    // setGameInProgress(false);
    setGameEnded(true);
    setTimeLeft(20);
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
    <main>
      {gameEnded ? (
        <div className="container main-container single-game-ended-container">
          <h2>
            Well done, you zapped {score} bugs out of {numberOfBugs}!
          </h2>
          <Link to="/">
            <button className="back-home-button">Home Page</button>
          </Link>
        </div>
      ) : (
        <div className="container main-container game-container">
          <div className="controls-container">
            <h3 className="score controls-h3">
              Score: <span className="controls-span">{score}</span>
            </h3>
            <h3 className="time-remaining controls-h3">
              Time remaining: <span className="controls-span">{timeLeft}</span>{" "}
              seconds
            </h3>
          </div>
          <div className="board-container">{bugMarkup}</div>
          <button className="start-button" onClick={playGame}>
            start game
          </button>
        </div>
      )}
    </main>
  );
}
