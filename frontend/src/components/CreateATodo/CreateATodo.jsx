import React from "react";

import "./createATodo.css";

const CreateATodo = ({ todos, setTodos, createTodo, title, setTitle }) => {
  return (
    <>
      <div className="create-a-todo">
        <div>Create a todo!</div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <button onClick={createTodo}>Add todo</button>
      </div>
    </>
  );
};

export default CreateATodo;
