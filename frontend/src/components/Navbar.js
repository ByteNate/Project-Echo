import React from 'react';
import { Link } from 'react-router-dom';
import authService from '../services/authService';
import { config } from '../config/frontend';

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
          <Link to={config.routeSettings.home}>Home</Link>
        </li>
        {currentUser ? (
          <>
            <li>
              <Link to={config.routeSettings.profile}>Profile</Link>
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
              <Link to={config.routeSettings.login}>Login</Link>
            </li>
            <li>
              <Link to={config.routeSettings.register}>Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;