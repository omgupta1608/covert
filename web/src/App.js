import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home/Home";
import SecretSaved from "./pages/SecretSaved/SecretSaved";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <div className="App">
        <Router>
          <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/saved/:secret_id" element={<SecretSaved/>} />
          <Route path="/view/:secret_id" element={<SecretSaved/>} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
