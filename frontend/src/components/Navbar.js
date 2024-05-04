import React from 'react';
import { Link } from 'react-router-dom';
import authService from '../services/authService';
import { config } from '../config/frontend';
console.log(config.appName);
console.log(config.routeSettings.login);

const Navbar = () => {
  const currentUser = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    // Optionally, you can redirect the user to the login page after logout
    window.location.reload();
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {currentUser ? (
          <>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <a href="#" onClick={handleLogout}>
                Logout
              </a>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;