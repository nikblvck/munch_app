import { useState, useEffect } from "react";
import { useHistory, NavLink} from "react-router-dom";
import { useDispatch } from "react-redux";
import * as sessionActions from '../../store/session'

function ProfileButton({user}) {
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const openMenu = () => {
    if(showMenu) return
    setShowMenu(true);
  };

  const handleClick = (e) => {
    e.preventDefault();
    history.push("/post/new");
  };


  useEffect(() => {
    if(!showMenu) return

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => {
      document.removeEventListener('click', closeMenu)
    }
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    return history.push('/')
}

  return (
    <>

      <div className="profile_button" onClick={openMenu}>
        <button>
          <i class="fa-solid fa-user"></i>
        </button>
        {showMenu && (
          <>
            <div className="profile_dropdown">
            <div className="profile_image_div">
              <img className="profile_image" src={user.profile_img_url} alt="profile_image"/>
            </div>
              <div className="profile_d_links">
                <button onClick={handleClick} className="nav_link">
                  <i className="fa-solid fa-plus"></i>
                </button>
              </div>
            </div>
          </>
          )}
      </div>
    </>
  );
}

export default ProfileButton;
