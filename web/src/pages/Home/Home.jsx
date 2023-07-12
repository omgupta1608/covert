import { useState } from "react";
import "./Home.css";

function Home() {
  const [userInput, setUserInput] = useState("");
  const [passPhrase, setPassPhrase] = useState("");
  const [lifetime, setLifetime] = useState("");

  function updateInput(e) {
    if (e.target.name === "userInput") 
      setUserInput(e.target.value);
    else if (e.target.name === "passPhrase")
      setPassPhrase( e.target.value);
    else if (e.target.name === "lifetime")
      setLifetime(e.target.value);

    console.log("USER INPUT: " + userInput);
    console.log("Passphrase: " + passPhrase);
    console.log("Lifetime: " + lifetime);
  }

  return (
    <div className="home-wrapper">
      <div className="heading-container">
        <p>Paste a password, secret message or private link below.</p>
        <span>Keep sensitive info out of your email and chat logs</span>
      </div>
      <div className="userInput-wrapper">
        <textarea
          name="userInput"
          id="userInput"
          cols="30"
          rows="10"
          placeholder="Secret content goes here..."
          onChange={e=>updateInput(e)}
        ></textarea>
      </div>
      <div className="privacyOptions-wrapper">
        <div>Privacy Options</div>
        <div>
          <label htmlFor="passPhrase">Passphrase:</label>
          <input type="text" name="passPhrase" onChange={e=>updateInput(e)} />
        </div>
        <div>
          <label htmlFor="lifetime">Expiration:</label>
          <select name="lifetime" id="lifetime" onChange={e=>updateInput(e)}>
            <option value="7 days">7 days</option>
            <option value="3 days">3 days</option>
            <option value="1 day">1 day</option>
            <option value="12 hours">12 hours</option>
            <option value="4 hours">4 hours</option>
            <option value="1 hour">1 hour</option>
            <option value="30 minutes">30 minutes</option>
            <option value="5 minutes">5 minutes</option>
          </select>
        </div>
      </div>
      <div className="buttons">
        <button>Create a secret link*</button>
        <button>Or generate a random password</button>
      </div>
      <div>
        <p>
          * A secret link only works once and then disappears forever. <br />{" "}
          Sign up for a free account and be able to send the secret by email.
        </p>
      </div>
    </div>
  );
}

export default Home;
