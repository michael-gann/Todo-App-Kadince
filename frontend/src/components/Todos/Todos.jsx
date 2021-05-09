import React from "react";

import Todo from "../Todo/Todo";

const Todos = ({ todos, updateChecked, editCurrentTodo }) => {
  return (
    <div className="todo-item-container">
      {Object.values(todos).map((todo) => {
        return (
          <Todo
            key={todo.id}
            todo={todo}
            updateChecked={updateChecked}
            editCurrentTodo={editCurrentTodo}
          ></Todo>
        );
      })}
    </div>
  );
};

export default Todos;
