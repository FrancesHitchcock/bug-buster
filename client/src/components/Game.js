export default function Game({ score, timeLeft, bugMarkup, playGame }) {
  return (
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
  );
}
