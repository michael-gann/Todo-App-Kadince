import React from "react";

import Todo from "../Todo/Todo";

const Todos = ({ todos, updateChecked }) => {
  return (
    <>
      {Object.values(todos).map((todo) => {
        return (
          <Todo key={todo.id} todo={todo} updateChecked={updateChecked}></Todo>
        );
      })}
    </>
  );
};

export default Todos;
