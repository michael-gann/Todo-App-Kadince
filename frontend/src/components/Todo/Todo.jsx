import React, { useState } from "react";

import { AiTwotoneEdit, AiTwotoneDelete } from "react-icons/ai";

const Todo = ({ todo, updateChecked, editCurrentTodo, deleteTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [isHovering, setIsHovering] = useState(false);

  const handleHover = (e) => {
    setIsHovering(true);
  };

  const handleHoverOff = (e) => {
    setIsHovering(false);
  };

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
        <div
          className="todo-item-hover"
          onMouseEnter={handleHover}
          onMouseLeave={handleHoverOff}
        >
          <input
            type="checkbox"
            value={todo.title}
            checked={todo.isComplete}
            onChange={() => updateChecked(todo.id)}
          ></input>
          <div
            className={
              todo.isComplete
                ? "todo-title complete-todo"
                : "todo-title pending-todo"
            }
          >
            {todo.title}
          </div>

          <div
            onClick={() => setIsEditing(true)}
            className={
              isHovering ? "hovering edit-button" : "hidden edit-button"
            }
          >
            <AiTwotoneEdit></AiTwotoneEdit>
          </div>
          <div
            onClick={() => deleteTodo(todo.id)}
            className={
              isHovering ? "hovering delete-button" : "hidden delete-button"
            }
          >
            <AiTwotoneDelete></AiTwotoneDelete>
          </div>
        </div>
      )}
    </div>
  );
};

export default Todo;
