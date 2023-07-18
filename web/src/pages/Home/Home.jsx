import { useState } from "react";
import "./Home.css";
import axios from "axios";
import toast, { toastConfig } from "react-simple-toasts";
import "react-simple-toasts/dist/theme/light.css";
import {HOST, SERVER_URL} from '../../constants/constants';
import { useNavigate } from "react-router";
function Home() {
  const navigate = useNavigate();
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
        `${SERVER_URL}/submit-secret`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Resp: ", resp);
      const secret_id = resp?.data?.data?.secret_id;

      if (!secret_id) {
        toast("Something went wrong. Please try again later.");
        return;  
      }

      toast("Secret saved successfully");
      navigate(`/saved/${secret_id}`)
    } catch (err) {
      console.error(err);
      toast("Something went wrong. Please try again later.");
    }
  }

  return (
    <div className="home-wrapper">
      <h1 className="main-heading">COVERT</h1>
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
          {/* <label htmlFor="passPhrase" className="pp-label">
            Passphrase:
          </label>
          <input
            className="pp-input"
            type="text"
            placeholder="Something hard to guess..."
            name="passPhrase"
            onChange={(e) => updateInput(e)}
          /> */}

          <label className="custom-field one">
            <input
              type="text"
              placeholder=" "
              name="passPhrase"
              onChange={(e) => updateInput(e)}
            />
            <span className="placeholder">Enter Pass Phrase</span>
          </label>
        </div>
        {/* <div>
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
        </div> */}
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
