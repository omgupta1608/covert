import { useEffect, useState } from "react";
import "./ViewSecret.css";
import axios from "axios";
import toast, { toastConfig } from "react-simple-toasts";
import "react-simple-toasts/dist/theme/light.css";
import { useParams } from "react-router-dom";
import { SERVER_URL } from "../../constants/constants";

function ViewSecret() {
  const { secret_id } = useParams();
  const [pass_phrase, setPassPhrase] = useState("");

  function updateInput(e) {
    // if (e.target.name === "userInput") setUserInput(e.target.value);
    if (e.target.name === "passPhrase") setPassPhrase(e.target.value);
    // else if (e.target.name === "lifetime") setLifetime(e.target.value);
  }

  toastConfig({
    theme: "light",
  });

  async function getSecret() {
    if (!secret_id || !pass_phrase || secret_id === "" || pass_phrase === "") {
      toast("Invalid inputs");
      return;
    }
    console.log(secret_id, pass_phrase);
    const payload = {
      key: secret_id,
      pass_phrase: pass_phrase,
    };

    try {
      const resp = await axios.post(`${SERVER_URL}/secret`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Resp: ", resp);
      const secret_val = resp?.data?.data?.encrypted_secret;

      if (!secret_val) {
        toast("Something went wrong. Please try again later.");
        return;
      }

      navigator.clipboard.writeText(secret_val);
      toast("Secret copied to clipboard");
    } catch (err) {
      console.error(err);
      toast("Cannot view Secret");
    }
  }
  return (
    <div className="home-wrapper">
      {/* <h1 className="main-heading">COVERT</h1> */}
      <div className="heading-container">
        <p>Enter the pass phrase to get the secret value</p>
        <br></br>
      </div>
      <label className="custom-field one">
        <input
          type="text"
          placeholder=" "
          name="passPhrase"
          onChange={(e) => updateInput(e)}
        />
        <span className="placeholder">Enter Pass Phrase</span>
      </label>
      <div className="buttons">
        <button id="get-secret" onClick={getSecret}>
          Get Secret Value
        </button>
        {/* <button>Or generate a random password</button> */}
      </div>
    </div>
  );
}

export default ViewSecret;
