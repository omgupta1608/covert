import { useState } from "react";
import "./Home.css";
import axios from "axios";
import toast, { toastConfig } from "react-simple-toasts";
import 'react-simple-toasts/dist/theme/light.css';

function Home() {
  const [userInput, setUserInput] = useState("");
  const [passPhrase, setPassPhrase] = useState("");
  const [lifetime, setLifetime] = useState("5m");

  // specify the theme in toastConfig
  toastConfig({
    theme: "light",
  });
  function updateInput(e) {
    if (e.target.name === "userInput") setUserInput(e.target.value);
    else if (e.target.name === "passPhrase") setPassPhrase(e.target.value);
    else if (e.target.name === "lifetime") setLifetime(e.target.value);
  }

  async function submitSecret() {
    const payload = {
      encrypted_secret: userInput,
      pass_phrase: passPhrase,
    };

    try {
      const resp = await axios.post(
        `${process.env.SERVER_URL}/submit-secret`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Resp: ", resp);
      toast("Secret saved successfully");
    } catch (err) {
      console.error(err);
      toast("Something went wrong. Please try again later.");
    }
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
          onChange={(e) => updateInput(e)}
        ></textarea>
      </div>
      <div className="privacyOptions-wrapper">
        <div>Privacy Options</div>
        <div>
          <label htmlFor="passPhrase">Passphrase:</label>
          <input
            type="text"
            name="passPhrase"
            onChange={(e) => updateInput(e)}
          />
        </div>
        <div>
          <label htmlFor="lifetime">Expiration:</label>
          <select
            name="lifetime"
            id="lifetime"
            onChange={(e) => updateInput(e)}
          >
            <option value="5m" label="5 minutes">
              5 minutes
            </option>
            <option value="30m" label="30 minutes">
              30 minutes
            </option>
            <option value="1h" label="1 hour">
              1 hour
            </option>
            <option value="4h" label="4 hours">
              4 hours
            </option>
            <option value="12h" label="12 hours">
              12 hours
            </option>
            <option value="1d" label="1 day">
              1 day
            </option>
            <option value="3d" label="3 days">
              3 days
            </option>
            <option value="7d" label="7 days">
              7 days
            </option>
          </select>
        </div>
      </div>
      <div className="buttons">
        <button onClick={submitSecret}>Create a secret link*</button>
        {/* <button>Or generate a random password</button> */}
      </div>
      <div>
        <p>
          * A secret can only be viewed once and then its inaccessible forever.{" "}
          <br />{" "}
        </p>
      </div>
    </div>
  );
}

export default Home;
