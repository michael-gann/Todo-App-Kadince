import React from "react";

import Todos from "../Todos/Todos";

import { Redirect } from "react-router-dom";

const TodoDisplay = ({ authenticated, todos, setTodos }) => {
  const updateChecked = async (todoId) => {
    todos[todoId] = { ...todos[todoId], isComplete: !todos[todoId].isComplete };

    const res = await fetch("/api/todos", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: parseInt(todoId),
        newTitle: todos[todoId].title,
        newIsComplete: todos[todoId].isComplete,
      }),
    });

    const updateIsComplete = await res.json();

    if (!updateIsComplete.errors) {
      setTodos((prev) => {
        return { ...prev, ...todos };
      });
    } else {
    }
  };

  return authenticated ? (
    <Todos todos={todos} updateChecked={updateChecked} />
  ) : (
    <Redirect to="/login" />
  );
};

export default TodoDisplay;
