import React, { useState } from "react";

import Todos from "../Todos/Todos";
import CreateATodo from "../CreateATodo/CreateATodo";

import { Redirect } from "react-router-dom";

import "./todoDisplay.css";

const TodoDisplay = ({ authenticated, todos, setTodos, user }) => {
  const [title, setTitle] = useState("");

  const [showPending, setShowPending] = useState(false);
  const [showComplete, setShowComplete] = useState(false);
  const [showAll, setShowAll] = useState(true);

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
      console.error(updateIsComplete.errors);
    }
  };

  const createTodo = async () => {
    if (title) {
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          title,
        }),
      });

      const newTodo = await res.json();

      setTodos((prev) => {
        return { ...prev, [newTodo.todo.id]: newTodo.todo };
      });
    }

    setTitle("");
  };

  const updateView = (value) => {
    switch (value) {
      case "all":
        if (showAll) {
          return;
        } else {
          showComplete
            ? setShowComplete((prev) => !prev)
            : setShowPending((prev) => !prev);
          setShowAll((prev) => !prev);
        }
        break;
      case "pending":
        if (showPending) {
          return;
        } else {
          showAll
            ? setShowAll((prev) => !prev)
            : setShowComplete((prev) => !prev);
          setShowPending((prev) => !prev);
        }
        break;
      case "complete":
        if (showComplete) {
          return;
        } else {
          showPending
            ? setShowPending((prev) => !prev)
            : setShowAll((prev) => !prev);
          setShowComplete((prev) => !prev);
        }
        break;
      default:
        break;
    }

    console.log(showAll, showPending, showComplete);
  };

  const editCurrentTodo = async (id, newTitle, newIsComplete) => {
    const res = await fetch("/api/todos", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        newTitle,
        newIsComplete,
      }),
    });

    const updateIsComplete = await res.json();

    if (!updateIsComplete.errors) {
      todos[id] = { ...todos[id], title: newTitle };
      setTodos((prev) => {
        return { ...prev, ...todos };
      });
    } else {
      console.error(updateIsComplete.errors);
    }
  };

  return authenticated ? (
    <div className="todos-main-container">
      <div className="create-a-todo-container">
        <CreateATodo
          title={title}
          setTitle={setTitle}
          todos={todos}
          setTodos={setTodos}
          createTodo={createTodo}
        ></CreateATodo>
      </div>
      <div className="todos-container">
        <div className="filters">Filters</div>
        <div className="view-controls">
          <button onClick={() => updateView("all")}>All</button>
          <button onClick={() => updateView("pending")}>Pending</button>
          <button onClick={() => updateView("complete")}>Complete</button>
        </div>
        {showPending ? (
          <Todos
            todos={Object.values(todos).filter((todo) => !todo.isComplete)}
            updateChecked={updateChecked}
            editCurrentTodo={editCurrentTodo}
          />
        ) : null}
        {showComplete ? (
          <Todos
            todos={Object.values(todos).filter((todo) => todo.isComplete)}
            updateChecked={updateChecked}
            editCurrentTodo={editCurrentTodo}
          />
        ) : null}
        {showAll ? (
          <Todos
            todos={todos}
            updateChecked={updateChecked}
            editCurrentTodo={editCurrentTodo}
          />
        ) : null}
      </div>
    </div>
  ) : (
    <Redirect to="/login" />
  );
};

export default TodoDisplay;
