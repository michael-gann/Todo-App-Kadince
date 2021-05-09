const express = require("express");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User } = require("../../db/models");

const router = express.Router();

// TODO: add validations

router.post(
  "/sign-up",
  asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password);

    const userExists = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!userExists) {
      const user = await User.create({
        firstName,
        lastName,
        email,
        hashedPassword,
      });

      const safeUser = { id: user.id, firstName, lastName, email };

      await setTokenCookie(res, safeUser);

      return res.json(safeUser);
    } else {
      return res.json({
        error: "Email already in use",
      });
    }
  })
);

router.post(
  "/login",
  asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    // if (!user) {
    //   const err = new Error("Login failed");
    //   err.status = 401;
    //   err.title = "Login failed";
    //   err.errors = ["The provided credentials were invalid"];
    //   return next(err);
    // }

    await setTokenCookie(res, user);

    if (user && bcrypt.compareSync(password, user.hashedPassword.toString())) {
      return res.json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    } else {
      return res.status(401).json({
        errors: { errors: "Login failed" },
      });
    }
  })
);

// Log out
router.delete("/logout", (_req, res) => {
  res.clearCookie("token");
  return res.json({ message: "success" });
});

// Restore user
router.get("/restore", restoreUser, (req, res) => {
  const { user } = req;
  if (user) {
    return res.json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } else return res.json({});
});

module.exports = router;
