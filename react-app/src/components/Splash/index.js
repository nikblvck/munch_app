import { Link } from "react-router-dom";

import "./Splash.css";
function SplashPage() {
  return (
    <>
      <div className="main_container">
        <div>
          <h1 className="welcome">Welcome to MunCh</h1>
        </div>
        <div> Share your last bite, find your next!</div>
        <div>
          {" "}
          <Link to="/signup">Sign up</Link> or <Link to="/login">log in</Link> to get started!
        </div>
      </div>
    </>
  );
}

export default SplashPage;
