import { useEffect, useState } from "react";
import "./ViewSecret.css";
import axios from "axios";
import toast, { toastConfig } from "react-simple-toasts";
import "react-simple-toasts/dist/theme/light.css";
import { useParams } from "react-router-dom";
import { HOST } from "../../constants/constants";

function ViewSecret() {
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

export default ViewSecret;
