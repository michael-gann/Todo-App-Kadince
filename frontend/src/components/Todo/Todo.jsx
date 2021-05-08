import React from "react";

const Todo = ({ todo, updateChecked }) => {
  return (
    <div className="todo-item">
      <input
        type="checkbox"
        value={todo.title}
        checked={todo.isComplete}
        onChange={() => updateChecked(todo.id)}
      ></input>
      <div className="todo-title">{todo.title}</div>
    </div>
  );
};

export default Todo;
