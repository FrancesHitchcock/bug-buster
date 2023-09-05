import "./reset.css";
import "./App.css";
import { useState } from "react";

import Bug from "./components/Bug";

function App() {
  const [bugDuration, setBugDuration] = useState(4);
  const [numberOfBugs, setNumberOfBugs] = useState(20);

  function showBugs() {
    for (let i = 0; i < numberOfBugs; i++) {
      const bug = document.getElementById(`bug-${i}`);
      bug.classList.remove("hidden");
      bug.classList.add("unhidden");
      bug.classList.add("visible");

      setTimeout(() => {
        bug.classList.add("hidden");
        bug.classList.remove("unhidden");
        bug.classList.remove("visible");
      }, 4000);
    }
  }

  function zapBug(e) {
    console.log(e.target.id);
  }

  const bugMarkup = [];

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

    bugMarkup.push(
      <Bug key={i} zapBug={zapBug} idFragment={i} left={left} top={top} />
    );
  }

  console.log(bugLocations);

  return (
    <div className="App">
      <header>
        <div className="container header-container">
          <h1>Bust That Bug!</h1>
        </div>
      </header>
      <main>
        <div className="container main-container">
          <h2>How many bugs can you zap?</h2>
          <h3>Click on the bugs as they emerge from the grain!</h3>
          <div className="controls-container">
            {/* <button className="start-button"> */}
            <button className="start-button" onClick={showBugs}>
              start
            </button>
            <div className="score">Score: 0</div>
            <div className="time-remaining">Time remaining: 20 seconds</div>
          </div>
          <div className="board-container">
            {/* <Bug zapBug={zapBug} /> */}
            {bugMarkup}
          </div>
        </div>
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
