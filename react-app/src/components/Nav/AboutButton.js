import { useState, useEffect } from 'react';
import { useHistory, Link} from 'react-router-dom';

function AboutButton() {
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

return (
  <>
  <button className="nav_btn" onClick={openMenu}>About</button>
  {showMenu && (
    <>
    <div className="about_dropdown">
      <div className="about_dropdown_content">
      <div className="about_links"><a href="https://www.github.com/nikblvck/munch_app">Project Github</a></div>
      <div className="about_links"><a href="https://www.linkedin.com/in/niktyler/">LinkedIn</a></div>
      </div>
    </div>
    </>
    )}
</>
)
}

export default AboutButton
