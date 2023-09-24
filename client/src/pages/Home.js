import { Link } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home({ playTrialGame }) {
  return (
    <>
      <Header />
      <main>
        <div className="container main-container home-main-container">
          <h2 className="home-h2">
            A Tense and Satisfying Game for Farmers, Maltsters and Grain
            Traders!
          </h2>
          <p className="home-p">
            Bust That Bug is a game of skill and aggression that lets you pit
            your wits against those pesky grain pests!
          </p>
          <p className="home-p">
            The game is set inside a grain store. Watch the grain carefully and
            you will see the bugs emerging. Click on each bug before it retreats
            back into the grain. How many bugs can you zap in 20 seconds?
          </p>
          <p className="home-p">
            To play a single trial game click 'Trial Game'. To select difficulty
            levels and save your progress you need to log in or create an
            account with the 'Log In' button.
          </p>
          <div className="home-button-container">
            <Link to="/trial">
              <button className="home-button" onClick={playTrialGame}>
                Trial Game
              </button>
            </Link>
            <Link to="/account">
              <button className="home-button">Log In</button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
