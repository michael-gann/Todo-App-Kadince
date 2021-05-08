const express = require("express");
const asyncHandler = require("express-async-handler");

const { restoreUser } = require("../../utils/auth");

const { Todo } = require("../../db/models");

const router = express.Router();

module.exports = router;

router.post(
  "",
  asyncHandler(async (req, res) => {
    const { userId, title, isComplete } = req.body;

    //TODO: handle error

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
  restoreUser,
  asyncHandler(async (req, res) => {
    const { user } = req;

    const allTodos = await Todo.findAll({
      where: {
        userId: user.id,
      },
    });

    const todosById = {};

    for (const todo of allTodos) {
      todosById[todo.id] = todo;
    }

    return res.json(todosById);
  })
);

router.put(
  "",
  asyncHandler(async (req, res) => {
    const { id, newTitle, newIsComplete } = req.body;
    console.log(req.body, id);

    const todoToUpdate = await Todo.findByPk(id);

    if (todoToUpdate) {
      await Todo.update(
        {
          title: newTitle,
          isComplete: newIsComplete,
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
