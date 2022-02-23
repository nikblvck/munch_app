import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { useHistory, Redirect } from "react-router-dom";


import "./Splash.css";
function SplashPage() {
  const history = useHistory();
  const user = useSelector((state) => state?.session?.user);

  if (!user) {
    return (
      <>
        <div className="main_container">
          <div>
            <h1 className="welcome">Welcome to MunCh</h1>
          </div>
          <div>
            <h2> Share your last bite, find your next! </h2>
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
  return  <Redirect to="/posts" />
}

export default SplashPage;
