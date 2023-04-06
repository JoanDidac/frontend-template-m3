import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/logo.jpg'; 

export default function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <div>
      <img src={logo} alt="Logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }} />
      <ul>
        <li><NavLink to="/drones">Drones</NavLink></li>
        <li><NavLink to="/posts">Posts</NavLink></li>
      </ul>
      <input type="checkbox" id="menu-toggle" style={{ display: 'none' }} />
      <label htmlFor="menu-toggle" className="menu-icon">
        <span className="burger-menu"></span>
      </label>
      <div className="menu-content">
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
        </div>
        {user && <p>Hello {user.username}</p>}
        {!isLoggedIn && <NavLink to="/login">Login</NavLink>}
        {isLoggedIn && <button onClick={() => logOutUser()}>Log out</button>}
      </div>
    </div>
  )
}
