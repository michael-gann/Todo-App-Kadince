import React from "react";

const LoginEmail = ({ userEmail, updateEmail }) => {
  return (
    <>
      <input value={userEmail} onChange={updateEmail}></input>
    </>
  );
};

export default LoginEmail;
