import { Link } from "react-router-dom";

export default function SingleGame({
  bugMarkup,
  gameEnded,
  score,
  numberOfBugs,
  timeLeft,
  playGame,
}) {
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
