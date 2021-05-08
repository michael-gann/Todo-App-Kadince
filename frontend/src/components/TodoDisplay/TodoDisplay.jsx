import React from "react";

import { Redirect } from "react-router-dom";

const TodoDisplay = ({ authenticated }) => {
  return authenticated ? <div>todos here</div> : <Redirect to="/login" />;
};

export default TodoDisplay;
