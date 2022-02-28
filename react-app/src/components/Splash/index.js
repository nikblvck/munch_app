import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import "./Splash.css";
function SplashPage() {
  const user = useSelector((state) => state?.session?.user);

  if (!user) {
    return (
      <>
        <div className="home_feed_container">
          <div className="splash_background_container">
            <div className="header_image_container">
              <img
                className="header_image"
                src="https://res.cloudinary.com/bigtechnik/image/upload/v1646008618/munch/munchheader_ei5ryi.png"
                alt="munch"
              />
            </div>
            <div className="splash_tagline">
              <h1 className="tagline">Share your last bite, find your next!</h1>
            </div>
            <div className="splash_options">
                <Link to="/signup">
                  <button id="splash_btn">SIGN UP</button>
                </Link>
              or
              <Link to="/login">
                <button id="get_started">LOG IN</button>
              </Link>
              </div>
              <div className="get_started">
                TO GET STARTED!
              </div>
            </div>
          </div>

      </>
    );
  }
  return <Redirect to="/posts" />;
}

export default SplashPage;
