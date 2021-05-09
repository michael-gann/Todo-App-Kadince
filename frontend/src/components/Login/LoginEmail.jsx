import React from "react";

const LoginEmail = ({ userEmail, updateEmail }) => {
  return (
    <div className="email-input">
      <input
        value={userEmail}
        onChange={updateEmail}
        placeholder="example@domain.com"
      ></input>
    </div>
  );
};

export default LoginEmail;
