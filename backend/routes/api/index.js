const router = require("express").Router();
const usersRouter = require("./users");
const todosRouter = require("./todos");

router.use("/users", usersRouter);
router.use("/todos", todosRouter);

module.exports = router;
