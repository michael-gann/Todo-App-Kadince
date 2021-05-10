import React, { useState } from "react";
import { login, signUp } from "../../util/auth";

import { useHistory } from "react-router";

import "./signup.css";

const Signup = ({ setAuthenticated, authenticated }) => {
  const history = useHistory();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleUserSignup = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return;
    }

    // simple validations, not catching every edge case
    if (!email.includes("@") || !email.includes(".com")) {
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

    if (password !== confirmPassword) {
      setErrors((prev) => {
        return { ...prev, passError: "Passwords don't match" };
      });
      return;
    } else {
      setErrors((prev) => {
        delete errors["passError"];
        return { ...prev };
      });
    }

    const user = await signUp(firstName, lastName, email, password);

    if (!user.errors) {
      setAuthenticated(true);
      login(email, password);
      return history.push("/todos");
    } else {
      setErrors(user.errors);
    }
  };

  if (authenticated) {
    history.push("/todos");
    return null;
  }

  return (
    <div className="signup-container">
      <form className="signup-form">
        <div className="errors">
          {Object.values(errors).map((e, idx) => {
            return (
              <div className="error" key={idx}>
                {e}
              </div>
            );
          })}
        </div>
        <div className="firstName-input">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Jane"
            required
          ></input>
        </div>
        <div className="lastName-input">
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Dough"
            required
          ></input>
        </div>
        <div className="email-input">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@janedough.com"
            required
          ></input>
        </div>
        <div className="password-input">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          ></input>
        </div>
        <div className="confirmPassword-input">
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
            required
          ></input>
        </div>
        <div className="buttons-container">
          <button
            className="signup-form-button"
            type="submit"
            onClick={handleUserSignup}
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
