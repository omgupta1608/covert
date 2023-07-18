import { useState } from "react";
import "./SecretSaved.css";
import "react-simple-toasts/dist/theme/light.css";
import { useParams } from "react-router-dom";
import { HOST } from "../../constants/constants";

function SecretSaved() {
  const { secret_id } = useParams();

  const [secert_link, setUserInput] = useState(`${HOST}/view/${secret_id}`);

  return (
    <div className="home-wrapper">
      {/* <h1 className="main-heading">COVERT</h1> */}
      <div className="heading-container">
        <p>Secret Saved!</p>
        <br></br>
        <span>
          Share this link: <a href={ secert_link }>{secert_link}</a>
        </span>
      </div>
    </div>
  );
}

export default SecretSaved;
