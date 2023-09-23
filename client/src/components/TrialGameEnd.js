import { Link } from "react-router-dom";

export default function TrialGameEnd({ score, numberOfBugs }) {
  return (
    <div className="container main-container trial-game-ended-container">
      <h2 className="trial-end-h2">
        Well done, you zapped <span className="end-span">{score}</span> bugs out
        of <span className="end-span">{numberOfBugs}</span>!
      </h2>
      <p className="trial-end-p">But that was too easy, wasn't it?</p>
      <p className="trial-end-p">
        If you want to up the difficulty level and keep track of your scores
        please return to the home page and log in or create an account.
      </p>
      <Link to="/">
        <button className="back-home-button">Home Page</button>
      </Link>
    </div>
  );
}
