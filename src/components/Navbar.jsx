import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/sky-pulse-icon no background presentation.png";

export default function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [logoClicked, setLogoClicked] = useState(false);

  const handleLogoClick = () => {
    setLogoClicked(true);
    setTimeout(() => {
      setLogoClicked(false);
    }, 1500);
    navigate("/");
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const handleBurgerClick = () => {
    setMenuOpen(!menuOpen);
    document.querySelector(".burger-menu").classList.toggle("menu-open");
  };
  

  return (
    <div className={`navbar${menuOpen ? " menu-open" : ""}`}>
      <img src={logo} alt="Logo" onClick={handleLogoClick} className={`logo${logoClicked ? " clicked" : ""}`}/>
      <nav>
        <ul>
          <li>
            <NavLink to="/drones">Drones</NavLink>
          </li>
          <li>
            <NavLink to="/posts">Posts</NavLink>
          </li>
          <li>
            <NavLink to="/myprofile"> My Profile</NavLink>
          </li>
        </ul>
      </nav>
      <button
        id="menu-toggle"
        className="menu-toggle"
        onClick={handleBurgerClick}
      >
        <span className="burger-menu"></span>
      </button>
  
      <div className="menu-content">
      {user && <p>Hello {user.username}</p>}
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
        </div>
  
        {!isLoggedIn && <NavLink to="/login">Login</NavLink>}
        {!isLoggedIn && <NavLink to="/signup">Sign Up</NavLink>}
        {isLoggedIn && <button onClick={() => logOutUser()}>Log out</button>}
      </div>
    </div>
  );
}  
