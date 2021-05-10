import React, { useState } from "react";
import { useHistory } from "react-router";

import { NavLink } from "react-router-dom";

import LoginEmail from "./LoginEmail";
import LoginPassword from "./LoginPassword";

import { login } from "../../util/auth";

import "./login.css";

const Login = ({ authenticated, setAuthenticated }) => {
  const history = useHistory();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errors, setErrors] = useState({});

  const updatePassword = (e) => {
    setUserPassword(e.target.value);
  };

  const updateEmail = (e) => {
    setUserEmail(e.target.value);
  };

  const handleUserLogin = async (e) => {
    e.preventDefault();
    if (!userEmail || !userPassword) {
      return;
    }

    if (!userEmail.includes("@") || !userEmail.includes(".com")) {
      setErrors((prev) => {
        return { ...prev, emailError: "Please provide a valid email" };
      });
      return;
    } else {
      delete errors["emailError"];
      setErrors((prev) => {
        return { ...prev };
      });
    }

    const user = await login(userEmail, userPassword);

    if (!user.errors) {
      setAuthenticated(true);
      return history.push("/todos");
    } else {
      setErrors((prev) => {
        return { ...prev, loginError: `${user.errors.errors}` };
      });
      return;
    }
  };

  const handleDemoLogin = async (e) => {
    const demoEmail = "demo@demo.com";
    const demoPassword = "password";
    e.preventDefault();

    const demoUser = await login(demoEmail, demoPassword);

    if (!demoUser.errors) {
      setAuthenticated(true);
      return history.push("/todos");
    } else {
      setErrors(demoUser.errors);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form">
        <div className="errors">
          {Object.values(errors).map((e, idx) => {
            return (
              <div className="error" key={idx}>
                {e}
              </div>
            );
          })}
        </div>
        <LoginEmail
          userEmail={userEmail}
          updateEmail={updateEmail}
        ></LoginEmail>
        <LoginPassword
          userPassword={userPassword}
          updatePassword={updatePassword}
        ></LoginPassword>
        <div className="buttons-container">
          <button className="login-form-button" onClick={handleUserLogin}>
            Login
          </button>
          <button className="demo-login-button" onClick={handleDemoLogin}>
            Demo Login
          </button>
        </div>
        <div className="have-an-account">
          Don't have an account? Sign up<NavLink to="/signup">here</NavLink>
        </div>
      </form>
    </div>
  );
};

export default Login;
