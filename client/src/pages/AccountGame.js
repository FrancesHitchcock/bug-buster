import { useState } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AccountGame() {
  const [formVisible, setFormVisible] = useState(true);
  const [firstName, setFirstName] = useState("");

  function handleChange(e) {
    setFirstName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(firstName);
    setFirstName("");
  }

  return (
    <>
      <Header />
      <main>
        <div className="container main-container form-container">
          <form className="name-form" onSubmit={handleSubmit}>
            <label className="name-label" htmlFor="user-name">
              Enter your first name to play:
            </label>
            <input
              className="name-input"
              type="text"
              id="user-name"
              name="user-name"
              value={firstName}
              onChange={handleChange}
            />
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
