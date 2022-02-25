import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import "./Splash.css";
function SplashPage() {
  const user = useSelector((state) => state?.session?.user);

  if (!user) {
    return (
      <>
        <div className="main_container">
          <div>
            <h1 className="welcome">MUNCH</h1>
          </div>
          <div>
            <h1 className="tagline"> Share your last bite, find your next! </h1>
          </div>
          <div>
            {" "}
            <Link to="/signup">Sign up</Link> or <Link to="/login">log in</Link>{" "}
            to get started!
          </div>
        </div>
      </>
    );
  }
  return <Redirect to="/posts" />;
}

export default SplashPage;
