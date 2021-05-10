import React from "react";
import { useHistory } from "react-router";

import { logout } from "../../util/auth";

import "./nav.css";

const Nav = ({ authenticated, setAuthenticated }) => {
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();
    return history.push("/login");
  };

  const handleLogout = (e) => {
    e.preventDefault();
    const isLoggedOut = logout();

    if (isLoggedOut) {
      setAuthenticated(false);
      return history.push("/");
    }
  };

  return (
    <nav>
      <h1>
        <a href="/">Todos</a>
      </h1>
      <div className="login-button-container">
        {authenticated ? (
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button className="login-button" onClick={handleLogin}>
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Nav;
