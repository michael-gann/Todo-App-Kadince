const express = require("express");
const asyncHandler = require("express-async-handler");

const { Todo } = require("../../db/models");

const router = express.Router();

module.exports = router;

router.post(
  "",
  asyncHandler(async (req, res) => {
    const { userId, title, isComplete } = req.body;

    const todo = await Todo.create({
      userId,
      title,
      isComplete,
    });

    return res.json({ todo });
  })
);

router.get(
  "",
  asyncHandler(async (req, res) => {
    const { id } = req.body;

    const allTodos = await Todo.findAll({
      where: {
        userId: id,
      },
    });

    const todosById = {};

    for (const todo of allTodos) {
      todosById[todo.id] = todo;
    }

    return res.json({ todosById });
  })
);

router.put(
  "",
  asyncHandler(async (req, res) => {
    const { id, newTitle } = req.body;

    const todoToUpdate = await Todo.findByPk(id);

    if (todoToUpdate) {
      await Todo.update(
        {
          title: newTitle,
        },
        {
          where: {
            id,
          },
        }
      );

      const newTodo = await Todo.findByPk(id);

      return res.json({
        newTodo,
      });
    } else {
      return res.json({ errors: `No todo with id: ${id} was found` });
    }
  })
);

router.delete(
  "",
  asyncHandler(async (req, res) => {
    const { id } = req.body;

    const todoToDelete = await Todo.findByPk(id);

    if (todoToDelete) {
      await Todo.destroy({
        where: {
          id,
        },
      });
      return res.json({
        success: `Todo with id: ${id} was permanently deleted`,
      });
    } else {
      return res.json({ errors: `No todo with id: ${id} was found` });
    }
  })
);
