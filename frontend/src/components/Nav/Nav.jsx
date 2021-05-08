import React from "react";
import { useHistory } from "react-router";

import "./nav.css";

const Nav = () => {
  const history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    return history.push("/login");
  };

  return (
    <nav>
      <h1>Todo's</h1>
      <div className="login-button-container">
        <button className="login-button" onClick={handleClick}>
          Login
        </button>
      </div>
    </nav>
  );
};

export default Nav;
