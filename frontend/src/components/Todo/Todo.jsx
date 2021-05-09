import React, { useState } from "react";

const Todo = ({ todo, updateChecked, setEditTodo, editCurrentTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);

  console.log(editCurrentTodo);

  return (
    <div className="todo-item">
      {isEditing ? (
        <>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          <button
            onClick={() =>
              editCurrentTodo(todo.id, title, todo.isComplete).then(
                setIsEditing(false)
              )
            }
          >
            Edit todo
          </button>
        </>
      ) : (
        <>
          <input
            type="checkbox"
            value={todo.title}
            checked={todo.isComplete}
            onChange={() => updateChecked(todo.id)}
          ></input>
          <div className="todo-title">{todo.title}</div>

          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
    </div>
  );
};

export default Todo;
