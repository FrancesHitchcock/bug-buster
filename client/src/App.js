import "./reset.css";
import "./App.css";
import { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import TrialGame from "./pages/TrialGame";
import AccountGame from "./pages/AccountGame";

function App() {
  const [bugData, setBugData] = useState([]);
  const [numberOfBugs, setNumberOfBugs] = useState(0);
  const [bugDuration, setBugDuration] = useState(0);
  const [gameDuration, setGameDuration] = useState(0);

  function playTrialGame() {
    setNumberOfBugs(10);
    setBugDuration(6);
    setGameDuration(20);
  }

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

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home playTrialGame={playTrialGame} />} />
          <Route
            path="/trial"
            element={
              <TrialGame
                bugData={bugData}
                numberOfBugs={numberOfBugs}
                bugDuration={bugDuration}
                createBugs={createBugs}
                gameDuration={gameDuration}
              />
            }
          />
          <Route path="/account" element={<AccountGame />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
