import React, { useState } from "react";
import { useHistory } from "react-router";

import LoginEmail from "./LoginEmail";
import LoginPassword from "./LoginPassword";

import { login } from "../../util/auth";

import "./login.css";

const Login = ({ authenticated, setAuthenticated }) => {
  const history = useHistory();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errors, setErrors] = useState("");

  const updatePassword = (e) => {
    setUserPassword(e.target.value);
  };

  const updateEmail = (e) => {
    setUserEmail(e.target.value);
  };

  const handleUserLogin = async (e) => {
    e.preventDefault();
    const user = await login(userEmail, userPassword);

    if (!user.errors) {
      setAuthenticated(true);
      return history.push("/todos");
    } else {
      setErrors(user.errors);
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
        {errors ? <div>{errors}</div> : null}
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
          Don't have an account? Signup<a href="/signup">{`${" here"}`}</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
