import { useEffect, useState } from "react";

import Bug from "../components/Bug";
import TrialGameEnd from "../components/TrialGameEnd";
import Game from "../components/Game";

export default function TrialGame({
  bugData,
  numberOfBugs,
  bugDuration,
  createBugs,
  gameDuration,
}) {
  const [timeLeft, setTimeLeft] = useState(gameDuration);
  const [score, setScore] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);

  useEffect(() => {
    createBugs();
  }, []);

  function playGame() {
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
        <TrialGameEnd score={score} numberOfBugs={numberOfBugs} />
      ) : (
        <Game
          score={score}
          timeLeft={timeLeft}
          bugMarkup={bugMarkup}
          playGame={playGame}
        />
      )}
    </main>
  );
}
