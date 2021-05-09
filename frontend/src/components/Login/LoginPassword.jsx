import React from "react";

const LoginPassword = ({ userPassword, updatePassword }) => {
  return (
    <div className="password-input">
      <input
        type="password"
        value={userPassword}
        onChange={updatePassword}
        placeholder="Password"
      ></input>
    </div>
  );
};

export default LoginPassword;
