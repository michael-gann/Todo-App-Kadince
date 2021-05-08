import React from "react";

const LoginPassword = ({ userPassword, updatePassword }) => {
  return (
    <>
      <input value={userPassword} onChange={updatePassword}></input>
    </>
  );
};

export default LoginPassword;
